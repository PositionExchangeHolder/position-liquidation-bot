import configs from '../../../../config'
import web3 from '../../../config/web3'
import { Account } from '../../types'

export const sendSignedTransaction = async (
  sender: Account,
  contractAddress: string,
  data: any
): Promise<string> => {
  try {
    const nonce = await web3.eth.getTransactionCount(sender.address, 'latest')
    const gasPrice = configs.transaction.DEFAULT_GAS_PRICE
    const gas = configs.transaction.DEFAULT_GAS_LIMIT
    
    const transaction = {
      to: contractAddress,
      gas,
      gasPrice: gasPrice * 1e9,
      nonce: nonce,
      data: data
    }

    const signed = await web3.eth.accounts.signTransaction(
      transaction,
      sender.privateKey
    )

    const hash = await web3.eth.sendSignedTransaction(signed.rawTransaction as string)

    return hash.transactionHash
  }
  catch (error) {
    console.error(error)
    process.exit(0)
  }
}
