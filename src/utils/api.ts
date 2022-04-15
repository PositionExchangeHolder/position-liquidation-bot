import axios from 'axios'
import configs from '../../config'

export const getAllPositions = async () => {
  try {
    const api = configs.api.POSITION_DERIVATIVE_SUBGRAPH
    const query = `
      {
        positions {
          id
        }
      }
    `
    const headers = {
      'Content-Type': 'application/json'
    }

    const res = await axios.post(api, { query }, { headers })
    const positions = res.data?.data.positions

    return positions
  }
  catch (error) {
    console.log(error)
  }
}
