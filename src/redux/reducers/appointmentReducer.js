import {
  APPOINTMENT_ADD_REQUEST,
  APPOINTMENT_ADD_SUCCESS,
  APPOINTMENT_ADD_FAIL,
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  INSTRUCTOR_APPOINTMENT_LIST_REQUEST,
  INSTRUCTOR_APPOINTMENT_LIST_SUCCESS,
  INSTRUCTOR_APPOINTMENT_LIST_FAIL,
  APPOINTMENT_DETAILS_REQUEST,
  APPOINTMENT_DETAILS_SUCCESS,
  APPOINTMENT_DETAILS_FAIL,
  APPOINTMENT_UPDATE_REQUEST,
  APPOINTMENT_UPDATE_SUCCESS,
  APPOINTMENT_UPDATE_FAIL,
  APPOINTMENT_DELETE_REQUEST,
  APPOINTMENT_DELETE_SUCCESS,
  APPOINTMENT_DELETE_FAIL,
} from "../constences/appointmentConst";

export const appointmentCreateReducer = (
  state = { appointment: {}, success: false },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_ADD_REQUEST:
      return {
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case APPOINTMENT_ADD_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        appointment: action.payload,
        success: true,
      };
    case APPOINTMENT_ADD_FAIL:
      return {
        success: false,
        loading: false, // loading is done laoding!
        error: action.payload,
      };

    default:
      return state;
  }
};

export const appointmentListReducer = (
  state = { appointments: [] },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_LIST_REQUEST:
      return {
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case APPOINTMENT_LIST_SUCCESS:
      // console.log("actionP: ", action.payload)

      return {
        loading: false, // loading is done laoding!
        appointments: action.payload.data,
      };

    case APPOINTMENT_LIST_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload,
      };

    default:
      return state;
  }
};

export const instructorAppointmentListReducer = (
  state = { instructorAppointments: [] },
  action
) => {
  switch (action.type) {
    case INSTRUCTOR_APPOINTMENT_LIST_REQUEST:
      return {
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case INSTRUCTOR_APPOINTMENT_LIST_SUCCESS:
      // console.log("actionP: ", action.payload)

      return {
        loading: false, // loading is done laoding!
        instructorAppointments: action.payload.data,
      };

    case INSTRUCTOR_APPOINTMENT_LIST_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload,
      };

    default:
      return state;
  }
};

export const appointmentDetailsReducer = (
  state = { appointment: {}, loading: false },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case APPOINTMENT_DETAILS_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        appointment: action.payload,
      };

    case APPOINTMENT_DETAILS_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload,
      };

    default:
      return state;
  }
};

export const appointmentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_DELETE_REQUEST:
      return {
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case APPOINTMENT_DELETE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        successDelete: true,
      };
    case APPOINTMENT_DELETE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload,
      };

    default:
      return state;
  }
};

export const appointmentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_UPDATE_REQUEST:
      return {
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case APPOINTMENT_UPDATE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        success: true,
      };
    case APPOINTMENT_UPDATE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload,
      };

    default:
      return state;
  }
};
