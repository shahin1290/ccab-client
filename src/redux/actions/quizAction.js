import {
  MY_QUIZ_LIST_REQUEST,
  MY_QUIZ_LIST_SUCCESS,
  MY_QUIZ_LIST_FAIL,
  QUIZ_DETAILS_REQUEST,
  QUIZ_DETAILS_SUCCESS,
  QUIZ_DETAILS_FAIL,
  QUIZ_CREATE_REQUEST,
  QUIZ_CREATE_FAIL,
  QUIZ_CREATE_SUCCESS,
  QUIZ_CREATE_RESET,
  QUIZ_LIST_REQUEST,
  QUIZ_LIST_SUCCESS,
  QUIZ_LIST_FAIL,
  QUIZ_DELETE_REQUEST,
  QUIZ_DELETE_SUCCESS,
  QUIZ_DELETE_FAIL,
  QUIZ_UPDATE_REQUEST,
  QUIZ_UPDATE_SUCCESS,
  QUIZ_UPDATE_FAIL,
  QUIZ_UPDATE_RESET,
} from "../constences/quizConst";

import axios from "axios";

export const getQuizList = (bootcampId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUIZ_LIST_REQUEST,
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
      "https://server.ccab.tech/api/quizzes/" + bootcampId,
      config
    );

    dispatch({
      type: QUIZ_LIST_SUCCESS,
      payload: response.data.data,
      // payload: console.log("payload: ",response.data)
    });
  } catch (error) {
    dispatch({
      type: QUIZ_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMyQuizList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MY_QUIZ_LIST_REQUEST,
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
      `https://server.ccab.tech/api/quizzes/myquizlist`,
      config
    );

    dispatch({
      type: MY_QUIZ_LIST_SUCCESS,
      payload: response.data,
      // payload: console.log("payload: ",response.data)
    });
  } catch (error) {
    dispatch({
      type: MY_QUIZ_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getQuizDetails =
  (bootcampId, dayId, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: QUIZ_DETAILS_REQUEST,
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
        `https://server.ccab.tech/api/quizzes/${bootcampId}/${dayId}/${id}`,
        config
      );

      dispatch({
        type: QUIZ_DETAILS_SUCCESS,
        payload: response.data.data,
        // payload: console.log("payload: ", response.data),
      });
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({
        type: QUIZ_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createQuiz =
  (quizData, bootcampId, dayId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: QUIZ_CREATE_REQUEST,
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
      const response = await axios.post(
        `https://server.ccab.tech/api/quizzes/${bootcampId}/${dayId}`,
        quizData,
        config
      );

      dispatch({
        type: QUIZ_CREATE_SUCCESS,
        //   payload: console.log("payload:", resconst response.data),
        payload: response.data,
      });

      dispatch({
        type: QUIZ_CREATE_RESET,
        // this is turnng back to empty {}, not using the ACTION
      });
    } catch (error) {
      console.log("error:", error.response);
      dispatch({
        type: QUIZ_CREATE_FAIL,
        //    payload: error.res
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const quizDelete =
  (bootcampId, dayId, id) => async (dispatch, getState) => {
    console.log(bootcampId, dayId, id);
    try {
      dispatch({
        type: QUIZ_DELETE_REQUEST,
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

      const response = await axios.delete(
        `https://server.ccab.tech/api/quizzes/${bootcampId}/${dayId}/${id}`,
        config
      );

      dispatch({
        type: QUIZ_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: QUIZ_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateQuiz =
  (bootcampId, dayId, id, quiz) => async (dispatch, getState) => {
    try {
      dispatch({
        type: QUIZ_UPDATE_REQUEST,
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

      const response = await axios.put(
        `https://server.ccab.tech/api/quizzes/${bootcampId}/${dayId}/${id}`,
        quiz,
        config
      );

      dispatch({
        type: QUIZ_UPDATE_SUCCESS,
      });

      dispatch({
        type: QUIZ_UPDATE_RESET,
        // this is turnng back to empty {}, not using the ACTION
      });
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: QUIZ_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
