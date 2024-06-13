import React, { useState, useEffect } from "react"
import './index.scss'
import { balanceOf } from '../../utils/ustd'
import {
  Button, Form, Input, Upload, message, Modal
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { uploadToIPFS, uploadJsonToIPFS } from '@/utils/ipfs'
import { safeMint } from '@/utils/mynft'

const NftMarket = () => {
  //钱包相关功能
  const [account, setAccount] = useState(null)
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setAccount(accounts[0])
        const result = await balanceOf(accounts[0])
        console.log(result)

      } catch (error) {
        console.error("Error connecting to MetaMask", error)
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this feature.')
    }
  }
  const formatAccount = (account) => {
    return `${account.slice(0, 8)}...`
  }
  //上传铸造照片相关功能
  const [mintModal, setMintModal] = useState(false)
  const showMintModal = () => {
    setMintModal(true)
  }
  const closeMintModal = () => {
    setMintModal(false)
  }
  //表单相关
  const [mintPicList, setMintPicList] = useState([])
  const mintPicUpload = async ({ file, onSuccess, onError }) => {
    var url = await uploadToIPFS(file)
    setMintPicList([{ uid: '1', status: 'done', type: 'image/png', url: url }])
  }
  const mintPicRemove = () => {
    setMintPicList([])
  }
  const doMintNFT = async (e) => {
    var mintUrl = mintPicList[0].url
    e.pic = mintUrl
    e.mintPic = null
    var jsonUrl = uploadJsonToIPFS(JSON.stringify(e))
    var mintResult = await safeMint(account, jsonUrl)
    console.log(mintResult)
  }
  return (
    <>
      <div className="nft_market">
        <div>
          {account ?
            <div className="wallet_button" onClick={showMintModal}>mint NFT</div>
            : <div></div>}
        </div>
        <div>
          {account ? (
            <div className="connect_account">{formatAccount(account)}</div>
          ) : (
            <div className="wallet_button" onClick={connectWallet}>
              Connect Wallet
            </div>
          )}
        </div>
      </div>
      <div>
        <Modal centered footer={null} title=""
          open={mintModal} onOk={closeMintModal} onCancel={closeMintModal}>
          <div className="nft_upload_modal">
            <div>
              <Form
                name="basic"
                onFinish={doMintNFT}>
                <Form.Item
                  label="名称"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: '名称不能为空',
                    },
                  ]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="描述"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: '描述不能为空',
                    },
                  ]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="mintPic"
                  label="照片"
                  valuePropName="mintPic"
                  rules={[
                    {
                      required: true,
                      message: '照片不能空',
                    },
                  ]}>
                  <Upload customRequest={mintPicUpload} accept="image/*" onRemove={mintPicRemove}
                    listType="picture-card" maxCount={1} fileList={mintPicList}>
                    <button style={{ border: 0, background: 'none' }} type="button">
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>上传照片</div>
                    </button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    保存
                  </Button>
                  <Button type="primary" htmlType="button" onClick={() => closeMintModal()} style={{ marginLeft: '10px' }}>
                    取消
                  </Button>
                </Form.Item>
              </Form>
            </div>

          </div>
        </Modal>
      </div>
    </>
  )
}

export default NftMarket
