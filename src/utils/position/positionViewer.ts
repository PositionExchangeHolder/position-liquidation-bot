import BigNumber from 'bignumber.js'
import { getPositionHouseViewerContract } from '../contract'

export const getMaintenanceDetail = async (
  pmAddress: string,
  trader: string,
  calcOption = 2
): Promise<{
  maintenanceMargin: BigNumber,
  marginBalance: BigNumber,
  marginRatio: BigNumber
}> => {
  const positionHouseViewer = getPositionHouseViewerContract()
  const maintenanceMargin = await positionHouseViewer.methods.getMaintenanceDetail(
    pmAddress,
    trader,
    calcOption
  ).call()
  
  const res = {
    maintenanceMargin: new BigNumber(maintenanceMargin['maintenanceMargin']),
    marginBalance: new BigNumber(maintenanceMargin['marginBalance']),
    marginRatio: new BigNumber(maintenanceMargin['marginRatio'])
  }

  return res
}

export const getPositionNotionalAndUnrealizedPnl = async (
  pmAddress: string,
  trader: string,
  position: any,
  calcOption = 2, // ORACLE
): Promise<{
  positionNotional: BigNumber,
  unrealizedPnl: BigNumber
}> => {
  const positionHouseViewer = getPositionHouseViewerContract()
  const notionalAndUnrealizedPnl = await positionHouseViewer.methods.getPositionNotionalAndUnrealizedPnl(
    pmAddress,
    trader,
    calcOption,
    position
  ).call()
  
  const res = {
    positionNotional: new BigNumber(notionalAndUnrealizedPnl.positionNotional),
    unrealizedPnl: new BigNumber(notionalAndUnrealizedPnl.unrealizedPnl)
  }

  return res
}
