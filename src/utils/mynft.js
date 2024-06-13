import { ethers } from 'ethers'
import ABI from '../contracts/MyToken.json'

let provider = new ethers.BrowserProvider(window.ethereum)
const contractAddress = "0x27f075c7939Ba4f475a0fE22e02CDcB5E613F36b"

export async function safeMint (address, uri) {
  const contract = new ethers.Contract(contractAddress, ABI, await provider.getSigner())
  const result = await contract.safeMint(address, uri)
  return result
}
