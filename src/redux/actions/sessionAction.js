import {
  SESSION_ADD_REQUEST,
  SESSION_ADD_SUCCESS,
  SESSION_ADD_FAIL,
  SESSION_LIST_REQUEST,
  SESSION_LIST_SUCCESS,
  SESSION_LIST_FAIL,
  SESSION_DETAILS_REQUEST,
  SESSION_DETAILS_SUCCESS,
  SESSION_DETAILS_FAIL,
  SESSION_UPDATE_REQUEST,
  SESSION_UPDATE_SUCCESS,
  SESSION_UPDATE_FAIL,
  SESSION_DELETE_REQUEST,
  SESSION_DELETE_SUCCESS,
  SESSION_DELETE_FAIL
} from '../constences/sessionConst'

import axios from 'axios'

export const createSession = (session) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SESSION_ADD_REQUEST
    })

    // Descruct from getState()
    const {
      userLogin: { userDetail }
    } = getState()
    const config = { headers: { Authorization: 'Bearer ' + userDetail.token } }

    const response = await axios.post(
      'https://server.ccab.tech/api/session',
      session,
      config
    )

    // console.log("response:", response)

    dispatch({
      type: SESSION_ADD_SUCCESS,
      //   payload: console.log("payload:", resconst response.data),
      payload: response.data
    })
  } catch (error) {
    console.log('error:', error)
    dispatch({
      type: SESSION_ADD_FAIL,
      //    payload: error.res
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const getSessions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SESSION_LIST_REQUEST
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
      'https://server.ccab.tech/api/session/',
      config
    )
    dispatch({
      type: SESSION_LIST_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    // console.log("error:", error)
    dispatch({
      type: SESSION_LIST_FAIL,
      //    payload: error.res
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const getSessionDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SESSION_DETAILS_REQUEST
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
      `https://server.ccab.tech/api/session/${id}`,
      config
    )

    dispatch({
      type: SESSION_DETAILS_SUCCESS,
      payload: response.data.data
      // payload: console.log("payload: ", response.data),
    })
  } catch (error) {
    console.log(error.response.data.message)
    dispatch({
      type: SESSION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const deleteSession = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SESSION_DELETE_REQUEST
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

    await axios.delete(`https://server.ccab.tech/api/session/${id}`, config)

    dispatch({
      type: SESSION_DELETE_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: SESSION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

// update Request
export const updateSession = (req, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SESSION_UPDATE_REQUEST
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
    await axios.put(`https://server.ccab.tech/api/session/${id}`, req, config)

    dispatch({
      type: SESSION_UPDATE_SUCCESS
    })
  } catch (error) {
    // console.log(error.response.data);
    dispatch({
      type: SESSION_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
