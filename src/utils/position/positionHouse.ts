import BigNumber from 'bignumber.js'
import { getPositionHouseContract } from '../contract'

/**
 * Position Struct:
 * int256 quantity
 * uint256 margin
 * uint256 openNotional
 * int128 lastUpdatedCumulativePremiumFraction
 * uint64 blockNumber
 * uint16 leverage
 * 
 * Ex:
 * [
      '126000000000000000',
      '40200046080000000000',
      '5025005760000000000000',
      '-16751310416668',
      '16946478',
      '125',
      '1',
      quantity: '126000000000000000',
      margin: '40200046080000000000',
      openNotional: '5025005760000000000000',
      lastUpdatedCumulativePremiumFraction: '-16751310416668',
      blockNumber: '16946478',
      leverage: '125',
      __dummy: '1'
    ]
 */
export const getRawPosition = async (
  pmAddress: string,
  trader: string
) => {
  const positionHouseContract = getPositionHouseContract()
  const position = await positionHouseContract.methods.getPosition(pmAddress, trader).call()
  
  return position.slice(0, 7)
}

export const getManualMargin = async (
  pmAddress: string,
  trader: string,
): Promise<BigNumber> => {
  const positionHouseContract = getPositionHouseContract()
  const manualMargin = await positionHouseContract.methods.getAddedMargin(pmAddress, trader).call()

  return new BigNumber(manualMargin)
}
