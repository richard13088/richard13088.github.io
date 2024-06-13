// src/utils/filebase.js
import axios from 'axios'
import { create } from 'kubo-rpc-client'
import { Buffer } from 'buffer'

const IPFS_API_URL = 'http://localhost:5001/api/v0/add'


export const uploadJsonToIPFS = async (json) => {
  const client = create({ url: "http://127.0.0.1:5001/api/v0" })
  const { cid } = await client.add(Buffer.from(json))
  return "http://localhost:5001/api/v0/cat?arg=" + cid
}

export const uploadToIPFS = async (file) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await axios.post(IPFS_API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.status === 200) {
      const url = `http://localhost:5001/api/v0/cat?arg=${response.data.Hash}`
      return url
    } else {
      throw new Error('Failed to upload file to IPFS')
    }
  } catch (error) {
    console.error('Error uploading file to IPFS: ', error)
    throw error
  }
}
