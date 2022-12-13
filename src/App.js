import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ProfileScreen from "./components/screens/ProfileScreen";
import CourseLessonScreen from "./components/screens/CourseLessonScreen";
import ResultScreen from "./components/screens/ResultScreen";
import QuizScreen from "./components/screens/QuizScreen";
import CourseContentScreen from "./components/screens/CourseContentScreen";
import QuizAnswerScreen from "./components/screens/QuizAnswerScreen";
import Checkout from "./components/screens/Checkout";
import CheckoutKlarna from "./components/screens/CheckoutKlarna";
import ConfirmationKlarna from "./components/screens/ConfirmationKlarna";
import ConfirmationCardPurchase from "./components/screens/ConfirmationCardPurchase";
/* Auth Route */
import AuthRoute from "./components/Route/auth/AuthRoute";

import { SideBarStateProvider } from "./util/sidebarState";
import Assignments from "./components/layout/Assignments";
import AssignmentDetail from "./components/screens/AssignmentDetail";
import EditProfile from "./components/screens/EditProfile";
/* Admin Screen*/
import MangeCoures from "./components/screens/AdminScreen/MangeCoures";
import MangeOrder from "./components/screens/AdminScreen/MangeOrder";
import UpdateCourese from "./components/screens/AdminScreen/UpdateCourese";
import JobList from "./components/screens/AdminScreen/JobList";
import ManageMediaCenters from "./components/screens/AdminScreen/ManageMediaCenters";
import UpdateMediaCenterDayContent from "./components/screens/AdminScreen/UpdateMediaCenterDayContent";
import EditMediaCenterDay from "./components/screens/AdminScreen/EditMediaCenterDay";
/* Mentor Screen*/
import ManageMentorCourses from "./components/screens/MentorScreen/ManageMentorCourses";
import UpdateMentorCourse from "./components/screens/MentorScreen/UpdateMentorCourse";
import EditMentorSection from "./components/screens/MentorScreen/EditMentorSection";
import AddCourseSection from "./components/screens/MentorScreen/AddCourseSection";
import AddMentorQuiz from "./components/screens/MentorScreen/AddMentorQuiz";
import EditMentorQuiz from "./components/screens/MentorScreen/EditMentorQuiz";
import MentorUserListScreen from "./components/screens/MentorScreen/MentorUserListScreen";
import MentorTaskList from "./components/screens/MentorScreen/MentorTaskList";
import MentorQuizList from "./components/screens/MentorScreen/MentorQuizList";
import QuizDetailsScreen from "./components/screens/MentorScreen/QuizDetailsScreen";
import MentorCoursesList from "./components/screens/MentorScreen/MentorCoursesList";
import TaskDetailsScreen from "./components/screens/MentorScreen/TaskDetailsScreen";
import TaskUploadScreen from "./components/screens/MentorScreen/TaskUploadScreen";

/* Instructor Routes */

/* Private Routes  */

import StudentRoute from "./components/Route/student/StudentRoute";
import MentorRoute from "./components/Route/mentor/MentorRoute";

import AdminRoute from "./components/Route/admin/AdminRoute";

import UserListScreen from "./components/screens/AdminScreen/UserList";

/*****************************************/
import "malihu-custom-scrollbar-plugin";
import WOW from "wowjs";
import "./App.css";
import "./assets/css/main.css";
import "./assets/css/responsive.css";
import "./assets/css/materialdesignicons.min.css";
import Quizzes from "./components/layout/Quizzes";
import UpdateMediaCenter from "./components/screens/AdminScreen/UpdateMediaCenter";
import ManageMediaCenterContent from "./components/screens/AdminScreen/ManageMediaCenterContent";
import Compiler from "./components/layout/Compiler";
import Sidebar from "./components/layout/Sidebar";

function App() {
  const { userDetail } = useSelector((state) => state.userLogin);

  new WOW.WOW({
    live: false,
  }).init();

  

  return (
    <div className="App">
     
      <SideBarStateProvider>
        <Switch>
          {/* Private Route for Admin  */}
          <AdminRoute
            exact
            path="/admin-users-list"
            component={UserListScreen}
          />
          <AdminRoute
            exact
            path="/admin-courses-list"
            component={MangeCoures}
          />
          <AdminRoute exact path="/admin-sidebar" component={Sidebar} />

          <AdminRoute
            exact
            path="/admin-media-center-list"
            component={ManageMediaCenters}
          />
          <AdminRoute
            exact
            path="/manage-media-center-content"
            component={ManageMediaCenterContent}
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
            path="/admin-media-center-update/:id"
            component={UpdateMediaCenter}
          ></AdminRoute>

          <AdminRoute
            exact
            path="/update-media-center-day-content/:id"
            component={UpdateMediaCenterDayContent}
          ></AdminRoute>

          <AdminRoute
            exact
            path="/edit-media-center-day/:weekId/:id"
            component={EditMediaCenterDay}
          ></AdminRoute>

          <AdminRoute
            exact
            path="/admin-coure-update/:id"
            component={UpdateCourese}
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

          

          {/* Private Route for Students  */}
          <StudentRoute
            exact
            path="/assignments"
            component={Assignments}
          ></StudentRoute>

          <StudentRoute
            exact
            path="/quizzes"
            component={Quizzes}
          ></StudentRoute>

          <StudentRoute
            exact
            path="/profile"
            component={ProfileScreen}
          ></StudentRoute>

          <StudentRoute
            exact
            path="/edit-profile-student"
            component={EditProfile}
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
            path="/compile"
            component={Compiler}
          ></StudentRoute>
         

          <Route component={AuthRoute} />
        </Switch>
      </SideBarStateProvider>
    </div>
  );
}

export default App;
