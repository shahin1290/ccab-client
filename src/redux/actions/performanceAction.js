import {
  PERFORMANCE_ADD_REQUEST,
  PERFORMANCE_ADD_SUCCESS,
  PERFORMANCE_ADD_FAIL,
  PERFORMANCE_LIST_REQUEST,
  PERFORMANCE_LIST_SUCCESS,
  PERFORMANCE_LIST_FAIL,
  PERFORMANCE_DETAILS_REQUEST,
  PERFORMANCE_DETAILS_SUCCESS,
  PERFORMANCE_DETAILS_FAIL,
  PERFORMANCE_UPDATE_REQUEST,
  PERFORMANCE_UPDATE_SUCCESS,
  PERFORMANCE_UPDATE_FAIL,
  PERFORMANCE_DELETE_REQUEST,
  PERFORMANCE_DELETE_SUCCESS,
  PERFORMANCE_DELETE_FAIL,
  PERFORMANCE_LECTURE_LIST_SUCCESS,
  PERFORMANCE_LECTURE_LIST_FAIL,
  PERFORMANCE_LECTURE_LIST_REQUEST,
  TOP_PERFORMANCE_LIST_REQUEST,
  TOP_PERFORMANCE_LIST_SUCCESS,
  TOP_PERFORMANCE_LIST_FAIL,
} from "../constences/performanceConst";

import axios from "axios";

export const createPerformance =
  (performance) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PERFORMANCE_ADD_REQUEST,
      });

      // Descruct from getState()
      const {
        userLogin: { userDetail },
      } = getState();
      const config = {
        headers: { Authorization: "Bearer " + userDetail.token },
      };

      const response = await axios.post(
        "http://localhost:5001/api/performance",
        performance,
        config
      );

      // console.log("response:", response)

      dispatch({
        type: PERFORMANCE_ADD_SUCCESS,
        //   payload: console.log("payload:", resconst response.data),
        payload: response.data,
      });
    } catch (error) {
      console.log("error:", error);
      dispatch({
        type: PERFORMANCE_ADD_FAIL,
        //    payload: error.res
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getPerformances =
  (bootcampId, userId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PERFORMANCE_LIST_REQUEST,
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

      const response = await axios.get(
        `http://localhost:5001/api/performance/${bootcampId}/${userId}`,
        config
      );

      dispatch({
        type: PERFORMANCE_LIST_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      // console.log("error:", error)
      dispatch({
        type: PERFORMANCE_LIST_FAIL,
        //    payload: error.res
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getTopPerformances =
  (bootcampId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TOP_PERFORMANCE_LIST_REQUEST,
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

      const response = await axios.get(
        `http://localhost:5001/api/performance/top-ten/${bootcampId}`,
        config
      );

      dispatch({
        type: TOP_PERFORMANCE_LIST_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      // console.log("error:", error)
      dispatch({
        type: TOP_PERFORMANCE_LIST_FAIL,
        //    payload: error.res
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getWatchingLectures = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PERFORMANCE_LECTURE_LIST_REQUEST,
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

    const response = await axios.get(
      `http://localhost:5001/api/performance/watching-lectures/${id}`,
      config
    );
    dispatch({
      type: PERFORMANCE_LECTURE_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // console.log("error:", error)
    dispatch({
      type: PERFORMANCE_LECTURE_LIST_FAIL,
      //    payload: error.res
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPerformanceDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PERFORMANCE_DETAILS_REQUEST,
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
      `http://localhost:5001/api/performance/${id}`,
      config
    );

    dispatch({
      type: PERFORMANCE_DETAILS_SUCCESS,
      payload: response.data.data,
      // payload: console.log("payload: ", response.data),
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: PERFORMANCE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePerformance = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PERFORMANCE_DELETE_REQUEST,
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

    await axios.delete(`http://localhost:5001/api/performance/${id}`, config);

    dispatch({
      type: PERFORMANCE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PERFORMANCE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// update Request
export const updatePerformance = (req, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PERFORMANCE_UPDATE_REQUEST,
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

    console.log("update performance", id);

    await axios.put(
      `http://localhost:5001/api/performance/daily-performance/${id}`,
      req,
      config
    );

    dispatch({
      type: PERFORMANCE_UPDATE_SUCCESS,
    });
  } catch (error) {
    // console.log(error.response.data);
    dispatch({
      type: PERFORMANCE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
