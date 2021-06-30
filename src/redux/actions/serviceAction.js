import {
  SERVICE_LIST_REQUEST,
  SERVICE_LIST_SUCCESS,
  SERVICE_LIST_FAIL,
  SERVICE_DETAILS_REQUEST,
  SERVICE_DETAILS_SUCCESS,
  SERVICE_DETAILS_FAIL,
  SERVICE_DELETE_REQUEST,
  SERVICE_DELETE_SUCCESS,
  SERVICE_DELETE_FAIL,
  SERVICE_UPDATE_REQUEST,
  SERVICE_UPDATE_SUCCESS,
  SERVICE_UPDATE_FAIL,
  SERVICE_ADD_REQUEST,
  SERVICE_ADD_SUCCESS,
  SERVICE_ADD_FAIL,
  ADMIN_SERVICE_LIST_REQUEST,
  ADMIN_SERVICE_LIST_SUCCESS,
  ADMIN_SERVICE_LIST_FAIL
} from '../constences/serviceConst'

import axios from 'axios'

export const getServiceList =
  (pageNumber = '') =>
  async (dispatch, getState) => {
    dispatch({
      type: SERVICE_LIST_REQUEST
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
        `http://localhost:5001/api/service?pageNumber=${pageNumber}`,
        config
      )

      dispatch({
        type: SERVICE_LIST_SUCCESS,
        payload: response.data.data
        // payload: console.log("payload: ",response.data)
      })
    } catch (error) {
      dispatch({
        type: SERVICE_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

export const getServiceListForAdmin =
  (pageNumber = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_SERVICE_LIST_REQUEST
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
        `http://localhost:5001/api/service/manage?pageNumber=${pageNumber}`,
        config
      )


      dispatch({
        type: ADMIN_SERVICE_LIST_SUCCESS,
        payload: response.data.data
        // payload: console.log("payload: ",response.data)
      })
    } catch (error) {
      dispatch({
        type: ADMIN_SERVICE_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

export const getServiceDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SERVICE_DETAILS_REQUEST
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
      'http://localhost:5001/api/service/' + id,
      config
    )

    dispatch({
      type: SERVICE_DETAILS_SUCCESS,
      payload: response.data.data
      // payload: console.log("payload: ", response.data),
    })
  } catch (error) {
    dispatch({
      type: SERVICE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const createService = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SERVICE_ADD_REQUEST
    })

    // Descruct from getState()
    const {
      userLogin: { userDetail }
    } = getState()
    const config = { headers: { Authorization: 'Bearer ' + userDetail.token } }

    const response = await axios.get(
      'http://localhost:5001/api/service/admin/new-service',
      config
    )

    // console.log("response:", response)

    dispatch({
      type: SERVICE_ADD_SUCCESS,
      //   payload: console.log("payload:", resconst response.data),
      payload: response.data
    })
  } catch (error) {
    console.log('error:', error)
    dispatch({
      type: SERVICE_ADD_FAIL,
      //    payload: error.res
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const deleteService = (id) => async (dispatch, getState) => {
  console.log(id);
  try {
    dispatch({
      type: SERVICE_DELETE_REQUEST
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

    await axios.delete('http://localhost:5001/api/service/' + id, config)

    dispatch({
      type: SERVICE_DELETE_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: SERVICE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

// update service
export const updateService = (service, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SERVICE_UPDATE_REQUEST
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

    //console.log(service);
    await axios.put('http://localhost:5001/api/service/' + id, service, config)

    dispatch({
      type: SERVICE_UPDATE_SUCCESS
    })
  } catch (error) {
    // console.log(error.response.data);
    dispatch({
      type: SERVICE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
