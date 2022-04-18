import cron from 'node-cron'
import { run } from '.'

cron.schedule('*/5 * * * *', () => {
  run()
})
