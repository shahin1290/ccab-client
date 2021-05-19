import axios from 'axios'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_KLARNA_CREATE_REQUEST,
  ORDER_KLARNA_CREATE_SUCCESS,
  ORDER_KLARNA_CREATE_FAIL,
  ORDER_KLARNA_READ_REQUEST,
  ORDER_KLARNA_READ_SUCCESS,
  ORDER_KLARNA_READ_FAIL
} from '../constences/orderConst'

export const createOrder = (bootcampId, order) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST
    })

    // Descruct from getState()
    const {
      userLogin: { userDetail }
    } = getState()
    const config = { headers: { Authorization: 'Bearer ' + userDetail.token } }

    const response = await axios.post(`/api/order/${bootcampId}`, order, config)

    // console.log("response:", response)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      //   payload: console.log("payload:", resconst response.data),
      payload: response.data
    })
  } catch (error) {
    console.log('error:', error)
    dispatch({
      type: ORDER_CREATE_FAIL,
      //    payload: error.res
      payload: error.response.data.message
    })
  }
}




export const createKlarnaOrder = (order,id) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_KLARNA_CREATE_REQUEST
    })

 
    const {
      userLogin: { userDetail }
    } = getState()
    const config = { headers: { Authorization: 'Bearer ' + userDetail.token } }

    const response = await axios.post(`https://server.ccab.tech/api/order/${id}/klarna/order`, order, config)

    // console.log("response:", response)

    dispatch({
      type: ORDER_KLARNA_CREATE_SUCCESS,
        // payload: console.log("payload:",  response.data),
      payload: JSON.parse(response.data.data)
    })
  } catch (error) {
    console.log('error:', error)
    dispatch({
      type: ORDER_KLARNA_CREATE_FAIL,
      //    payload: error.res
      payload: error.response.data.message
    })
   
  }
}


export const readKlarnaOrder = (id) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_KLARNA_READ_REQUEST
    })

 
    const {
      userLogin: { userDetail }
    } = getState()
    const config = { headers: { Authorization: 'Bearer ' + userDetail.token } }

    const response = await axios.get(`https://server.ccab.tech/api/order/${id}/klarna/order`, config)

    // console.log("response:", response)

    dispatch({
      type: ORDER_KLARNA_READ_SUCCESS,
        // payload: console.log("payload:",  response.data),
      payload: JSON.parse(response.data.data)
    })
  } catch (error) {
    console.log('error:', error)
    dispatch({
      type: ORDER_KLARNA_READ_FAIL,
      //    payload: error.res
      payload: error.response.data.message
    })
   
  }
}



export const captureOrder =(id)=> async ( dispatch , getState )=>{

  try {

    const {
      userLogin: { userDetail }
    } = getState()
    const config = { headers: { Authorization: 'Bearer ' + userDetail.token } }

    const response = await axios.get(`https://server.ccab.tech/api/order/capture/${id}`, config)



  } catch (error) {
    
  }
}