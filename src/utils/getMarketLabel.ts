const MARKET_LABELS = [
  '0x9300cf53112b7d88896e748a8c22d946e8441a16', // BTC
  '0xa334b8fb7f033b9698895a7c8220d48ac3dc6968' // BNB
]

const getMarketLabel = (pmAddress: string): string => {
  if (pmAddress === MARKET_LABELS[0]) {
    return 'BTC'
  } else if (pmAddress === MARKET_LABELS[1]) {
    return 'BNB'
  } else {
    return ''
  }
}

export default getMarketLabel
