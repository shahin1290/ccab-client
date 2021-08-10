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
  REQUEST_UPDATE_REQUEST,
  REQUEST_UPDATE_SUCCESS,
  REQUEST_UPDATE_FAIL,
  REQUEST_DELETE_REQUEST,
  REQUEST_DELETE_SUCCESS,
  REQUEST_DELETE_FAIL
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
      'https://server.ccab.tech/api/request',
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
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
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
    const response = await axios.get(
      'https://server.ccab.tech/api/request/',
      config
    )
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

export const getRequestDetails = (id) => async (dispatch, getState) => {
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
      `https://server.ccab.tech/api/request/${id}`,
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
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const deleteRequest = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUEST_DELETE_REQUEST
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

    await axios.delete(`https://server.ccab.tech/api/request/${id}`, config)

    dispatch({
      type: REQUEST_DELETE_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: REQUEST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

// update Request
export const updateRequest = (req, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUEST_UPDATE_REQUEST
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

    //console.log(REQUEST);
    await axios.put(`https://server.ccab.tech/api/request/${id}`, req, config)

    dispatch({
      type: REQUEST_UPDATE_SUCCESS
    })
  } catch (error) {
    // console.log(error.response.data);
    dispatch({
      type: REQUEST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
