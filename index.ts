import clc from 'cli-color'
import configs from './config'
import { checkAndLiquidate } from './main'
import { getAllPositions } from './src/utils/api'
import { convertPrivateKeyToAddress } from './src/utils/getSender'
import { generatePositionHeader } from './src/utils/log'

export const run = async () => {
  console.log(`Enable Bot: ${configs.bot.ENABLE}`)
  if (configs.bot.ENABLE) {
    if (configs.sender.PRIVATE_KEY) {
      console.log(`[${new Date()}] 👋 ${convertPrivateKeyToAddress(configs.sender.PRIVATE_KEY)}`)
    }
  }
  
  const positions = await getAllPositions()
  if (positions !== undefined) {
    console.log(`Found ${clc.green(positions.length)} available positions`)

    console.log(generatePositionHeader())
    positions.forEach(async (position: any) => {
      const [pmAddress, trader] = position.id.split(':')
      await checkAndLiquidate(pmAddress, trader)
    })
  }
}

run()
