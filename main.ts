import BigNumber from 'bignumber.js'
import { calculateFeeToLiquidator } from './src/utils/calculator'
import { getLiquidationFeeAndPenaltyRatio, getPartialLiquidationRatio } from './src/utils/position/positionConfiguration'
import { getManualMargin, getRawPosition } from './src/utils/position/positionHouse'
import { getMaintenanceDetail, getPositionNotionalAndUnrealizedPnl } from './src/utils/position/positionViewer'
import { getBalanceNumber } from './src/utils/number'
import getSender from './src/utils/getSender'
import liquidate from './src/utils/position/signed/liquidate'
import getMarketLabel from './src/utils/getMarketLabel'
import configs from './config'

const canLiquidate = (
  marginRatio: BigNumber,
  partialLiquidationRatio: BigNumber
): boolean => {
  return marginRatio.gte(partialLiquidationRatio)
}

const isEnoughProfit = (
  currentProfit: BigNumber,
  minimumProfit = configs.bot.MINIMUM_PROFIT_BUSD
): boolean => {
  return currentProfit.gte(new BigNumber(minimumProfit))
}

export const checkAndLiquidate = async (pmAddress: string, trader: string) => {
  const rawPosition = await getRawPosition(pmAddress, trader)
  const { unrealizedPnl } = await getPositionNotionalAndUnrealizedPnl(pmAddress, trader, rawPosition)
  
  if (unrealizedPnl.lte(new BigNumber(0))) {
    return
  }
  
  const { marginRatio } = await getMaintenanceDetail(pmAddress, trader)
  console.log(`${getMarketLabel(pmAddress)} \t ${trader} \t ${getBalanceNumber(rawPosition[0])} \t\t ${rawPosition[5]} \t\t ${getBalanceNumber(unrealizedPnl)} \t\t ${marginRatio.toString()}`)

  const partialLiquidationRatio = await getPartialLiquidationRatio()
  if (canLiquidate(marginRatio, partialLiquidationRatio)) {
    const { liquidationFeeRatio } = await getLiquidationFeeAndPenaltyRatio()
    const positionMargin = new BigNumber(rawPosition[1])
    const manualMargin = await getManualMargin(pmAddress, trader)
    
    const profit = calculateFeeToLiquidator(
      marginRatio,
      partialLiquidationRatio,
      liquidationFeeRatio,
      positionMargin,
      manualMargin
    )

    console.log(`[SOS] Liquidate trader: ${trader} - ${marginRatio.toString()} - ${getBalanceNumber(profit)}`)

    if (isEnoughProfit(profit) && configs.bot.ENABLE) {
      const sender = getSender(configs.sender.PRIVATE_KEY)
      await liquidate(sender, pmAddress, trader)
    }
  }
}
