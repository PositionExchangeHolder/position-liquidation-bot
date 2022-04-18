import configs from './config'
import { checkAndLiquidate } from './main'
import { getAllPositions } from './src/utils/api'
import { convertPrivateKeyToAddress } from './src/utils/getSender'

export const run = async () => {
  if (configs.sender.PRIVATE_KEY) {
    console.log(`[${new Date()}] 👋 ${convertPrivateKeyToAddress(configs.sender.PRIVATE_KEY)}`)
  }
  
  const positions = await getAllPositions()
  if (positions !== undefined) {
    console.log(`Found ${positions.length} positions`)

    console.log('Market \t Trader \t\t\t\t\t Quantity \t Leverage \t UnrealizedPnl \t MarginRatio \t Liquidate')
    positions.forEach(async (position: any) => {
      const [pmAddress, trader] = position.id.split(':')
      await checkAndLiquidate(pmAddress, trader)
    })
  }
}

run()
