import web3 from '../config/web3'
import PositionHouseViewerABI from '../abis/PositionHouseViewer.json'
import PositionHouseABI from '../abis/PositionHouse.json'
import PositionHouseConfigurationProxyABI from '../abis/PositionHouseConfigurationProxy.json'
import configs from '../../config'

const getContract = (address: string, abi: any) => {
  return new web3.eth.Contract(abi, address)
}

export const getPositionHouseContract = () => {
  return getContract(configs.address.POSITION_HOUSE_PROXY, PositionHouseABI)
}

export const getPositionHouseViewerContract = () => {
  return getContract(configs.address.POSITION_HOUSE_VIEWER_PROXY, PositionHouseViewerABI)
}

export const getPositionHouseConfigurationProxyContract = () => {
  return getContract(configs.address.POSITION_HOUSE_CONFIGURATION_PROXY, PositionHouseConfigurationProxyABI)
}
