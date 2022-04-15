import BigNumber from 'bignumber.js'

const BN_TWO = new BigNumber(2)
const BN_ONE_HUNDRED = new BigNumber(100)

export const calculateFeeToLiquidator = (
  marginRatio: BigNumber,
  partialLiquidationRatio: BigNumber,
  liquidationFeeRatio: BigNumber,
  positionMargin: BigNumber,
  manualMargin: BigNumber
): BigNumber => {
  let feeToLiquidator: BigNumber
  
  if (
    marginRatio.gte(partialLiquidationRatio)
    && partialLiquidationRatio.lt(BN_ONE_HUNDRED)
  ) {
    const marginToVault = calculatePartialLiquidateMargin(positionMargin, liquidationFeeRatio)
    const liquidationPenalty = marginToVault
    feeToLiquidator = liquidationPenalty.div(BN_TWO)
  } else {
    const liquidationPenalty = positionMargin.plus(manualMargin)
    feeToLiquidator = liquidationPenalty
      .times(liquidationFeeRatio)
      .div(BN_TWO)
      .div(BN_ONE_HUNDRED)
  }

  return feeToLiquidator
}

export const calculatePartialLiquidateMargin = (
  oldMargin: BigNumber,
  liquidationFeeRatio: BigNumber
): BigNumber => {
  const remainMargin = oldMargin
    .times(BN_ONE_HUNDRED.minus(liquidationFeeRatio))
    .div(BN_ONE_HUNDRED)

  return oldMargin.minus(remainMargin)
}
