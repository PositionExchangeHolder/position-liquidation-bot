import axios from 'axios'
import configs from '../../config'
import { PositionResponse } from './types'

export const getAllPositions = async (
  first = 200
): Promise<PositionResponse[] | undefined> => {
  try {
    const api = configs.api.POSITION_DERIVATIVE_SUBGRAPH
    const query = `
      {
        positions(first: ${first}, orderBy: "updatedAt", orderDirection: "desc") {
          id
        }
      }
    `
    const headers = {
      'Content-Type': 'application/json'
    }

    const res = await axios.post(api, { query }, { headers })
    const positions: PositionResponse[] = res.data?.data.positions

    return positions
  }
  catch (error) {
    console.log(error)
    return undefined
  }
}
