import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_ALL_REQUEST,
  ORDER_LIST_ALL_FAIL,
  ORDER_LIST_ALL_SUCCESS,
  ORDER_VIEW_REQUEST,
  ORDER_VIEW_FAIL,
  ORDER_VIEW_SUCCESS,
  ORDER_KLARNA_CREATE_REQUEST,
  ORDER_KLARNA_CREATE_SUCCESS,
  ORDER_KLARNA_CREATE_FAIL,
  ORDER_KLARNA_READ_REQUEST,
  ORDER_KLARNA_READ_SUCCESS,
  ORDER_KLARNA_READ_FAIL,
  KLARNA_SESSION_CREATE_REQUEST,
  KLARNA_SESSION_CREATE_SUCCESS,
  KLARNA_SESSION_CREATE_FAIL,
  KLARNA_SESSION_READ_REQUEST,
  KLARNA_SESSION_READ_SUCCESS,
  KLARNA_SESSION_READ_FAIL,
  ORDER_KLARNA_CAPTURE_REQUEST,
  ORDER_KLARNA_CAPTURE_SUCCESS,
  ORDER_KLARNA_CAPTURE_FAIL,
  STRIPE_SUBSCRIPTION_VIEW_REQUEST,
  STRIPE_SUBSCRIPTION_VIEW_SUCCESS,
  STRIPE_SUBSCRIPTION_VIEW_FAIL,
} from "../constences/orderConst";

export const createOrder = (id, order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    // Descruct from getState()
    const {
      userLogin: { userDetail },
    } = getState();
    const config = {
      headers: { Authorization: "Bearer " + userDetail.token },
    };

    const response = await axios.post(
      `https://ccab-server.up.railway.app/api/order/${id}`,
      order,
      config
    );

    // console.log("response:", response)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      //   payload: console.log("payload:", resconst response.data),
      payload: response.data,
    });
  } catch (error) {
    console.log("error:", error);
    dispatch({
      type: ORDER_CREATE_FAIL,
      //    payload: error.res
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get orders list for student
export const getOrderList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
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
      `https://ccab-server.up.railway.app/api/order/myorders`,
      config
    );

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: response.data.data,
      // payload: console.log("payload: ",response.data)
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get all orders for Admin
export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_ALL_REQUEST,
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
      `https://ccab-server.up.railway.app/api/order/`,
      config
    );

    //console.log("payload: ",response.data.data)
    dispatch({
      type: ORDER_LIST_ALL_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_VIEW_REQUEST,
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
      `https://ccab-server.up.railway.app/api/order/` + id,
      config
    );

    //console.log("payload: ",response.data.data)
    dispatch({
      type: ORDER_VIEW_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_VIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getStripeSubscriptionInvoice =
  (orderBy) => async (dispatch, getState) => {
    try {
      dispatch({
        type: STRIPE_SUBSCRIPTION_VIEW_REQUEST,
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
        "https://ccab-server.up.railway.app/api/order/stripe/view-subscription",
        { orderBy },
        config
      );

      //console.log("payload: ",response.data.data)
      dispatch({
        type: STRIPE_SUBSCRIPTION_VIEW_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: STRIPE_SUBSCRIPTION_VIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createKlarnaSession =
  (order, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: KLARNA_SESSION_CREATE_REQUEST,
      });

      const {
        userLogin: { userDetail },
      } = getState();
      const config = {
        headers: { Authorization: "Bearer " + userDetail.token },
      };

      const response = await axios.post(
        `https://ccab-server.up.railway.app/api/order/${id}/klarna/session`,
        order,
        config
      );

      dispatch({
        type: KLARNA_SESSION_CREATE_SUCCESS,
        // payload: console.log("payload:",  response.data),
        payload: JSON.parse(response.data.data),
      });
    } catch (error) {
      console.log("error:", error);
      dispatch({
        type: KLARNA_SESSION_CREATE_FAIL,
        //    payload: error.res
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createKlarnaOrder = (id, data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_KLARNA_CREATE_REQUEST,
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
      `https://ccab-server.up.railway.app/api/order/${id}/klarna/order`,
      data,
      config
    );

    // console.log("response:", response)

    dispatch({
      type: ORDER_KLARNA_CREATE_SUCCESS,
      // payload: console.log("payload:",  response.data),
      payload: response.data.data,
    });
  } catch (error) {
    console.log("error:", error);
    dispatch({
      type: ORDER_KLARNA_CREATE_FAIL,
      //    payload: error.res
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const readKlarnaOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_KLARNA_READ_REQUEST,
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
      `https://ccab-server.up.railway.app/api/order/${id}/klarna/order`,
      config
    );

    // console.log("response:", response)

    dispatch({
      type: ORDER_KLARNA_READ_SUCCESS,
      // payload: console.log("payload:",  response.data),
      payload: JSON.parse(response.data.data),
    });
  } catch (error) {
    console.log("error:", error);
    dispatch({
      type: ORDER_KLARNA_READ_FAIL,
      //    payload: error.res
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const readKlarnaSession =
  (id, session) => async (dispatch, getState) => {
    try {
      dispatch({
        type: KLARNA_SESSION_READ_REQUEST,
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
        `https://ccab-server.up.railway.app/api/order/${id}/klarna/authorize`,
        session,
        config
      );

      dispatch({
        type: KLARNA_SESSION_READ_SUCCESS,
        // payload: console.log("payload:",  response.data),
        payload: JSON.parse(response.data.data),
      });
    } catch (error) {
      console.log("error:", error);
      dispatch({
        type: KLARNA_SESSION_READ_FAIL,
        //    payload: error.res
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const captureOrder = (id, orderBy) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_KLARNA_CAPTURE_REQUEST,
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
      `https://ccab-server.up.railway.app/api/order/capture/${id}`,
      orderBy,
      config
    );
    // console.log("response:", response)

    dispatch({
      type: ORDER_KLARNA_CAPTURE_SUCCESS,
      // payload: console.log("payload:",  response.data),
      payload: response.data.data,
    });
  } catch (error) {
    console.log("error:", error);
    dispatch({
      type: ORDER_KLARNA_CAPTURE_FAIL,
      //    payload: error.res
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
