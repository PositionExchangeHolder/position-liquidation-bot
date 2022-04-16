import configs from './config'
import { checkAndLiquidate } from './main'
import { getAllPositions } from './src/utils/api'

const run = async () => {
  console.log(configs)
  
  const positions = await getAllPositions()
  if (positions !== undefined) {
    console.log(`Found ${positions.length} positions`)

    console.log('Market \t Trader \t\t\t\t\t Quantity \t UnrealizedPnl \t MarginRatio')
    positions.forEach(async (position: any) => {
      const [pmAddress, trader] = position.id.split(':')
      await checkAndLiquidate(pmAddress, trader)
    })
  }
}

run()
