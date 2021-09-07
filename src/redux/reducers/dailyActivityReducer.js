import {
  DAILY_ACTIVITY_ADD_REQUEST,
  DAILY_ACTIVITY_ADD_SUCCESS,
  DAILY_ACTIVITY_ADD_FAIL,
  DAILY_ACTIVITY_LIST_REQUEST,
  DAILY_ACTIVITY_LIST_SUCCESS,
  DAILY_ACTIVITY_LIST_FAIL,
  DAILY_ACTIVITY_DETAILS_REQUEST,
  DAILY_ACTIVITY_DETAILS_SUCCESS,
  DAILY_ACTIVITY_DETAILS_FAIL,
  DAILY_ACTIVITY_UPDATE_REQUEST,
  DAILY_ACTIVITY_UPDATE_SUCCESS,
  DAILY_ACTIVITY_UPDATE_FAIL,
  DAILY_ACTIVITY_DELETE_REQUEST,
  DAILY_ACTIVITY_DELETE_SUCCESS,
  DAILY_ACTIVITY_DELETE_FAIL
} from '../constences/dailyActivityConst'

export const dailyActivityCreateReducer = (
  state = { dailyActivity: {}, success: false },
  action
) => {
  switch (action.type) {
    case DAILY_ACTIVITY_ADD_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case DAILY_ACTIVITY_ADD_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        dailyActivity: action.payload,
        success: true
      }
    case DAILY_ACTIVITY_ADD_FAIL:
      return {
        success: false,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const dailyActivityListReducer = (state = { dailyActivities: [] }, action) => {
  switch (action.type) {
    case DAILY_ACTIVITY_LIST_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case DAILY_ACTIVITY_LIST_SUCCESS:
      // console.log("actionP: ", action.payload)

      return {
        loading: false, // loading is done laoding!
        dailyActivities: action.payload.data
      }

    case DAILY_ACTIVITY_LIST_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const dailyActivityDetailsReducer = (
  state = { dailyActivity: {}, loading: false },
  action
) => {
  switch (action.type) {
    case DAILY_ACTIVITY_DETAILS_REQUEST:
      return {
        ...state,
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case DAILY_ACTIVITY_DETAILS_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        dailyActivity: action.payload
      }

    case DAILY_ACTIVITY_DETAILS_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const dailyActivityDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DAILY_ACTIVITY_DELETE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case DAILY_ACTIVITY_DELETE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        successDelete: true
      }
    case DAILY_ACTIVITY_DELETE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const dailyActivityUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DAILY_ACTIVITY_UPDATE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case DAILY_ACTIVITY_UPDATE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        success: true
      }
    case DAILY_ACTIVITY_UPDATE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}
