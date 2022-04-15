import web3 from '../config/web3'
import { Account } from './types'

const convertPrivateKeyToAddress = (privateKey: string): string => {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey)

  return account.address
}

const getSender = (privateKey: string): Account => {
  const sender: Account = {
    privateKey: privateKey,
    address: convertPrivateKeyToAddress(privateKey)
  }

  return sender
}

export default getSender
