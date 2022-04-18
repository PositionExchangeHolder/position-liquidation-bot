import 'dotenv/config'

const bot = {
  ENABLE: process.env.BOT_ENABLE || false,
  MINIMUM_PROFIT_BUSD: Number(process.env.BOT_MINIMUM_PROFIT_BUSD) || 1,
  CRON_TIME: process.env.BOT_CRON_TIME || '*/5 * * * *'
}

const sender = {
  PRIVATE_KEY: process.env.PRIVATE_KEY || ''
}

const transaction = {
  DEFAULT_GAS_PRICE: Number(process.env.TRANSACTION_DEFAULT_GAS_PRICE) || 5, // Gwei
  DEFAULT_GAS_LIMIT: Number(process.env.TRANSACTION_DEFAULT_GAS_LIMIT) || 400_000
}

const api = {
  POSITION_DERIVATIVE_SUBGRAPH: process.env.POSITION_DERIVATIVE_SUBGRAPH || ''
}

const web3 = {
  MAINNET_RPC: process.env.WEB3_MAINNET_RPC || 'https://bsc-dataseed.binance.org/'
}

const address = {
  POSITION_HOUSE_PROXY: process.env.ADDRESS_POSITION_HOUSE_PROXY || '0xf495d56a70585c729c822b0a6050c5ccc38d33fa',
  POSITION_HOUSE_VIEWER_PROXY: process.env.ADDRESS_POSITION_HOUSE_VIEWER_PROXY || '0x2842AFF5708AFa3E3199Cf508e2DA9Ba8Afcbff3',
  POSITION_HOUSE_CONFIGURATION_PROXY: process.env.ADDRESS_POSITION_HOUSE_CONFIGURATION_PROXY || '0x460f4aab09f2f3802d1a988935589fc1d5f64b14'
}

const configs = {
  api,
  web3,
  transaction,
  bot,
  sender,
  address
}

export default configs
