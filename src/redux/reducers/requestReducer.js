import {
  REQUEST_ADD_REQUEST,
  REQUEST_ADD_SUCCESS,
  REQUEST_ADD_FAIL,
  REQUEST_LIST_REQUEST,
  REQUEST_LIST_SUCCESS,
  REQUEST_LIST_FAIL,
  REQUEST_DETAILS_REQUEST,
  REQUEST_DETAILS_SUCCESS,
  REQUEST_DETAILS_FAIL,
} from '../constences/requestConst'

export const requestCreateReducer = (
  state = { request: {}, success: false },
  action
) => {
  switch (action.type) {
    case REQUEST_ADD_REQUEST:
      return {
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case REQUEST_ADD_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        request: action.payload,
        success: true
      }
    case REQUEST_ADD_FAIL:
      return {
        success: false,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const requestListReducer = (state = { requests: [] }, action) => {
  switch (action.type) {
    case REQUEST_LIST_REQUEST:
      return {
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case REQUEST_LIST_SUCCESS:
      // console.log("actionP: ", action.payload)

      return {
        loading: false, // loading is done laoding!
        requests: action.payload.data,
      };

    case REQUEST_LIST_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload,
      };

    default:
      return state;
  }
};

export const requestDetailsReducer = (
  state = { request: {}, loading: false },
  action
) => {
  switch (action.type) {
    case REQUEST_DETAILS_REQUEST:
      return {
        ...state,
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case REQUEST_DETAILS_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        request: action.payload
      }

    case REQUEST_DETAILS_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}