import { ethers } from 'ethers'
import ABI from '../contracts/CUSDT.json'

let provider = new ethers.BrowserProvider(window.ethereum)
const contractAddress = "0xD658c469DCFf332D4d3642222a71dC1aF4aAf9b5"

export async function balanceOf (account) {
  const contract = new ethers.Contract(contractAddress, ABI, await provider.getSigner())
  const result = await contract.balanceOf(account)
  return result
}

export async function approve (spender, amount) {
  const contract = new ethers.Contract(contractAddress, ABI, await provider.getSigner())
  const result = await contract.approve(spender, amount)
  console.log(result.hash)
}

export async function getAllowance (owner, spender) {
  const contract = new ethers.Contract(contractAddress, ABI, await provider.getSigner())
  const result = await contract.allowance(owner, spender)
  return Number(result)
}