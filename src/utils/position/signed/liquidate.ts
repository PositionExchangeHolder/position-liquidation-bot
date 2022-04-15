import configs from '../../../../config'
import { getPositionHouseContract } from '../../contract'
import { Account } from '../../types'
import { sendSignedTransaction } from './sendSignedTransaction'

const liquidate = async (
  sender: Account,
  pmAddress: string,
  victim: string
): Promise<string> => {
  const positionHouse = getPositionHouseContract()
  const data = positionHouse.methods.liquidate(pmAddress, victim).encodeABI()

  const txHash = await sendSignedTransaction(sender, configs.address.POSITION_HOUSE_PROXY, data)

  return txHash
}

export default liquidate
