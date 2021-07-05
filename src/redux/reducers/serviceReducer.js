import {
  SERVICE_LIST_REQUEST,
  SERVICE_LIST_SUCCESS,
  SERVICE_LIST_FAIL,
  SERVICE_DETAILS_REQUEST,
  SERVICE_DETAILS_SUCCESS,
  SERVICE_DETAILS_FAIL,
  SERVICE_DELETE_REQUEST,
  SERVICE_DELETE_SUCCESS,
  SERVICE_DELETE_FAIL,
  SERVICE_UPDATE_REQUEST,
  SERVICE_UPDATE_SUCCESS,
  SERVICE_UPDATE_FAIL,
  SERVICE_UPDATE_RESET,
  SERVICE_ADD_REQUEST,
  SERVICE_ADD_SUCCESS,
  SERVICE_ADD_FAIL,
  ADMIN_SERVICE_LIST_REQUEST,
  ADMIN_SERVICE_LIST_SUCCESS,
  ADMIN_SERVICE_LIST_FAIL,
  SERVICE_INSTRUCTOR_UPDATE_REQUEST,
  SERVICE_INSTRUCTOR_UPDATE_SUCCESS,
  SERVICE_INSTRUCTOR_UPDATE_FAIL,
} from '../constences/serviceConst'

export const serviceListReducer = (state = { serviceList: [] }, action) => {
  switch (action.type) {
    case SERVICE_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SERVICE_LIST_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        serviceList: action.payload.services,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case SERVICE_LIST_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const adminServiceListReducer = (
  state = { serviceList: [] },
  action
) => {
  switch (action.type) {
    case ADMIN_SERVICE_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ADMIN_SERVICE_LIST_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        serviceList: action.payload.services,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case ADMIN_SERVICE_LIST_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const serviceDetailsReducer = (
  state = { service: {}, loading: false },
  action
) => {
  switch (action.type) {
    case SERVICE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case SERVICE_DETAILS_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        service: action.payload
      }

    case SERVICE_DETAILS_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const serviceCreateReducer = (
  state = { service: {}, success: false },
  action
) => {
  switch (action.type) {
    case SERVICE_ADD_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case SERVICE_ADD_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        service: action.payload,
        success: true
      }
    case SERVICE_ADD_FAIL:
      return {
        success: false,
        loading: false, // loading is done laoding!
        error: action.payload
      }
    case 'SERVICE_ADD_RESET':
      return {
        loading: false, // loading is done laoding!
        error: null,
        success: false
      }
    default:
      return state
  }
}

export const serviceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_DELETE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case SERVICE_DELETE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        successDelete: true
      }
    case SERVICE_DELETE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const serviceUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_UPDATE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case SERVICE_UPDATE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        success: true
      }
    case SERVICE_UPDATE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload
      }

    case SERVICE_UPDATE_RESET:
      return {
        loading: false, // loading is done laoding!
        error: null,
        success: false
      }
    default:
      return state
  }
}

export const serviceInstructorUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_INSTRUCTOR_UPDATE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case SERVICE_INSTRUCTOR_UPDATE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        success: true
      }
    case SERVICE_INSTRUCTOR_UPDATE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload
      }


    default:
      return state
  }
}
