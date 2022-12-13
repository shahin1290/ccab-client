import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import download from "downloadjs";
import Message from "../layout/Message";
import { useHistory } from "react-router-dom";
import { Link } from "react-scroll";
import Loader from "../layout/Loader";
import { getMyAnswerList } from "../../redux/actions/answerAction";
import { getCourseList } from "../../redux/actions/courseAction";
import { getMyTaskList } from "../../redux/actions/taskAction";
import { getTaskList } from "../../redux/actions/taskAction";

export default function CourseSideBar({ setSelctedCourse, selectedCourse }) {
  const dispatch = useDispatch();
  const history = useHistory();

  //Get Student's Bootcamps
  const { userDetail } = useSelector((state) => state.userLogin);

  const {
    courseList,
    loading: bootcampLoading,
    error: bootcampError,
  } = useSelector((state) => state.courseList);

  useEffect(() => {
    dispatch(getCourseList());
  }, [dispatch]);

  console.log(selectedCourse);
  // state from isValid reducer
  const isTokenValid = useSelector((state) => state.isTokenValid);
  const {
    error: ValidError,
    loading: ValidLoading,
    success: TokenSuccess,
  } = isTokenValid;

  // updating process
  const userUpdate = useSelector((state) => state.userUpdate);
  const { updateSuccess, error: UpdateError } = userUpdate;

  //Get Student's Bootcamps
  const filterCourseList = () => {
    if (userDetail.user_type === "StudentUser") {
      return courseList.filter(
        (course) =>
          course.price === 0 ||
          course.students.some(
            (student) => student._id === userDetail._id || course.price === 0
          )
      );
    }
  };

  // course click handler
  const ClickHandler = (courseName) => {};

  return (
    <>
      <div className="courses-side-bar-container" data-aos="zoom-in-left">
        <div className="pb-5 mt-5 mb-5 courses-side-bar">
          {filterCourseList().length ? (
            filterCourseList().map((course) => {
              return (
                <Link
                  to="Tasks"
                  spy={true}
                  smooth={true}
                  offset={-150}
                  duration={500}
                  key={course._id}
                >
                  {console.log(selectedCourse == course.name, course.name)}
                  <div
                    className={
                      selectedCourse == course.name
                        ? "course-item course-item activeCourse shadow-pop-tr"
                        : "course-item   nonActiveCourse"
                    }
                    style={{ display: "flex", alignContent: "center" }}
                    onClick={() => {
                      setSelctedCourse(course.name);
                    }}
                  >
                    <div className="inner-box">
                      <div className="image image-box  ">
                        <img
                          className="w-100"
                          src={
                            "http://localhost:5001/uploads/Bootcamp/" +
                            course.img_path
                          }
                          alt=""
                        />
                      </div>
                    </div>

                    <a className="sub-title2 btn  w-100">{course.name}</a>
                  </div>
                </Link>
              );
            })
          ) : (
            <div>
              <h4>there are no courses</h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
