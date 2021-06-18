import {
  REQUEST_ADD_REQUEST,
  REQUEST_ADD_SUCCESS,
  REQUEST_ADD_FAIL,
  REQUEST_LIST_REQUEST,
  REQUEST_LIST_SUCCESS,
  REQUEST_LIST_FAIL,
  REQUEST_DETAILS_REQUEST,
  REQUEST_DETAILS_SUCCESS,
  REQUEST_DETAILS_FAIL,
} from '../constences/requestConst'

import axios from 'axios'

export const createRequest = (request) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUEST_ADD_REQUEST
    })

    // Descruct from getState()
    const {
      userLogin: { userDetail }
    } = getState()
    const config = { headers: { Authorization: 'Bearer ' + userDetail.token } }

    const response = await axios.post(
      'http://localhost:5001/api/request',
      request,
      config
    )

    // console.log("response:", response)

    dispatch({
      type: REQUEST_ADD_SUCCESS,
      //   payload: console.log("payload:", resconst response.data),
      payload: response.data
    })
  } catch (error) {
    console.log('error:', error)
    dispatch({
      type: REQUEST_ADD_FAIL,
      //    payload: error.res
      payload: error.response.data.message
    })
  }
}


export const getRequests = () => async (dispatch, getState) => {

  try {
    dispatch({
      type: REQUEST_LIST_REQUEST
    })

    // Descruct from getState()
    const {
      userLogin: { userDetail }
    } = getState()
    const config = {
      headers: {
        Authorization: 'Bearer ' + userDetail.token
      }
    }
    const response = await axios.get('http://localhost:5001/api/request/', config)
    dispatch({
      type: REQUEST_LIST_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    // console.log("error:", error)
    dispatch({
      type: REQUEST_LIST_FAIL,
      //    payload: error.res
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const getRequestDetails = ( id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUEST_DETAILS_REQUEST
    })
    const {
      userLogin: { userDetail }
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userDetail.token
      }
    }

    const response = await axios.get(
      `http://localhost:5001/api/request/${id}`,
      config
    )

    dispatch({
      type: REQUEST_DETAILS_SUCCESS,
      payload: response.data.data
      // payload: console.log("payload: ", response.data),
    })
  } catch (error) {
    console.log(error.response.data.message)
    dispatch({
      type: REQUEST_DETAILS_FAIL,
      payload: error.response.data.message
    })
  }
}
