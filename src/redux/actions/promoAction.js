import {
  PROMO_ADD_REQUEST,
  PROMO_ADD_SUCCESS,
  PROMO_ADD_FAIL,
  PROMO_LIST_REQUEST,
  PROMO_LIST_SUCCESS,
  PROMO_LIST_FAIL,
  PROMO_DETAILS_REQUEST,
  PROMO_DETAILS_SUCCESS,
  PROMO_DETAILS_FAIL,
  PROMO_UPDATE_REQUEST,
  PROMO_UPDATE_SUCCESS,
  PROMO_UPDATE_FAIL,
  PROMO_DELETE_REQUEST,
  PROMO_DELETE_SUCCESS,
  PROMO_DELETE_FAIL,
} from "../constences/promoConst";

import axios from "axios";

export const createPromo = (promo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROMO_ADD_REQUEST,
    });

    // Descruct from getState()
    const {
      userLogin: { userDetail },
    } = getState();
    const config = { headers: { Authorization: "Bearer " + userDetail.token } };

    const response = await axios.post(
      "http://localhost:5001/api/promo",
      promo,
      config
    );

    // console.log("response:", response)

    dispatch({
      type: PROMO_ADD_SUCCESS,
      //   payload: console.log("payload:", resconst response.data),
      payload: response.data,
    });
  } catch (error) {
    console.log("error:", error);
    dispatch({
      type: PROMO_ADD_FAIL,
      //    payload: error.res
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPromos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROMO_LIST_REQUEST,
    });

    // Descruct from getState()
    const {
      userLogin: { userDetail },
    } = getState();
    const config = {
      headers: {
        Authorization: "Bearer " + userDetail.token,
      },
    };
    const response = await axios.get("http://localhost:5001/api/promo/");
    dispatch({
      type: PROMO_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // console.log("error:", error)
    dispatch({
      type: PROMO_LIST_FAIL,
      //    payload: error.res
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPromoDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROMO_DETAILS_REQUEST,
    });
    const {
      userLogin: { userDetail },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail.token,
      },
    };

    const response = await axios.get(
      `http://localhost:5001/api/promo/${id}`,
      config
    );

    dispatch({
      type: PROMO_DETAILS_SUCCESS,
      payload: response.data.data,
      // payload: console.log("payload: ", response.data),
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: PROMO_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePromo = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROMO_DELETE_REQUEST,
    });

    const {
      userLogin: { userDetail },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail.token,
      },
    };

    await axios.delete(`http://localhost:5001/api/promo/${id}`, config);

    dispatch({
      type: PROMO_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PROMO_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePromo = (req, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROMO_UPDATE_REQUEST,
    });

    const {
      userLogin: { userDetail },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail.token,
      },
    };

    //console.log(REQUEST);
    await axios.put(`http://localhost:5001/api/promo/${id}`, req);

    dispatch({
      type: PROMO_UPDATE_SUCCESS,
    });
  } catch (error) {
    // console.log(error.response.data);
    dispatch({
      type: PROMO_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
