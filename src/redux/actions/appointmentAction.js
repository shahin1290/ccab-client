import {
  APPOINTMENT_ADD_REQUEST,
  APPOINTMENT_ADD_SUCCESS,
  APPOINTMENT_ADD_FAIL,
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_DETAILS_REQUEST,
  APPOINTMENT_DETAILS_SUCCESS,
  APPOINTMENT_DETAILS_FAIL,
  APPOINTMENT_UPDATE_REQUEST,
  APPOINTMENT_UPDATE_SUCCESS,
  APPOINTMENT_UPDATE_FAIL,
  APPOINTMENT_DELETE_REQUEST,
  APPOINTMENT_DELETE_SUCCESS,
  APPOINTMENT_DELETE_FAIL
} from '../constences/appointmentConst'

import axios from 'axios'

export const createAppointment =
  (appointment) => async (dispatch, getState) => {
    try {
      dispatch({
        type: APPOINTMENT_ADD_REQUEST
      })

      // Descruct from getState()
      const {
        userLogin: { userDetail }
      } = getState()
      const config = {
        headers: { Authorization: 'Bearer ' + userDetail.token }
      }

      const response = await axios.post(
        'http://localhost:5001/api/appointment',
        appointment,
        config
      )

      // console.log("response:", response)

      dispatch({
        type: APPOINTMENT_ADD_SUCCESS,
        //   payload: console.log("payload:", resconst response.data),
        payload: response.data
      })
    } catch (error) {
      console.log('error:', error)
      dispatch({
        type: APPOINTMENT_ADD_FAIL,
        //    payload: error.res
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

export const getAppointments = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_LIST_REQUEST
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
      'http://localhost:5001/api/appointment/',
      config
    )
    dispatch({
      type: APPOINTMENT_LIST_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    // console.log("error:", error)
    dispatch({
      type: APPOINTMENT_LIST_FAIL,
      //    payload: error.res
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const getAppointmentDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_DETAILS_REQUEST
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
      `http://localhost:5001/api/appointment/${id}`,
      config
    )

    dispatch({
      type: APPOINTMENT_DETAILS_SUCCESS,
      payload: response.data.data
      // payload: console.log("payload: ", response.data),
    })
  } catch (error) {
    console.log(error.response.data.message)
    dispatch({
      type: APPOINTMENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const deleteAppointment = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_DELETE_REQUEST
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

    await axios.delete(`http://localhost:5001/api/appointment/${id}`, config)

    dispatch({
      type: APPOINTMENT_DELETE_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: APPOINTMENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

// update Request
export const updateAppointment = (req, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_UPDATE_REQUEST
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
    await axios.put(`http://localhost:5001/api/appointment/${id}`, req, config)

    dispatch({
      type: APPOINTMENT_UPDATE_SUCCESS
    })
  } catch (error) {
    // console.log(error.response.data);
    dispatch({
      type: APPOINTMENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
