import {
  CURRENCY_CREATE_REQUEST,
  CURRENCY_CREATE_SUCCESS,
  CURRENCY_CREATE_FAIL
} from '../constences/currencyConst'

import axios from 'axios'

export const createCurrrency = (currency) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CURRENCY_CREATE_REQUEST
    })

    // Descruct from getState()
    const {
      userLogin: { userDetail }
    } = getState()
    const config = { headers: { Authorization: 'Bearer ' + userDetail.token } }

    const response = await axios.post(
      'http://localhost:5001/currency-convert',
      { currency },
      config
    )

    // console.log("response:", response)

    dispatch({
      type: CURRENCY_CREATE_SUCCESS,
      //   payload: console.log("payload:", resconst response.data),
      payload: response.data
    })
  } catch (error) {
    console.log('error:', error)
    dispatch({
      type: CURRENCY_CREATE_FAIL,
      //    payload: error.res
      payload: error.response.data.message
    })
  }
}
