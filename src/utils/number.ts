import BigNumber from 'bignumber.js'

export const getBalanceNumber = (num: BigNumber | string, digits = 2): number => {
  return Number(new BigNumber(num).div(1e18).toFixed(digits))
}
