import Footer from './components/layout/Footer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container, Image } from 'react-bootstrap'

import ProfileScreen from './components/screens/ProfileScreen'
import CourseLessonScreen from './components/screens/CourseLessonScreen'
import ResultScreen from './components/screens/ResultScreen'
import QuizScreen from './components/screens/QuizScreen'
import CourseContentScreen from './components/screens/CourseContentScreen'
import QuizAnswerScreen from './components/screens/QuizAnswerScreen'
import Checkout from './components/screens/Checkout'
import CheckoutKlarna from './components/screens/CheckoutKlarna'
import ConfirmationKlarna from './components/screens/ConfirmationKlarna'
import ConfirmationCardPurchase from './components/screens/ConfirmationCardPurchase'
import Pricing from './components/screens/Pricing';
import ErrorScreen from './components/screens/ErrorScreen'

import Assignments from './components/layout/Assignments'
import AssignmentDetail from './components/screens/AssignmentDetail'
import Privacy from './components/screens/privacy'
import EditProfileStudent from './components/screens/EditProfileStudent'
/* Admin Screen*/
import MangeCoures from './components/screens/AdminScreen/MangeCoures'
import MangeOrder from './components/screens/AdminScreen/MangeOrder'
import UpdateCourese from './components/screens/AdminScreen/UpdateCourese'
import RequestPayment from './components/screens/AdminScreen/RequestPayment'
import RequestList from './components/screens/AdminScreen/RequestList'
import EditRequest from './components/screens/AdminScreen/EditRequest'
import JobList from './components/screens/AdminScreen/JobList'
import ManageServices from './components/screens/AdminScreen/ManageServices'
import UpdateService from './components/screens/AdminScreen/UpdateService'

/* Mentor Screen*/
import ManageMentorCourses from './components/screens/MentorScreen/ManageMentorCourses'
import UpdateMentorCourse from './components/screens/MentorScreen/UpdateMentorCourse'
import EditMentorSection from './components/screens/MentorScreen/EditMentorSection'
import AddCourseSection from './components/screens/MentorScreen/AddCourseSection'
import AddMentorQuiz from './components/screens/MentorScreen/AddMentorQuiz'
import EditMentorQuiz from './components/screens/MentorScreen/EditMentorQuiz'
import MentorUserListScreen from './components/screens/MentorScreen/MentorUserListScreen'
import MentorTaskList from './components/screens/MentorScreen/MentorTaskList'
import MentorQuizList from './components/screens/MentorScreen/MentorQuizList'
import QuizDetailsScreen from './components/screens/MentorScreen/QuizDetailsScreen'
import MentorCoursesList from './components/screens/MentorScreen/MentorCoursesList'
import TaskDetailsScreen from './components/screens/MentorScreen/TaskDetailsScreen'
import TaskUploadScreen from './components/screens/MentorScreen/TaskUploadScreen'

/* Instructor Routes */
import ReportList from './components/screens/InstructorScreen/ReportList'
import NewSession from './components/screens/InstructorScreen/NewSession'

/* Private Routes  */
import DefaultRoutes from './components/Route/default/DefaultRoute'
import StudentRoute from './components/Route/student/StudentRoute'
import MentorRoute from './components/Route/mentor/MentorRoute'
import InstructorRoute from './components/Route/instructor/InstructorRoute'

import AdminRoute from './components/Route/admin/AdminRoute'
import UserListScreen from './components/screens/AdminScreen/UserList'

/*****************************************/
import 'malihu-custom-scrollbar-plugin'
import react, { useEffect } from 'react'
import WOW from 'wowjs'
import { script } from './assets/js/script'
import './App.css'
import './assets/css/main.css'
import './assets/css/responsive.css'
import Quizzes from './components/layout/Quizzes'

function App() {
  useEffect(() => {
    console.log('hi***')

    //script()
    new WOW.WOW({
      live: false
    }).init()
  }, [])

  return (
    <div className="App">
      <Switch>
        {/* Private Route for Admin  */}
        <AdminRoute exact path="/admin-users-list" component={UserListScreen} />
        <AdminRoute exact path="/admin-courses-list" component={MangeCoures} />
        <AdminRoute
          exact
          path="/admin-services-list"
          component={ManageServices}
        />

        <AdminRoute
          exact
          path="/admin-page/:pageNumber"
          component={MangeCoures}
        ></AdminRoute>

        <AdminRoute exact path="/admin-order-list" component={MangeOrder} />
        <AdminRoute
          exact
          path="/admin-order/:pageNumber"
          component={MangeOrder}
        ></AdminRoute>

        <AdminRoute
          exact
          path="/admin-service-update/:id"
          component={UpdateService}
        ></AdminRoute>

        <AdminRoute
          exact
          path="/admin-coure-update/:id"
          component={UpdateCourese}
        ></AdminRoute>

        <AdminRoute
          exact
          path="/admin-request-payment"
          component={RequestPayment}
        ></AdminRoute>

        <AdminRoute
          exact
          path="/admin-request-edit/:id"
          component={EditRequest}
        ></AdminRoute>

        <AdminRoute
          exact
          path="/admin-request-list"
          component={RequestList}
        ></AdminRoute>

        <AdminRoute
          exact
          path="/admin-job-list"
          component={JobList}
        ></AdminRoute>

        

        {/* Private Route for Mentor  */}
        <MentorRoute
          exact
          path="/mentor-courses-list"
          component={MentorCoursesList}
        />

        <MentorRoute
          exact
          path="/mentor-users-list"
          component={MentorUserListScreen}
        />

        <MentorRoute
          exact
          path="/manage-mentor-course/:id"
          component={ManageMentorCourses}
        ></MentorRoute>

        <MentorRoute
          exact
          path="/mentor-course-update/:weekId/:id"
          component={UpdateMentorCourse}
        ></MentorRoute>

        <MentorRoute
          exact
          path="/mentor-section-edit/:weekId/:id"
          component={EditMentorSection}
        ></MentorRoute>

        <MentorRoute
          exact
          path="/add-course-section/:weekId/:id"
          component={AddCourseSection}
        ></MentorRoute>

        <MentorRoute
          exact
          path="/mentor-add-quiz/:bootcampId/:dayId/:id?"
          component={AddMentorQuiz}
        ></MentorRoute>

        <MentorRoute
          exact
          path="/mentor-show-quiz/:bootcampId/:dayId/:id"
          component={QuizScreen}
        ></MentorRoute>

        <MentorRoute
          exact
          path="/edit-quiz/:bootcampId/:dayId/:id"
          component={EditMentorQuiz}
        ></MentorRoute>

        <MentorRoute
          exact
          path="/mentor-upload-assignment/:bootcampId/:dayId"
          component={TaskUploadScreen}
        ></MentorRoute>

        <MentorRoute
          exact
          path="/mentor-task-list/:bootcampId"
          component={MentorTaskList}
        ></MentorRoute>

        <MentorRoute
          exact
          path="/mentor-quiz-list/:bootcampId"
          component={MentorQuizList}
        ></MentorRoute>

        <MentorRoute
          exact
          path="/quiz-details/:bootcampId/:dayId/:id"
          component={QuizDetailsScreen}
        ></MentorRoute>

        <MentorRoute
          exact
          path="/task-details/:bootcampId/:id"
          component={TaskDetailsScreen}
        ></MentorRoute>

        {/* Private Route for Instructor  */}
        <InstructorRoute
          exact
          path="/reports"
          component={ReportList}
        ></InstructorRoute>
         <InstructorRoute
          exact
          path="/instructor-new-session"
          component={NewSession}
        ></InstructorRoute>

        {/* Private Route for Students  */}
        <StudentRoute
          exact
          path="/assignments"
          component={Assignments}
        ></StudentRoute>

        <StudentRoute exact path="/quizzes" component={Quizzes}></StudentRoute>

        <StudentRoute
          exact
          path="/profile"
          component={ProfileScreen}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/edit-profile-student"
          component={EditProfileStudent}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/course-content/:id"
          component={CourseLessonScreen}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/assignment-details/:bootcampId/:id"
          component={AssignmentDetail}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/lessons"
          component={CourseContentScreen}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/quiz/:id/result"
          component={ResultScreen}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/quiz/:bootcampId/:dayId/:id"
          component={QuizScreen}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/quiz-answer/:bootcampId/:dayId/:id"
          component={QuizAnswerScreen}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/checkout/:bootcampId"
          component={Checkout}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/checkout/subscription/:plan"
          component={Checkout}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/checkout/service/:serviceId"
          component={Checkout}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/checkout/bill/:requestId"
          component={Checkout}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/checkout-klarna/:bootcampId"
          component={CheckoutKlarna}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/confirmation-klarna/:bootcampId"
          component={ConfirmationKlarna}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/confirmation-card-purchase/:bootcampId"
          component={ConfirmationCardPurchase}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/pricing-plans"
          component={Pricing}
        ></StudentRoute>

        {/* default Routes for guests  */}
        <Route component={DefaultRoutes}></Route>
      </Switch>
    </div>
  )
}

export default App
