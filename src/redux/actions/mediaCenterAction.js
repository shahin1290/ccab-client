import {
  MEDIA_CENTER_LIST_REQUEST,
  MEDIA_CENTER_LIST_SUCCESS,
  MEDIA_CENTER_LIST_FAIL,
  MEDIA_CENTER_DETAILS_REQUEST,
  MEDIA_CENTER_DETAILS_SUCCESS,
  MEDIA_CENTER_DETAILS_FAIL,
  MEDIA_CENTER_DELETE_REQUEST,
  MEDIA_CENTER_DELETE_SUCCESS,
  MEDIA_CENTER_DELETE_FAIL,
  MEDIA_CENTER_UPDATE_REQUEST,
  MEDIA_CENTER_UPDATE_SUCCESS,
  MEDIA_CENTER_UPDATE_FAIL,
  MEDIA_CENTER_ADD_REQUEST,
  MEDIA_CENTER_ADD_SUCCESS,
  MEDIA_CENTER_ADD_FAIL,
  ADMIN_MEDIA_CENTER_LIST_REQUEST,
  ADMIN_MEDIA_CENTER_LIST_SUCCESS,
  ADMIN_MEDIA_CENTER_LIST_FAIL
} from '../constences/mediaCenterConst'

import axios from 'axios'

export const getMediaCenterList =
  (pageNumber = '') =>
  async (dispatch, getState) => {
    dispatch({
      type: MEDIA_CENTER_LIST_REQUEST
    })

    try {
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
        `http://localhost:5001/api/mediaCenter?pageNumber=${pageNumber}`,
        config
      )

      dispatch({
        type: MEDIA_CENTER_LIST_SUCCESS,
        payload: response.data.data
        // payload: console.log("payload: ",response.data)
      })
    } catch (error) {
      dispatch({
        type: MEDIA_CENTER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

export const getMediaCenterListForAdmin =
  (pageNumber = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_MEDIA_CENTER_LIST_REQUEST
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
        `http://localhost:5001/api/mediaCenter/mange?pageNumber=${pageNumber}`,
        config
      )

      dispatch({
        type: ADMIN_MEDIA_CENTER_LIST_SUCCESS,
        payload: response.data.data
        // payload: console.log("payload: ",response.data)
      })
    } catch (error) {
      dispatch({
        type: ADMIN_MEDIA_CENTER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

export const getMediaCenterDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEDIA_CENTER_DETAILS_REQUEST
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
      'http://localhost:5001/api/mediaCenter/' + id,
      config
    )

    dispatch({
      type: MEDIA_CENTER_DETAILS_SUCCESS,
      payload: response.data.data
      // payload: console.log("payload: ", response.data),
    })
  } catch (error) {
    dispatch({
      type: MEDIA_CENTER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const createMediaCenter = (mediaCenter) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEDIA_CENTER_ADD_REQUEST
    })

    // Descruct from getState()
    const {
      userLogin: { userDetail }
    } = getState()
    const config = { headers: { Authorization: 'Bearer ' + userDetail.token } }

    const response = await axios.post(
      'http://localhost:5001/api/mediaCenter',
      mediaCenter,
      config
    )

    // console.log("response:", response)

    dispatch({
      type: MEDIA_CENTER_ADD_SUCCESS,
      //   payload: console.log("payload:", resconst response.data),
      payload: response.data
    })
  } catch (error) {
    console.log('error:', error)
    dispatch({
      type: MEDIA_CENTER_ADD_FAIL,
      //    payload: error.res
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const deleteMediaCenter = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEDIA_CENTER_DELETE_REQUEST
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

    await axios.delete('http://localhost:5001/api/mediaCenter/' + id, config)

    dispatch({
      type: MEDIA_CENTER_DELETE_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: MEDIA_CENTER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

// update mediaCenter
export const updateMediaCenter = (mediaCenter, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEDIA_CENTER_UPDATE_REQUEST
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

    //console.log(mediaCenter);
    await axios.put('http://localhost:5001/api/mediaCenter/' + id, mediaCenter, config)

    dispatch({
      type: MEDIA_CENTER_UPDATE_SUCCESS
    })
  } catch (error) {
    // console.log(error.response.data);
    dispatch({
      type: MEDIA_CENTER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
