import {
  PROMO_ADD_REQUEST,
  PROMO_ADD_SUCCESS,
  PROMO_ADD_FAIL,
  PROMO_LIST_REQUEST,
  PROMO_LIST_SUCCESS,
  PROMO_LIST_FAIL,
  PROMO_DETAILS_REQUEST,
  PROMO_DETAILS_SUCCESS,
  PROMO_DETAILS_FAIL,
  PROMO_UPDATE_REQUEST,
  PROMO_UPDATE_SUCCESS,
  PROMO_UPDATE_FAIL,
  PROMO_DELETE_REQUEST,
  PROMO_DELETE_SUCCESS,
  PROMO_DELETE_FAIL,
} from "../constences/promoConst";

export const promoCreateReducer = (
  state = { promo: {}, success: false },
  action
) => {
  switch (action.type) {
    case PROMO_ADD_REQUEST:
      return {
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case PROMO_ADD_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        promo: action.payload,
        success: true,
      };
    case PROMO_ADD_FAIL:
      return {
        success: false,
        loading: false, // loading is done laoding!
        error: action.payload,
      };

    default:
      return state;
  }
};

export const promoListReducer = (state = { promos: [] }, action) => {
  switch (action.type) {
    case PROMO_LIST_REQUEST:
      return {
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case PROMO_LIST_SUCCESS:
      // console.log("actionP: ", action.payload)

      return {
        loading: false, // loading is done laoding!
        promos: action.payload.data,
      };

    case PROMO_LIST_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload,
      };

    default:
      return state;
  }
};

export const promoDetailsReducer = (
  state = { promo: {}, loading: false },
  action
) => {
  switch (action.type) {
    case PROMO_DETAILS_REQUEST:
      return {
        ...state,
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case PROMO_DETAILS_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        promo: action.payload,
      };

    case PROMO_DETAILS_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload,
      };

    default:
      return state;
  }
};

export const promoDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PROMO_DELETE_REQUEST:
      return {
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case PROMO_DELETE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        successDelete: true,
      };
    case PROMO_DELETE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload,
      };

    default:
      return state;
  }
};

export const promoUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROMO_UPDATE_REQUEST:
      return {
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case PROMO_UPDATE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        success: true,
      };
    case PROMO_UPDATE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload,
      };

    default:
      return state;
  }
};
