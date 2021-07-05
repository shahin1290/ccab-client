import {
  SERVICE_CATEGORY_ADD_REQUEST,
  SERVICE_CATEGORY_ADD_SUCCESS,
  SERVICE_CATEGORY_ADD_FAIL,
  SERVICE_CATEGORY_LIST_REQUEST,
  SERVICE_CATEGORY_LIST_SUCCESS,
  SERVICE_CATEGORY_LIST_FAIL,
  SERVICE_CATEGORY_DETAILS_REQUEST,
  SERVICE_CATEGORY_DETAILS_SUCCESS,
  SERVICE_CATEGORY_DETAILS_FAIL,
  SERVICE_CATEGORY_UPDATE_REQUEST,
  SERVICE_CATEGORY_UPDATE_SUCCESS,
  SERVICE_CATEGORY_UPDATE_FAIL,
  SERVICE_CATEGORY_DELETE_REQUEST,
  SERVICE_CATEGORY_DELETE_SUCCESS,
  SERVICE_CATEGORY_DELETE_FAIL
} from '../constences/serviceCategoryConst'

export const serviceCategoryCreateReducer = (
  state = { serviceCategory: {}, success: false },
  action
) => {
  switch (action.type) {
    case SERVICE_CATEGORY_ADD_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case SERVICE_CATEGORY_ADD_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        serviceCategory: action.payload,
        success: true
      }
    case SERVICE_CATEGORY_ADD_FAIL:
      return {
        success: false,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const serviceCategoryListReducer = (state = { serviceCategories: [] }, action) => {
  switch (action.type) {
    case SERVICE_CATEGORY_LIST_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case SERVICE_CATEGORY_LIST_SUCCESS:
      // console.log("actionP: ", action.payload)

      return {
        loading: false, // loading is done laoding!
        serviceCategories: action.payload.data
      }

    case SERVICE_CATEGORY_LIST_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const serviceCategoryDetailsReducer = (
  state = { serviceCategory: {}, loading: false },
  action
) => {
  switch (action.type) {
    case SERVICE_CATEGORY_DETAILS_REQUEST:
      return {
        ...state,
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case SERVICE_CATEGORY_DETAILS_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        serviceCategory: action.payload
      }

    case SERVICE_CATEGORY_DETAILS_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const serviceCategoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_CATEGORY_DELETE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case SERVICE_CATEGORY_DELETE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        successDelete: true
      }
    case SERVICE_CATEGORY_DELETE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const serviceCategoryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_CATEGORY_UPDATE_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case SERVICE_CATEGORY_UPDATE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        success: true
      }
    case SERVICE_CATEGORY_UPDATE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}
