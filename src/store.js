import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateProfileReducer,
  ValidReducer,
  UpdateUserRoleReducer,
  userNumbersReducer,
  userProfileReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
} from "./redux/reducers/userReducer";

import {
  taskListReducer,
  taskDetailsReducer,
  taskCreateReducer,
  taskDeleteReducer,
  taskCheckedReducer,
  taskPassedReducer,
  taskNotPassedReducer,
  taskMyListReducer,
} from "./redux/reducers/taskReducer";

import {
  createAnswerReducer,
  // answerDetailsReducer,
  answerMyListReducer,
  answersListReducer,
  answerListDeleteReducer,
  OneAnswerReducer,
  UpdateAnswerStatusReducer,
} from "./redux/reducers/answerReducer";

import {
  courseListReducer,
  courseDetailsReducer,
  courseDeleteReducer,
  courseCreateReducer,
  AdmincourseListReducer,
  courseUpdateReducer,
} from "./redux/reducers/courseReducer";

import {
  weekListReducer,
  weekUpdateReducer,
} from "./redux/reducers/weekReducer";
import {
  dayListReducer,
  dayDetailsReducer,
  dayUpdateReducer,
  dayVideoListReducer,
} from "./redux/reducers/dayReducer";
import {
  myQuizListReducer,
  quizDetailsReducer,
  quizCreateReducer,
  quizListReducer,
  quizDeleteReducer,
  quizUpdateReducer,
} from "./redux/reducers/quizReducer";
import {
  createQuizAnswerReducer,
  quizAnswerMyListReducer,
  quizAnswerListReducer,
} from "./redux/reducers/quizAnswerReducer";

import {
  orderCreateReducer,
  orderListReducer,
  klarnaSessionCreateReducer,
  klarnaSessionReadReducer,
  orderKlarnaCreateReducer,
  orderKlarnaReadReducer,
  orderVeiwReducer,
  orderListAllReducer,
  orderKlarnaCaptureReducer,
  stripeSubscriptionInvoiceReducer,
} from "./redux/reducers/orderReducer";
import { currencyCreateReducer } from "./redux/reducers/currencyReducer";
import {
  requestCreateReducer,
  requestListReducer,
  requestDetailsReducer,
  requestDeleteReducer,
  requestUpdateReducer,
} from "./redux/reducers/requestReducer";

import { jobCreateReducer, jobListReducer } from "./redux/reducers/jobReducer";

import {
  serviceListReducer,
  serviceDetailsReducer,
  serviceDeleteReducer,
  serviceCreateReducer,
  adminServiceListReducer,
  serviceUpdateReducer,
  serviceInstructorUpdateReducer,
} from "./redux/reducers/serviceReducer";

import {
  sessionCreateReducer,
  sessionListReducer,
  sessionDetailsReducer,
  sessionDeleteReducer,
  sessionUpdateReducer,
} from "./redux/reducers/sessionReducer";

import {
  appointmentCreateReducer,
  appointmentListReducer,
  instructorAppointmentListReducer,
  appointmentDetailsReducer,
  appointmentDeleteReducer,
  appointmentUpdateReducer,
} from "./redux/reducers/appointmentReducer";

import {
  serviceCategoryCreateReducer,
  serviceCategoryListReducer,
  serviceCategoryDetailsReducer,
  serviceCategoryDeleteReducer,
  serviceCategoryUpdateReducer,
} from "./redux/reducers/serviceCategoryReducer";

import {
  performanceCreateReducer,
  performanceListReducer,
  performanceLectureListReducer,
  performanceDetailsReducer,
  topPerformanceListReducer,
  performanceDeleteReducer,
  performanceUpdateReducer,
} from "./redux/reducers/performanceReducer";

import {
  mediaCenterListReducer,
  mediaCenterDetailsReducer,
  mediaCenterDeleteReducer,
  mediaCenterCreateReducer,
  adminMediaCenterListReducer,
  mediaCenterUpdateReducer,
} from "./redux/reducers/mediaCenterReducer";

import {
  dailyActivityCreateReducer,
  dailyActivityListReducer,
  dailyActivityDetailsReducer,
  dailyActivityDeleteReducer,
  dailyActivityUpdateReducer,
} from "./redux/reducers/dailyActivityReducer";

import {
  promoCreateReducer,
  promoListReducer,
  promoDetailsReducer,
  promoDeleteReducer,
  promoUpdateReducer,
} from "./redux/reducers/promoReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateProfileReducer,
  userUpdateRole: UpdateUserRoleReducer,
  userNumbers: userNumbersReducer,
  userProfile: userProfileReducer,
  forgotPassword: forgotPasswordReducer,
  passwordReset: resetPasswordReducer,

  //task
  taskDetails: taskDetailsReducer,
  taskList: taskListReducer,
  taskCreate: taskCreateReducer,
  taskDelete: taskDeleteReducer,
  taskCheck: taskCheckedReducer,
  taskPassed: taskPassedReducer,
  taskNotPassed: taskNotPassedReducer,
  taskListMy: taskMyListReducer,
  answerCreate: createAnswerReducer,
  quizAnswerCreate: createQuizAnswerReducer,
  // answerDetails: answerDetailsReducer,
  answerMyList: answerMyListReducer,
  listAnswer: answersListReducer,
  listAnswerDelete: answerListDeleteReducer,
  OneAnswer: OneAnswerReducer,
  AnswerStatus: UpdateAnswerStatusReducer,
  isTokenValid: ValidReducer,
  courseList: courseListReducer,
  AdminCourseList: AdmincourseListReducer,
  courseDetails: courseDetailsReducer,
  courseCreate: courseCreateReducer,
  courseDelete: courseDeleteReducer,
  courseUpdate: courseUpdateReducer,
  weekList: weekListReducer,
  weekUpdate: weekUpdateReducer,
  dayList: dayListReducer,
  dayDetails: dayDetailsReducer,
  dayUpdate: dayUpdateReducer,
  dayVideoList: dayVideoListReducer,
  myQuizList: myQuizListReducer,
  quizDetails: quizDetailsReducer,
  quizCreate: quizCreateReducer,
  quizList: quizListReducer,
  quizAnswerMyList: quizAnswerMyListReducer,
  quizDelete: quizDeleteReducer,
  quizAnswerList: quizAnswerListReducer,
  quizUpdate: quizUpdateReducer,
  orderCreate: orderCreateReducer,
  orderList: orderListReducer,
  stripeSubscriptionInvoice: stripeSubscriptionInvoiceReducer,
  KlarnaSessionCreate: klarnaSessionCreateReducer,
  KlarnaOrderCreate: orderKlarnaCreateReducer,
  KlarnaOrderRead: orderKlarnaReadReducer,
  klarnaSessionRead: klarnaSessionReadReducer,
  KlarnaOrderCapture: orderKlarnaCaptureReducer,
  getOrderView: orderVeiwReducer,
  getAllOrders: orderListAllReducer,
  currencyCreate: currencyCreateReducer,
  requestCreate: requestCreateReducer,
  requestList: requestListReducer,
  requestDetails: requestDetailsReducer,
  requestUpdate: requestUpdateReducer,
  requestDelete: requestDeleteReducer,
  jobCreate: jobCreateReducer,
  jobList: jobListReducer,
  serviceList: serviceListReducer,
  adminServiceList: adminServiceListReducer,
  serviceDetails: serviceDetailsReducer,
  serviceCreate: serviceCreateReducer,
  serviceDelete: serviceDeleteReducer,
  serviceUpdate: serviceUpdateReducer,
  serviceInstructorUpdate: serviceInstructorUpdateReducer,
  sessionCreate: sessionCreateReducer,
  sessionList: sessionListReducer,
  sessionDetails: sessionDetailsReducer,
  sessionUpdate: sessionUpdateReducer,
  sessionDelete: sessionDeleteReducer,
  appointmentCreate: appointmentCreateReducer,
  appointmentList: appointmentListReducer,
  appointmentDetails: appointmentDetailsReducer,
  appointmentUpdate: appointmentUpdateReducer,
  appointmentDelete: appointmentDeleteReducer,
  instructorAppointmentList: instructorAppointmentListReducer,
  serviceCategoryCreate: serviceCategoryCreateReducer,
  serviceCategoryList: serviceCategoryListReducer,
  serviceCategoryDetails: serviceCategoryDetailsReducer,
  serviceCategoryUpdate: serviceCategoryUpdateReducer,
  serviceCategoryDelete: serviceCategoryDeleteReducer,
  performanceCreate: performanceCreateReducer,
  performanceList: performanceListReducer,
  topPerformanceList: topPerformanceListReducer,
  performanceDetails: performanceDetailsReducer,
  performanceUpdate: performanceUpdateReducer,
  performanceDelete: performanceDeleteReducer,
  mediaCenterList: mediaCenterListReducer,
  performanceLectureList: performanceLectureListReducer,
  adminmediaCenterList: adminMediaCenterListReducer,
  mediaCenterDetails: mediaCenterDetailsReducer,
  mediaCenterCreate: mediaCenterCreateReducer,
  mediaCenterDelete: mediaCenterDeleteReducer,
  mediaCenterUpdate: mediaCenterUpdateReducer,
  dailyActivityCreate: dailyActivityCreateReducer,
  dailyActivityList: dailyActivityListReducer,
  dailyActivityDetails: dailyActivityDetailsReducer,
  dailyActivityUpdate: dailyActivityUpdateReducer,
  dailyActivityDelete: dailyActivityDeleteReducer,
  //promo
  promoCreate: promoCreateReducer,
  promoList: promoListReducer,
  promoDetails: promoDetailsReducer,
  promoUpdate: promoUpdateReducer,
  promoDelete: promoDeleteReducer,
});

const userDetailsFromStorage = localStorage.getItem("userDetail")
  ? JSON.parse(localStorage.getItem("userDetail"))
  : {};

const initialState = {
  userLogin: { userDetail: userDetailsFromStorage },
}; // here we can get localStorage, token
const middleware = [thunk];

const devTools =
  process.env.REACT_APP_NODE_ENV === "production"
    ? applyMiddleware(...middleware)
    : composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(reducer, initialState, devTools);

export default store;
