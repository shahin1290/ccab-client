import {
  SERVICE_CATEGORY_ADD_REQUEST,
  SERVICE_CATEGORY_ADD_SUCCESS,
  SERVICE_CATEGORY_ADD_FAIL,
  SERVICE_CATEGORY_LIST_REQUEST,
  SERVICE_CATEGORY_LIST_SUCCESS,
  SERVICE_CATEGORY_LIST_FAIL,
  SERVICE_CATEGORY_DETAILS_REQUEST,
  SERVICE_CATEGORY_DETAILS_SUCCESS,
  SERVICE_CATEGORY_DETAILS_FAIL,
  SERVICE_CATEGORY_UPDATE_REQUEST,
  SERVICE_CATEGORY_UPDATE_SUCCESS,
  SERVICE_CATEGORY_UPDATE_FAIL,
  SERVICE_CATEGORY_DELETE_REQUEST,
  SERVICE_CATEGORY_DELETE_SUCCESS,
  SERVICE_CATEGORY_DELETE_FAIL
} from '../constences/serviceCategoryConst'

import axios from 'axios'

export const createServiceCategory =
  (serviceCategory) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SERVICE_CATEGORY_ADD_REQUEST
      })

      // Descruct from getState()
      const {
        userLogin: { userDetail }
      } = getState()
      const config = {
        headers: { Authorization: 'Bearer ' + userDetail.token }
      }

      const response = await axios.post(
        'https://server.ccab.tech/api/serviceCategory',
        serviceCategory,
        config
      )

      // console.log("response:", response)

      dispatch({
        type: SERVICE_CATEGORY_ADD_SUCCESS,
        //   payload: console.log("payload:", resconst response.data),
        payload: response.data
      })
    } catch (error) {
      console.log('error:', error)
      dispatch({
        type: SERVICE_CATEGORY_ADD_FAIL,
        //    payload: error.res
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

export const getServiceCategories = () => async (dispatch, getState) => {
  console.log('hh');
  try {
    dispatch({
      type: SERVICE_CATEGORY_LIST_REQUEST
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
      'https://server.ccab.tech/api/serviceCategory/',
      config
    )

    dispatch({
      type: SERVICE_CATEGORY_LIST_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    // console.log("error:", error)
    dispatch({
      type: SERVICE_CATEGORY_LIST_FAIL,
      //    payload: error.res
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const getServiceCategoryDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SERVICE_CATEGORY_DETAILS_REQUEST
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
      `https://server.ccab.tech/api/serviceCategory/${id}`,
      config
    )

    dispatch({
      type: SERVICE_CATEGORY_DETAILS_SUCCESS,
      payload: response.data.data
      // payload: console.log("payload: ", response.data),
    })
  } catch (error) {
    console.log(error.response.data.message)
    dispatch({
      type: SERVICE_CATEGORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const deleteServiceCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SERVICE_CATEGORY_DELETE_REQUEST
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

    await axios.delete(
      `https://server.ccab.tech/api/serviceCategory/${id}`,
      config
    )

    dispatch({
      type: SERVICE_CATEGORY_DELETE_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: SERVICE_CATEGORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

// update serviceCategory
export const updateServiceCategory =
  (req, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SERVICE_CATEGORY_UPDATE_REQUEST
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
      await axios.put(
        `https://server.ccab.tech/api/serviceCategory/${id}`,
        req,
        config
      )

      dispatch({
        type: SERVICE_CATEGORY_UPDATE_SUCCESS
      })
    } catch (error) {
      // console.log(error.response.data);
      dispatch({
        type: SERVICE_CATEGORY_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }
