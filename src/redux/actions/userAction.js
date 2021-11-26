import socketIOClient from "socket.io-client";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REG_REQUEST,
  USER_REG_SUCCESS,
  USER_REG_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REST,
  VALID_REQUEST,
  VALID_SUCCESS,
  VALID_FAIL,
  USER_NUMBERS_SUCCESS,
  USER_NUMBERS_REQUEST,
  USER_NUMBERS_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from "../constences/userConst";

import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      "http://localhost:5001/api/users/login",
      { email, password },
      config
    );
    // console.log("res:", res)

    dispatch({
      type: USER_LOGIN_SUCCESS,
      //   payload: console.log("payload:", res.data),
      payload: response.data,
    });

    localStorage.setItem("userDetail", JSON.stringify(response.data));
  } catch (error) {
    console.log("error:", error);

    dispatch({
      type: USER_LOGIN_FAIL,

      //    payload: error.res
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const logout = () => (dispatch, getState) => {
  const {
    userLogin: { userDetail },
  } = getState();

  const socket = socketIOClient("http://localhost:5001");

  socket.emit("logout", { userId: userDetail._id });

  localStorage.removeItem("userDetail");
  dispatch({
    type: USER_LOGOUT,
  });
};

export const registerUser =
  (name, email, password, phoneNumber, gender, language) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_REG_REQUEST,
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
      const response = await axios.post(
        "http://localhost:5001/api/users/register",
        { name, email, password, phoneNumber, gender, language },
        config
      );

      dispatch({
        type: USER_REG_SUCCESS,
        //   payload: console.log("payload:", res.data),
        payload: response.data,
      });

      //localStorage.setItem("userDetail", JSON.stringify(response));
    } catch (error) {
      // console.log("error:", error)
      dispatch({
        type: USER_REG_FAIL,
        //    payload: error.res
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserDetails = (id) => async (dispatch, getState) => {
  // in this case ID can be a profile
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    // Descruct from getState()
    const {
      userLogin: { userDetail },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail.token,
      },
    };
    //console.log('config : ',config);
    const response = await axios.get(
      "http://localhost:5001/api/users/" + id,
      config
    );
    // console.log("response:", response);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      // payload: console.log("payload:", response.data),
      payload: response.data,
    });
  } catch (error) {
    // console.log("error:", error)
    dispatch({
      type: USER_DETAILS_FAIL,
      //    payload: error.res
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProfile = () => async (dispatch, getState) => {
  // in this case ID can be a profile
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });

    // Descruct from getState()
    const {
      userLogin: { userDetail },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail.token,
      },
    };
    //console.log('config : ',config);
    const response = await axios.get(
      "http://localhost:5001/api/users/profile",
      config
    );
    // console.log("response:", response);

    dispatch({
      type: USER_PROFILE_SUCCESS,
      // payload: console.log("payload:", response.data),
      payload: response.data,
    });
  } catch (error) {
    // console.log("error:", error)
    dispatch({
      type: USER_PROFILE_FAIL,
      //    payload: error.res
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
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
      "http://localhost:5001/api/users/",
      config
    );
    // console.log("response:", response);
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // console.log("error:", error)
    dispatch({
      type: USER_LIST_FAIL,
      //    payload: error.res
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    // Descruct from getState()
    const {
      userLogin: { userDetail },
    } = getState();
    const config = {
      headers: {
        // "Content-Type": "application/json", // we do not need this
        // becouse, we are sending GET requset!
        Authorization: "Bearer " + userDetail.token,
      },
    };
    await axios.delete("http://localhost:5001/api/users/" + id, config);
    // console.log("res:", res)

    dispatch({
      type: USER_DELETE_SUCCESS,
      //   payload: console.log("payload:", res.data),
      // payload: res.data,
    });
  } catch (error) {
    // console.log("error:", error)
    dispatch({
      type: USER_DELETE_FAIL,
      //    payload: error.res
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userProfileUpdate = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_UPDATE_REQUEST,
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
      "http://localhost:5001/api/users/profile",
      user,
      config
    );

    dispatch({
      type: USER_PROFILE_UPDATE_SUCCESS,
      payload: response.data,
      // payload: console.log("payload:", res.data),
      success: true,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response.data,
    });

    //localStorage.setItem("userDetail", JSON.stringify(response.data));
  } catch (error) {
    console.log(" error.response :", error.response.data.message);
    dispatch({
      type: USER_PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// for updating user role
export const UpdateUserRole = (user, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
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
      "http://localhost:5001/api/users/" + id,
      user,
      config
    );

    dispatch({
      type: USER_NUMBERS_SUCCESS,
      payload: response.data,
      // payload: console.log("payload:", res.data),
      success: true,
    });

    //localStorage.setItem("userDetail", JSON.stringify(response.data));
  } catch (error) {
    console.log(" error.response :", error.response.data.message);
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get users numbers function
export const getUesrsNumbers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_NUMBERS_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(
      "http://localhost:5001/api/users/numbers",
      config
    );

    dispatch({
      type: USER_NUMBERS_SUCCESS,
      payload: response.data,
      // console.log("payload:", res.data),
      success: true,
    });
  } catch (error) {
    dispatch({
      type: USER_NUMBERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// is token valid
export const isValid = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VALID_REQUEST,
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

    const response = await axios.post(
      "http://localhost:5001/api/users/valid",
      {},
      config
    );

    // console.log("res: ", res);
    dispatch({
      type: VALID_SUCCESS,
      payload: response.data.user,
      // payload: console.log("payload:", res.data),
      success: true,
    });

    localStorage.setItem("userDetail", JSON.stringify(response.data.user));
  } catch (error) {
    console.log("error", error.response.data.message);
    dispatch({
      type: VALID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// is token valid
export const getForgotPassword = (email) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userDetail },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail.token,
      },
    };

    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });

    const response = await axios.post(
      "http://localhost:5001/api/users/forgot-password",
      { email },
      config
    );

    // console.log("res: ", res);
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: response.data.message,
      // payload: console.log("payload:", res.data),
      success: true,
    });
  } catch (error) {
    console.log("error", error.response.data.message);
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// is token valid
export const resetPassword =
  (token, password) => async (dispatch, getState) => {
    try {
      const {
        userLogin: { userDetail },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userDetail.token,
        },
      };

      dispatch({
        type: RESET_PASSWORD_REQUEST,
      });

      const response = await axios.put(
        "http://localhost:5001/api/users/reset-password/" + token,
        { password },
        config
      );

      // console.log("res: ", res);
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: response.data,
        // payload: console.log("payload:", res.data),
        success: true,
      });

      localStorage.setItem("userDetail", JSON.stringify(response.data));
    } catch (error) {
      console.log("error", error.response.data.message);
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
