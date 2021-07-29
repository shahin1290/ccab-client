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
  PERFORMANCE_DELETE_FAIL
} from '../constences/performanceConst'

export const performanceCreateReducer = (
  state = { performance: {}, success: false },
  action
) => {
  switch (action.type) {
    case PERFORMANCE_ADD_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case PERFORMANCE_ADD_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        performance: action.payload,
        success: true
      }
    case PERFORMANCE_ADD_FAIL:
      return {
        success: false,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const performanceListReducer = (state = { performances: [] }, action) => {
  switch (action.type) {
    case PERFORMANCE_LIST_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case PERFORMANCE_LIST_SUCCESS:
      // console.log("actionP: ", action.payload)

      return {
        loading: false, // loading is done laoding!
        performances: action.payload.data
      }

    case PERFORMANCE_LIST_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const performanceDetailsReducer = (
  state = { performance: {}, loading: false },
  action
) => {
  switch (action.type) {
    case PERFORMANCE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case PERFORMANCE_DETAILS_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        performance: action.payload
      }

    case PERFORMANCE_DETAILS_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const performanceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PERFORMANCE_DELETE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case PERFORMANCE_DELETE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        successDelete: true
      }
    case PERFORMANCE_DELETE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const performanceUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PERFORMANCE_UPDATE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case PERFORMANCE_UPDATE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        success: true
      }
    case PERFORMANCE_UPDATE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}
