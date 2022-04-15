import BigNumber from 'bignumber.js'

export const getBalanceNumber = (num: BigNumber, digits = 2): number => {
  return Number(num.div(1e18).toFixed(digits))
}
