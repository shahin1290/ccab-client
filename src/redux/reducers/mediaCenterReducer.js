import {
  MEDIA_CENTER_LIST_REQUEST,
  MEDIA_CENTER_LIST_SUCCESS,
  MEDIA_CENTER_LIST_FAIL,
  MEDIA_CENTER_DETAILS_REQUEST,
  MEDIA_CENTER_DETAILS_SUCCESS,
  MEDIA_CENTER_DETAILS_FAIL,
  MEDIA_CENTER_DELETE_REQUEST,
  MEDIA_CENTER_DELETE_SUCCESS,
  MEDIA_CENTER_DELETE_FAIL,
  MEDIA_CENTER_UPDATE_REQUEST,
  MEDIA_CENTER_UPDATE_SUCCESS,
  MEDIA_CENTER_UPDATE_FAIL,
  MEDIA_CENTER_UPDATE_RESET,
  MEDIA_CENTER_ADD_REQUEST,
  MEDIA_CENTER_ADD_SUCCESS,
  MEDIA_CENTER_ADD_FAIL,
  ADMIN_MEDIA_CENTER_LIST_REQUEST,
  ADMIN_MEDIA_CENTER_LIST_SUCCESS,
  ADMIN_MEDIA_CENTER_LIST_FAIL
} from '../constences/mediaCenterConst'

export const mediaCenterListReducer = (
  state = { mediaCenterList: [] },
  action
) => {
  switch (action.type) {
    case MEDIA_CENTER_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case MEDIA_CENTER_LIST_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        mediaCenterList: action.payload.mediaCenters,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case MEDIA_CENTER_LIST_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const adminMediaCenterListReducer = (
  state = { mediaCenterList: [] },
  action
) => {
  switch (action.type) {
    case ADMIN_MEDIA_CENTER_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ADMIN_MEDIA_CENTER_LIST_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        mediaCenterList: action.payload.mediaCenters,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case ADMIN_MEDIA_CENTER_LIST_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const mediaCenterDetailsReducer = (
  state = { mediaCenter: {}, loading: false },
  action
) => {
  switch (action.type) {
    case MEDIA_CENTER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case MEDIA_CENTER_DETAILS_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        mediaCenter: action.payload
      }

    case MEDIA_CENTER_DETAILS_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const mediaCenterCreateReducer = (
  state = { mediaCenter: {}, success: false },
  action
) => {
  switch (action.type) {
    case MEDIA_CENTER_ADD_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case MEDIA_CENTER_ADD_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        mediaCenter: action.payload,
        success: true
      }
    case MEDIA_CENTER_ADD_FAIL:
      return {
        success: false,
        loading: false, // loading is done laoding!
        error: action.payload
      }
    case 'MEDIA_CENTER_ADD_RESET':
      return {
        loading: false, // loading is done laoding!
        error: null,
        success: false
      }
    default:
      return state
  }
}

export const mediaCenterDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MEDIA_CENTER_DELETE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case MEDIA_CENTER_DELETE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        successDelete: true
      }
    case MEDIA_CENTER_DELETE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const mediaCenterUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case MEDIA_CENTER_UPDATE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case MEDIA_CENTER_UPDATE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        success: true
      }
    case MEDIA_CENTER_UPDATE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload
      }

    case MEDIA_CENTER_UPDATE_RESET:
      return {
        loading: false, // loading is done laoding!
        error: null,
        success: false
      }
    default:
      return state
  }
}
