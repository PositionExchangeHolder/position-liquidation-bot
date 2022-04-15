import Web3 from 'web3'
import configs from '../../config'

const provider = configs.web3.MAINNET_RPC
const web3 = new Web3(new Web3.providers.HttpProvider(provider))

export default web3
