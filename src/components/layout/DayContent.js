import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDayDetails } from "../../redux/actions/dayAction";
import { Card, Tabs, Tab, Accordion } from "react-bootstrap";
import Loader from "./Loader";
import { getMyTaskList, getTaskList } from "../../redux/actions/taskAction";
import { getMyQuizList, getQuizList } from "../../redux/actions/quizAction";
import { getMyQuizAnswerList } from "../../redux/actions/quizAnswerAction";
import { getWeekList } from "../../redux/actions/weekAction";
import { getOrderList } from "../../redux/actions/orderAction";
import { getCourseDetails } from "../../redux/actions/courseAction";

import { TransitionGroup } from "react-transition-group";
import { getMyAnswerList } from "../../redux/actions/answerAction";

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// animation lib
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { previousDay } from "date-fns";

export default function DayContent({ bootcampId, setOpen }) {
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state) => state.userLogin);
  const [show, setShow] = useState("");
  // state for lock layout
  const [lockedMessage, setLockedMessage] = useState(false);

  /****************redux store***************** */
  const {
    course,
    loading: courseLoading,
    error: courseErrror,
  } = useSelector((state) => state.courseDetails);

  //weekList
  const { weekList, loading, error } = useSelector((state) => state.weekList);

  const {
    orderList,
    loading: orderLoading,
    error: orderError,
  } = useSelector((state) => state.orderList);

  //use effect
  useEffect(() => {
    dispatch(getCourseDetails(bootcampId));
    dispatch(getOrderList());
    dispatch(getWeekList(bootcampId));
  }, [dispatch, bootcampId]);

  useEffect(() => {
    AOS.init();
  }, []);

  //get task list for students
  const taskListMy = useSelector((state) => state.taskListMy);
  const { myTasks, loading: myTasksLoading, error: myTasksError } = taskListMy;

  // getting myAnswerList
  const answerMyList = useSelector((state) => state.answerMyList);
  const {
    myanswers,
    loading: taskAnswerListLoading,
    error: taskAnswerListError,
    success: taskAnswerListSuccess,
  } = answerMyList;

  const taskStatus = (taskId) => {
    if (myanswers && myanswers.length > 0) {
      const foundAnswer = myanswers.find((ans) => ans.task._id === taskId);
      return foundAnswer;
    } else return null;
  };

  //get quiz  list for students
  const {
    myQuizList,
    loading: quizLoading,
    error: quizError,
  } = useSelector((state) => state.myQuizList);

  // getting myAnswerList

  const quizAnswerMyList = useSelector((state) => state.quizAnswerMyList);
  const {
    myQuizAnswers,
    loading: answerListLoading,
    error: answerListError,
    success: answerListSuccess,
  } = quizAnswerMyList;

  const quizStatus = (quizId) => {
    if (answerListSuccess && myQuizAnswers.length) {
      const foundAnswer = myQuizAnswers.find((ans) => ans.quiz._id === quizId);
      return foundAnswer;
    }
  };

  //get task list for mentor_route
  const { tasks } = useSelector((state) => state.taskList);
  //get task list for mentor_route
  const { quizzes } = useSelector((state) => state.quizList);

  const days = weekList.length > 0 && weekList.map((week) => week.days);

  /****************function***************** */

  //filter weekly quizzes
  const filterWeeklyQuiz = (dayId) => {
    if (
      userDetail.name &&
      (userDetail.user_type === "AdminUser" ||
        userDetail.user_type === "MentorUser")
    ) {
      return quizzes.length && quizzes.filter((quiz) => quiz.day === dayId);
    }

    if (userDetail.name && userDetail.user_type === "StudentUser") {
      return (
        myQuizList.length && myQuizList.filter((quiz) => quiz.day === dayId)
      );
    }
  };

  //filter weekly tasks
  const filterWeeklyTask = (dayId) => {
    if (
      userDetail.name &&
      (userDetail.user_type === "AdminUser" ||
        userDetail.user_type === "MentorUser")
    ) {
      return tasks.length && tasks.filter((task) => task.day === dayId);
    }

    if (userDetail.name && userDetail.user_type === "StudentUser") {
      return myTasks.length && myTasks.filter((task) => task.day === dayId);
    }
  };

  //show days based on user and subscription
  const daysBasedOnUser = (days) => {
    const foundOrder =
      orderList.length &&
      orderList.find((order) =>
        (order.orderStatus === "Delivered" && order.course === "Silver Plan")(
          order.orderStatus === "Delivered" && order.course === "Golden Plan"
        )(order.orderStatus === "Delivered" && order.course === "Diamond Plan")
      );

    const daysBasedOnShow = days.filter((day) => day.show);

    if (foundOrder && foundOrder.course === "Silver Plan") {
      const size = 20;
      return daysBasedOnShow.slice(0, size);
    } else if (foundOrder && foundOrder.course === "Golden Plan") {
      const size = 40;
      return daysBasedOnShow.slice(0, size);
    } else if (foundOrder && foundOrder.course === "Diamond Plan") {
      return daysBasedOnShow;
    } else if (course.name && course.name.toLowerCase().includes("silver")) {
      const size = 20;
      return daysBasedOnShow.slice(0, size);
    } else if (course.name && course.name.toLowerCase().includes("golden")) {
      const size = 40;
      return daysBasedOnShow.slice(0, size);
    } else if (course.name && course.name.toLowerCase().includes("diamond")) {
      return daysBasedOnShow;
    } else {
      return daysBasedOnShow;
    }
  };

  const chunkArray = () => {
    const merged = days.length && days.flat(1);

    const filteredDays = daysBasedOnUser(merged);

    const chunk_size =
      course.name && course.name.toLowerCase().includes("silver")
        ? 2
        : course.name && course.name.toLowerCase().includes("golden")
        ? 4
        : 5;

    var index = 0;
    var arrayLength = filteredDays.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
      const myChunk =
        filteredDays.length > 0 &&
        filteredDays.slice(index, index + chunk_size);
      // Do something if you want with the group
      tempArray.push(myChunk);
    }

    return tempArray;
  };

  /****************useEffect***************** */
  useEffect(() => {
    if (userDetail.name && userDetail.user_type === "StudentUser") {
      dispatch(getMyTaskList());
      dispatch(getMyQuizList());
      dispatch(getMyQuizAnswerList(userDetail._id));
      dispatch(getMyAnswerList(userDetail._id));
    }

    if (
      userDetail.name &&
      (userDetail.user_type === "AdminUser" ||
        userDetail.user_type === "MentorUser")
    ) {
      dispatch(getTaskList(bootcampId));
      dispatch(getQuizList(bootcampId));
    }
  }, [dispatch, userDetail, bootcampId]);

  return (
    <div
      style={{ height: "80vh", overflowY: "scroll" }}
      className="accordion-box style-two"
    >
      {loading ? (
        <Loader />
      ) : (
        weekList.length &&
        days.map((week, index) => (
          <div key={week._id} className="accordion block">
            <div
              as={Card.Header}
              eventKey={`${index}`}
              className="acc-btn  bg-warning text-dark"
            >
              Week {index + 1}
            </div>
            <div eventKey={`${index}`}>
              {week.map((day, index) => (
                <div key={day._id} className="course-content">
                  <div className=" d-flex p-2 mt-2 mb-2">
                    <div
                      onClick={() => {
                        setShow(day._id);
                        dispatch(getDayDetails(day.week, day._id));
                        setOpen && setOpen(false);
                      }}
                    >
                      <Link
                        to={`/course-content/${bootcampId}`}
                        // style={{
                        //   backgroundColor: show === day._id ? "#ffbfbe" : "",
                        // }}
                        className="sub-text text-left"
                        id={day._id}
                      >
                        {day.name}
                      </Link>
                    </div>
                  </div>

                  {filterWeeklyQuiz(day._id).length > 0 &&
                    filterWeeklyQuiz(day._id).map((quiz) => (
                      <div key={quiz._id} className=" d-flex m-2">
                        <div
                          className="pr-4 text-warning "
                          style={{ fontSize: "25px" }}
                        >
                          {quizStatus(quiz._id) &&
                          quizStatus(quiz._id).status === "Not Sent" ? (
                            <i className="far fa-circle"></i>
                          ) : (
                            <i className="fas fa-check-circle"></i>
                          )}
                        </div>
                        <div key={quiz._id}>
                          <img
                            alt=""
                            width="30"
                            src="/images/resource/quiz.png"
                          />

                          {userDetail.user_type === "StudentUser" && (
                            <Link
                              to={
                                quizStatus(quiz._id) &&
                                quizStatus(quiz._id).status === "Not Sent"
                                  ? `/quiz/${quiz.bootcamp._id}/${quiz.day}/${quiz._id}`
                                  : `/quiz-answer/${quiz.bootcamp._id}/${quiz.day}/${quiz._id}`
                              }
                              className="sub-text  ml-2"
                            >
                              Quiz: {quiz.name}
                            </Link>
                          )}

                          {userDetail.user_type !== "StudentUser" && (
                            <Link
                              to={`/mentor-show-quiz/${quiz.bootcamp}/${quiz.day}/${quiz._id}`}
                              className="sub-text  ml-2"
                            >
                              Quiz: {quiz.name}
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}

                  {filterWeeklyTask(day._id).length > 0 &&
                    filterWeeklyTask(day._id).map((task) => (
                      <div key={task._id} className=" d-flex m-2">
                        <div
                          className="pr-4 text-warning "
                          style={{ fontSize: "25px" }}
                        >
                          {taskStatus(task._id) &&
                          taskStatus(task._id).status === "Not Sent" ? (
                            <i className="far fa-circle"></i>
                          ) : (
                            <i className="fas fa-check-circle"></i>
                          )}
                        </div>
                        <div key={task._id}>
                          <img
                            alt=""
                            width="30"
                            src="/images/resource/assignment.png"
                          />

                          <Link
                            to={
                              userDetail.user_type === "StudentUser"
                                ? `/assignment-details/${task.bootcamp._id}/${task._id}`
                                : `/task-details/${task.bootcamp}/${task._id}`
                            }
                            className="sub-text  ml-2"
                          >
                            Task: {task.projectName}
                          </Link>
                        </div>
                      </div>
                    ))}
                  <hr />
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// If you don't have a version of React that supports
// hooks, you can use a class-based version of this
// component in ProgressProviderUsingClass.js
const ProgressProvider = ({ valueStart, valueEnd, children }) => {
  const [value, setValue] = React.useState(valueStart);
  React.useEffect(() => {
    setValue(valueEnd);
  }, [valueEnd]);

  return children(value);
};
