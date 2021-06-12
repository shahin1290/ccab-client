import {
  CURRENCY_CREATE_REQUEST,
  CURRENCY_CREATE_SUCCESS,
  CURRENCY_CREATE_FAIL
} from '../constences/currencyConst'

export const currencyCreateReducer = (state = {currency:{},success:false}, action) => {
  switch (action.type) {
    case CURRENCY_CREATE_REQUEST:
      return {
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case CURRENCY_CREATE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        currency: action.payload,
        success: true,
      };
    case CURRENCY_CREATE_FAIL:
      return {
        success: false,
        loading: false, // loading is done laoding!
        error: action.payload,
      }
     
    default:
      return state;
  }
};