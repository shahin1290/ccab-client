import {
  DAY_LIST_REQUEST,
  DAY_LIST_SUCCESS,
  DAY_LIST_FAIL,
  DAY_DETAILS_REQUEST,
  DAY_DETAILS_SUCCESS,
  DAY_DETAILS_FAIL,
  DAY_UPDATE_REQUEST,
  DAY_UPDATE_SUCCESS,
  DAY_UPDATE_FAIL,
  DAY_VIDEO_LIST_REQUEST,
  DAY_VIDEO_LIST_SUCCESS,
  DAY_VIDEO_LIST_FAIL,
} from "../constences/dayConst";

import axios from "axios";

export const getDayList = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAY_LIST_REQUEST,
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
      `https://ccab-server.up.railway.app/api/content/` + id,
      config
    );

    dispatch({
      type: DAY_LIST_SUCCESS,
      payload: response.data.data,
      // payload: console.log("payload: ",response.data)
    });
  } catch (error) {
    dispatch({
      type: DAY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDayVideoList = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAY_VIDEO_LIST_REQUEST,
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
      `https://ccab-server.up.railway.app/api/content/videos/${id}`,
      config
    );
    dispatch({
      type: DAY_VIDEO_LIST_SUCCESS,
      payload: response.data.data,
      // payload: console.log("payload: ",response.data)
    });
  } catch (error) {
    dispatch({
      type: DAY_VIDEO_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDayDetails = (weekId, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAY_DETAILS_REQUEST,
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
      `https://ccab-server.up.railway.app/api/content/${weekId}/${id}`,
      config
    );

    dispatch({
      type: DAY_DETAILS_SUCCESS,
      payload: response.data.data,
      // payload: console.log("payload: ", response.data),
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: DAY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// update course
export const updateDay = (weekId, id, day) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAY_UPDATE_REQUEST,
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

    await axios.put(
      `https://ccab-server.up.railway.app/api/content/${weekId}/${id}`,
      day,
      config
    );

    dispatch({
      type: DAY_UPDATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DAY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
