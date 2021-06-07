import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
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
  KLARNA_SESSION_READ_FAIL
} from '../constences/orderConst'

export const orderCreateReducer = (
  state = { order: {}, success: false },
  action
) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case ORDER_CREATE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        order: action.payload,
        success: true
      }
    case ORDER_CREATE_FAIL:
      return {
        success: false,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const orderListReducer = (state = { orderList: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ORDER_LIST_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        orderList: action.payload
      }
    case ORDER_LIST_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

// get all orders for admin
export const orderListAllReducer = (state = { orderList: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_ALL_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ORDER_LIST_ALL_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        orderList: action.payload
      }
    case ORDER_LIST_ALL_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const orderVeiwReducer = (
  state = { order: {}, loading: false },
  action
) => {
  switch (action.type) {
    case ORDER_VIEW_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ORDER_VIEW_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        order: action.payload
      }
    case ORDER_VIEW_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload,
        order: {}
      }

    default:
      return state
  }
}
export const klarnaSessionCreateReducer = (
  state = { session: {}, success: false },
  action
) => {
  switch (action.type) {
    case KLARNA_SESSION_CREATE_REQUEST:
      return {
        loading: true
      }

    case KLARNA_SESSION_CREATE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        session: action.payload,
        success: true
      }
    case KLARNA_SESSION_CREATE_FAIL:
      return {
        success: false,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const klarnaSessionReadReducer = (
  state = { token: {}, loading: false },
  action
) => {
  switch (action.type) {
    case KLARNA_SESSION_READ_REQUEST:
      return {
        ...state,
        loading: true
      }
    case KLARNA_SESSION_READ_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        token: action.payload
      }
    case KLARNA_SESSION_READ_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload,
        token: {}
      }

    default:
      return state
  }
}


export const orderKlarnaCreateReducer = (
  state = { order: {}, success: false },
  action
) => {
  switch (action.type) {
    case ORDER_KLARNA_CREATE_REQUEST:
      return {
        loading: true
      }

    case ORDER_KLARNA_CREATE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        order: action.payload,
        success: true
      }
    case ORDER_KLARNA_CREATE_FAIL:
      return {
        success: false,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const orderKlarnaReadReducer = (
  state = { order: {}, success: false },
  action
) => {
  switch (action.type) {
    case ORDER_KLARNA_READ_REQUEST:
      return {
        loading: true
      }

    case ORDER_KLARNA_READ_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        order: action.payload,
        success: true
      }
    case ORDER_KLARNA_READ_FAIL:
      return {
        success: false,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}
