import {
  DAILY_ACTIVITY_ADD_REQUEST,
  DAILY_ACTIVITY_ADD_SUCCESS,
  DAILY_ACTIVITY_ADD_FAIL,
  DAILY_ACTIVITY_LIST_REQUEST,
  DAILY_ACTIVITY_LIST_SUCCESS,
  DAILY_ACTIVITY_LIST_FAIL,
  DAILY_ACTIVITY_DETAILS_REQUEST,
  DAILY_ACTIVITY_DETAILS_SUCCESS,
  DAILY_ACTIVITY_DETAILS_FAIL,
  DAILY_ACTIVITY_UPDATE_REQUEST,
  DAILY_ACTIVITY_UPDATE_SUCCESS,
  DAILY_ACTIVITY_UPDATE_FAIL,
  DAILY_ACTIVITY_DELETE_REQUEST,
  DAILY_ACTIVITY_DELETE_SUCCESS,
  DAILY_ACTIVITY_DELETE_FAIL
} from '../constences/dailyActivityConst'

import axios from 'axios'

export const createDailyActivity =
  (dailyActivity, bootcampId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DAILY_ACTIVITY_ADD_REQUEST
      })

      // Descruct from getState()
      const {
        userLogin: { userDetail }
      } = getState()
      const config = {
        headers: { Authorization: 'Bearer ' + userDetail.token }
      }

      const response = await axios.post(
        'http://localhost:5001/api/dailyActivity/' + bootcampId,
        dailyActivity,
        config
      )

      // console.log("response:", response)

      dispatch({
        type: DAILY_ACTIVITY_ADD_SUCCESS,
        //   payload: console.log("payload:", resconst response.data),
        payload: response.data
      })
    } catch (error) {
      console.log('error:', error)
      dispatch({
        type: DAILY_ACTIVITY_ADD_FAIL,
        //    payload: error.res
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

export const getDailyActivities = (bootcampId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAILY_ACTIVITY_LIST_REQUEST
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
      'http://localhost:5001/api/dailyActivity/' + bootcampId,
      config
    )
    dispatch({
      type: DAILY_ACTIVITY_LIST_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    // console.log("error:", error)
    dispatch({
      type: DAILY_ACTIVITY_LIST_FAIL,
      //    payload: error.res
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const getDailyActivityDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAILY_ACTIVITY_DETAILS_REQUEST
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
      `http://localhost:5001/api/dailyActivity/${id}`,
      config
    )

    dispatch({
      type: DAILY_ACTIVITY_DETAILS_SUCCESS,
      payload: response.data.data
      // payload: console.log("payload: ", response.data),
    })
  } catch (error) {
    console.log(error.response.data.message)
    dispatch({
      type: DAILY_ACTIVITY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const deleteDailyActivity = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAILY_ACTIVITY_DELETE_REQUEST
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

    await axios.delete(`http://localhost:5001/api/dailyActivity/${id}`, config)

    dispatch({
      type: DAILY_ACTIVITY_DELETE_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: DAILY_ACTIVITY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

// update Request
export const updateDailyActivity = (req, bootcampId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAILY_ACTIVITY_UPDATE_REQUEST
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
    await axios.put(`http://localhost:5001/api/dailyActivity/${bootcampId}`, req, config)

    dispatch({
      type: DAILY_ACTIVITY_UPDATE_SUCCESS
    })
  } catch (error) {
    // console.log(error.response.data);
    dispatch({
      type: DAILY_ACTIVITY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
