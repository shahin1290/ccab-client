import React, { useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getMyTaskList } from "../../redux/actions/taskAction";
import { getProfile } from "../../redux/actions/userAction";
import Message from "../layout/Message";
import Assignments from "../layout/Assignments";
import Quizzes from "../layout/Quizzes";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import { getMyAnswerList } from "../../redux/actions/answerAction";
import { getMyQuizAnswerList } from "./../../redux/actions/quizAnswerAction";
import { getCourseList } from "../../redux/actions/courseAction";
import { getMyQuizList } from "../../redux/actions/quizAction";
import CountUp from "react-countup";
import Purchases from "../layout/Purchases";
import MainLoader from "./../layout/LandingMainLoader";

export default function ProfileScreen() {
  const dispatch = useDispatch();

  const { userDetail } = useSelector((state) => state.userLogin);
  const { myQuizAnswers } = useSelector((state) => state.quizAnswerMyList);

  const {
    courseList,
    loading: bootcampLoading,
    error: bootcampError,
  } = useSelector((state) => state.courseList);

  //Get Student's Bootcamps

  const filterCourseList = () => {
    if (
      courseList &&
      courseList.length &&
      userDetail.user_type === "StudentUser"
    ) {
      return (
        courseList &&
        courseList.filter(
          (course) =>
            course.price === 0 ||
            course.students.some(
              (student) => student._id === userDetail._id || course.price === 0
            )
        )
      );
    }

    if (
      userDetail.user_type === "MentorUser" ||
      userDetail.user_type === "AdminUser"
    ) {
      return courseList && courseList;
    }
  };

  // updating process
  const userUpdate = useSelector((state) => state.userUpdate);
  const { updateSuccess, error: UpdateError } = userUpdate;

  //get task list
  const taskListMy = useSelector((state) => state.taskListMy);
  const { myTasks, loading: detailLoading, error: loadingError } = taskListMy;

  //get quiz list list
  const {
    myQuizList,
    loading: quizLoading,
    error: quizError,
  } = useSelector((state) => state.myQuizList);

  // getting myAnswerList

  const answerMyList = useSelector((state) => state.answerMyList);
  const {
    myanswers,
    loading: answerListLoading,
    error: answerListError,
    success: answerListSuccess,
  } = answerMyList;

  // state from isValid reducer
  const isTokenValid = useSelector((state) => state.isTokenValid);
  const {
    error: ValidError,
    loading: ValidLoading,
    success: TokenSuccess,
  } = isTokenValid;

  useEffect(() => {
    if (userDetail.name && userDetail.user_type === "StudentUser") {
      dispatch(getMyQuizAnswerList(userDetail.name && userDetail._id));
      dispatch(getMyAnswerList(userDetail.name && userDetail._id));
      dispatch(getMyTaskList());
      dispatch(getMyQuizList());
    }
  }, [dispatch, ValidLoading, updateSuccess, TokenSuccess, answerListSuccess]);

  useEffect(() => {
    dispatch(getCourseList());
    dispatch(getProfile());
  }, [userDetail]);

  // Getting user Details
  const {
    loading: userLoading,
    user,
    error,
  } = useSelector((state) => state.userProfile);
  return (
    <>
      <div
        className="instructor-page-section"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="auto-container">
          {userLoading ? (
            <MainLoader />
          ) : error ? (
            <Message>{error}</Message>
          ) : (
            user.name && (
              <div>
                <div className="upper-content mb-5">
                  <div className="row clearfix">
                    {/* Left Column */}
                    <div className="left-column col-lg-9 col-md-12 col-sm-12">
                      {/* Content */}
                      <div className="content">
                        {/* Author Image */}
                        <div className="author-image">
                          <img
                            src={
                              user.avatar
                                ? `https://ccab-server.up.railway.app/uploads/Avatar/${user.avatar}`
                                : "/images/resource/avatar.svg"
                            }
                            alt="avatar"
                          />
                        </div>
                        <div className="sub-title pt-3 pl-3">
                          {userDetail.name}
                        </div>
                        <div className="designation pl-3">
                          {userDetail.user_type}
                        </div>

                        {/* Fact Counter */}
                        {userDetail &&
                          userDetail.user_type === "StudentUser" && (
                            <div className="fact-counter2">
                              <div className="row clearfix">
                                {/* Column */}
                                <div className="column counter-column col-lg-3 col-md-6 col-sm-12 ">
                                  <div className="inner">
                                    <div className="sub-title">Courses</div>
                                    <div className="sub-title">
                                      <CountUp
                                        start={-2}
                                        end={
                                          courseList &&
                                          courseList.length &&
                                          filterCourseList() &&
                                          filterCourseList().length
                                        }
                                        duration={2.75}
                                        separator=" "
                                        decimal=","
                                        suffix=""
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* Column */}
                                <div className="column counter-column col-lg-3 col-md-6 col-sm-12">
                                  <div className="inner">
                                    <div className="sub-title">Assignments</div>
                                    <div className="sub-title">
                                      <CountUp
                                        start={-2}
                                        end={myTasks.length}
                                        duration={2.75}
                                        separator=" "
                                        decimal=","
                                        suffix=""
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* Column */}
                                <div className="column counter-column col-lg-3 col-md-6 col-sm-12">
                                  <div className="inner">
                                    <div className="sub-title">Quizzes</div>
                                    <div className="sub-title">
                                      <CountUp
                                        start={-2}
                                        end={myQuizList.length}
                                        duration={2.75}
                                        separator=" "
                                        decimal=","
                                        suffix=""
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* Column */}
                                <div className="column counter-column col-lg-3 col-md-6 col-sm-12">
                                  <div className="inner">
                                    <div className="sub-title">Answers</div>
                                    <div className="sub-title">
                                      <CountUp
                                        start={-2}
                                        end={
                                          myanswers.length +
                                          myQuizAnswers.length
                                        }
                                        duration={2.75}
                                        separator=" "
                                        decimal=","
                                        suffix=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                    {/* Right Column */}
                    <div className="right-column col-lg-3 col-md-12 col-sm-12">
                      <div className="buttons-box">
                        <Link
                          to="/edit-profile-student"
                          className="theme-btn btn-style-one"
                        >
                          <span className="txt">
                            <i className="flaticon-edit" />
                            Edit{" "}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lower Content */}
                <div className="lower-content">
                  {/* Instructor Info Tabs*/}
                  <Tabs
                    defaultActiveKey={
                      userDetail.user_type === "InstructorUser"
                        ? "Services"
                        : userDetail.user_type === "AccountantUser"
                        ? "Personal Info"
                        : "Courses"
                    }
                    id="uncontrolled-tab-example"
                    className="bill"
                  >
                    {userDetail &&
                      userDetail.user_type !== "InstructorUser" &&
                      userDetail &&
                      userDetail.user_type !== "AccountantUser" && (
                        <Tab eventKey="Courses" title="Courses">
                          <div className="title pt-5 pb-3">My Courses</div>

                          <div className="single-item-carousel owl-theme">
                            <div className="slide">
                              <div className="row clearfix">
                                {/* Course Block */}
                                {bootcampLoading ? (
                                  <Loader />
                                ) : bootcampError ? (
                                  <Message>{bootcampError}</Message>
                                ) : filterCourseList() &&
                                  filterCourseList().length ? (
                                  filterCourseList().map((course) => {
                                    console.log("course", course);
                                    return (
                                      <div className="shadow-sm p-3 mb-5 bg-white rounded course-block col-lg-3 col-md-4 col-sm-12 mr-4">
                                        <Link
                                          className="inner-box"
                                          to={`/course-content/${course._id}`}
                                        >
                                          <div className="image">
                                            <img
                                              src={
                                                "https://ccab-server.up.railway.app/uploads/Bootcamp/" +
                                                course.img_path
                                              }
                                              alt="bootcamp"
                                            />
                                            <div className="time text-light pl-1 py-1">
                                              {course.weeks * 5 * 2} hours
                                            </div>
                                          </div>
                                          <div className="lower-content">
                                            <div className="my-2 sub-title">
                                              {course.name}
                                            </div>
                                            <div className="sub-text">
                                              <span
                                                className="d-inline-block text-truncate"
                                                style={{ maxWidth: "240px" }}
                                              >
                                                {course.description}
                                              </span>
                                            </div>
                                            <div className="clearfix">
                                              {/*  <div className='pull-left'>
                                                <div className='author'>
                                                  By:{" "}
                                                  <span>
                                                    {course.mentor.name}
                                                  </span>
                                                </div>
                                              </div> */}
                                              <div className="pull-right">
                                                <div className="price">
                                                  ${course.price}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </Link>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <p className="pl-4 py-2 mt-4 text-dark bg-warning ">
                                    You Don't have Any Courses yet !
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </Tab>
                      )}

                    {userDetail && userDetail.user_type === "StudentUser" ? (
                      <Tab eventKey="Assignments" title="Assignments">
                        <Assignments />
                      </Tab>
                    ) : null}
                    {userDetail && userDetail.user_type === "StudentUser" ? (
                      <Tab eventKey="Quizzes" title="Quizzes">
                        <Quizzes />
                      </Tab>
                    ) : null}

                    <Tab eventKey="Personal Info" title="Personal Info">
                      <div className="content mt-4">
                        <div className="card p-5 ">
                          <div className="sub-title mb-3">
                            {" "}
                            <i className="fas fa-user-tie text-danger personalinfoIcon"></i>{" "}
                            <span className="  px-2 py-1 ml-2">
                              {user.name}
                            </span>{" "}
                          </div>
                          <div className="sub-title mb-3">
                            <i className="fas fa-at text-danger personalinfoIcon"></i>{" "}
                            <span className="   px-2 py-1 ml-2">
                              {user.email}
                            </span>
                          </div>
                          <div className="sub-title mb-3">
                            <i className="fas fa-mobile-alt text-danger personalinfoIcon"></i>{" "}
                            <span className="   px-2 py-1 ml-2">
                              {user.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    {userDetail && userDetail.user_type === "StudentUser" ? (
                      <Tab eventKey="Purchases" title="Purchases">
                        <Purchases />
                      </Tab>
                    ) : null}
                  </Tabs>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* End Instructor Page Section */}
    </>
  );
}
