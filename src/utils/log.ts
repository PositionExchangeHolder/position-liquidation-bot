import BigNumber from 'bignumber.js'
import clc from 'cli-color'
import getMarketLabel from './getMarketLabel'
import { getBalanceNumber } from './number'

export const generatePositionHeader = (): string => {
  return 'Market \t Trader \t\t\t\t\t Quantity \t Leverage \t UnrealizedPnl \t MarginRatio \t Liquidate'
}

export const generatePositionLog = (
  pmAddress: string,
  trader: string,
  positionQuantity: BigNumber | string,
  positionLeverage: string,
  unrealizedPnl: BigNumber | string,
  marginRatio: BigNumber,
  isCanLiquidate: boolean,
  profit?: BigNumber
): string => {
  const pmAddressStr = getMarketLabel(pmAddress)
  const traderStr = trader
  const positionQuantityStr = getBalanceNumber(positionQuantity)
  const positionLeverageStr = positionLeverage
  const unrealizedPnlStr = getBalanceNumber(unrealizedPnl).toFixed(0)
  const marginRatioStr = marginRatio.toString() === '100'
    ? clc.red(marginRatio.toString())
    : marginRatio.toString()
  const isCanLiquidateStr = isCanLiquidate
  const profitStr = profit ? `Profit: ${clc.green(`+$${getBalanceNumber(profit)}`)}` : ''

  return (
    `${pmAddressStr} \t ${traderStr} \t ${positionQuantityStr} \t\t ${positionLeverageStr} \t\t ${unrealizedPnlStr} \t\t ${marginRatioStr} \t\t ${isCanLiquidateStr} ${profitStr}`
  )
}