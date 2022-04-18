import cron from 'node-cron'
import { run } from '.'
import configs from './config'

cron.schedule(configs.bot.CRON_TIME, () => {
  run()
})
