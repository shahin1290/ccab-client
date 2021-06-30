import {
  SESSION_ADD_REQUEST,
  SESSION_ADD_SUCCESS,
  SESSION_ADD_FAIL,
  SESSION_LIST_REQUEST,
  SESSION_LIST_SUCCESS,
  SESSION_LIST_FAIL,
  SESSION_DETAILS_REQUEST,
  SESSION_DETAILS_SUCCESS,
  SESSION_DETAILS_FAIL,
  SESSION_UPDATE_REQUEST,
  SESSION_UPDATE_SUCCESS,
  SESSION_UPDATE_FAIL,
  SESSION_DELETE_REQUEST,
  SESSION_DELETE_SUCCESS,
  SESSION_DELETE_FAIL
} from '../constences/sessionConst'

export const sessionCreateReducer = (
  state = { session: {}, success: false },
  action
) => {
  switch (action.type) {
    case SESSION_ADD_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case SESSION_ADD_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        session: action.payload,
        success: true
      }
    case SESSION_ADD_FAIL:
      return {
        success: false,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const sessionListReducer = (state = { sessions: [] }, action) => {
  switch (action.type) {
    case SESSION_LIST_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case SESSION_LIST_SUCCESS:
      // console.log("actionP: ", action.payload)

      return {
        loading: false, // loading is done laoding!
        sessions: action.payload.data
      }

    case SESSION_LIST_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const sessionDetailsReducer = (
  state = { session: {}, loading: false },
  action
) => {
  switch (action.type) {
    case SESSION_DETAILS_REQUEST:
      return {
        ...state,
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case SESSION_DETAILS_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        session: action.payload
      }

    case SESSION_DETAILS_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const sessionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SESSION_DELETE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case SESSION_DELETE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        successDelete: true
      }
    case SESSION_DELETE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const sessionUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SESSION_UPDATE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case SESSION_UPDATE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        success: true
      }
    case SESSION_UPDATE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}
