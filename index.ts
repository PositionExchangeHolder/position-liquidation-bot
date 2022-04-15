import configs from './config'
import { checkAndLiquidate } from './main'
import { getAllPositions } from './src/utils/api'

const run = async () => {
  console.log(configs)
  
  const positions = await getAllPositions()
  positions.forEach(async (position: any) => {
    const [pmAddress, trader] = position.id.split(':')
    await checkAndLiquidate(pmAddress, trader)
  })
}

run()
