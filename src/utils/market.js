import { ethers } from 'ethers'
import ABI from "../contracts/Market.json"

let provider = new ethers.BrowserProvider(window.ethereum)
const contractAddress = "0x86010F3a651cEd013eC97DE27557a19468A22424"