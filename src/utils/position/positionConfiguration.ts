import BigNumber from 'bignumber.js'
import { getPositionHouseConfigurationProxyContract } from '../contract'

export const getLiquidationFeeAndPenaltyRatio = async (): Promise<{
  liquidationFeeRatio: BigNumber,
  liquidationPenaltyRatio: BigNumber
}> => {
  const positionHouseConfiguration = getPositionHouseConfigurationProxyContract()
  const liquidationRatio = await positionHouseConfiguration.methods.getLiquidationRatio().call()

  const res = {
    liquidationFeeRatio: new BigNumber(liquidationRatio['0']),
    liquidationPenaltyRatio: new BigNumber(liquidationRatio['1'])
  }

  return res
}

export const getPartialLiquidationRatio = async (): Promise<BigNumber> => {
  const positionHouseConfiguration = getPositionHouseConfigurationProxyContract()
  const partialLiquidationRatio = await positionHouseConfiguration.methods.partialLiquidationRatio().call()

  return new BigNumber(partialLiquidationRatio)
}
