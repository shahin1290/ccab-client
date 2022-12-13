import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import download from "downloadjs";
import Message from "../layout/Message";
import { Link, useHistory } from "react-router-dom";
import Loader from "../layout/Loader";
import { getMyAnswerList } from "../../redux/actions/answerAction";
import { getCourseList } from "../../redux/actions/courseAction";
import { getMyTaskList } from "../../redux/actions/taskAction";
import { getTaskList } from "../../redux/actions/taskAction";

// import Coruses side Bar
import CourseSideBar from "./CoursesSideBar";

export default function Assignments() {
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

  //get task list
  const taskListMy = useSelector((state) => state.taskListMy);
  const { myTasks, loading: myTasksLoading, error: myTasksError } = taskListMy;

  // getting myAnswerList

  const answerMyList = useSelector((state) => state.answerMyList);
  const {
    myanswers,
    loading: answerListLoading,
    error: answerListError,
    success: answerListSuccess,
  } = answerMyList;

  const taskStatus = (taskId) => {
    if (myanswers && myanswers.length > 0) {
      const foundAnswer = myanswers.find((ans) => ans.task._id === taskId);
      return foundAnswer;
    } else return null;
  };

  useEffect(() => {
    if (userDetail.name && userDetail.user_type === "StudentUser") {
      dispatch(getMyTaskList());
      dispatch(getMyAnswerList(userDetail._id));
    }

    if (
      userDetail.name &&
      (userDetail.user_type === "MentorUser" ||
        userDetail.user_type === "AdminUser")
    ) {
      dispatch(getTaskList());
    }
  }, [
    dispatch,
    userDetail,
    ValidLoading,
    updateSuccess,
    TokenSuccess,
    answerListSuccess,
  ]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userDetail.token,
    },
  };

  const DownloadAssignmentHandler = async (task) => {
    // dispatch(DownloadAssignemnt(task.task._id))
    const res = await fetch(
      "https://ccab-api.onrender.com/api/tasks/" + task._id + "/download",
      config
    );
    const blob = await res.blob();
    download(blob, task.projectName + "-Assignment");
  };

  const [selectedCourse, setSelctedCourse] = useState(
    courseList[0] && courseList[0].name
  );

  //Filter Assinment by courses
  const filterAssignemnts = () => {
    if (userDetail.user_type === "StudentUser") {
      return myTasks.filter((task) => task.bootcamp.name === selectedCourse);
    }
  };

  //  console.log(filterAssignemnts());

  const getDate = (date) => {
    let d = new Date(date);
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  };

  return (
    <>
      <div className="pb-5 mt-5 mb-5">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="title mb-4">
            <div className="clearfix">
              <div className="pull-left">
                <div>My Assignments</div>
              </div>
            </div>
          </div>

          <div className="row">
            <CourseSideBar
              selectedCourse={selectedCourse}
              setSelctedCourse={setSelctedCourse}
            />
          </div>

          <div className="inner-container">
            <div className="table-responsive">
              {filterAssignemnts().length ? (
                <table
                  className="table text-center"
                  style={{ overflow: "hidden" }}
                  id="Tasks"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Assignment Name</th>
                      <th>Bootcamp</th>
                      <th>Assignment</th>
                      <th>Created At</th>
                      {userDetail.user_type !== "MentorUser" &&
                        userDetail.user_type !== "AdminUser" && (
                          <>
                            <th>Status</th>
                            <th>Submit</th>
                          </>
                        )}
                    </tr>
                  </thead>
                  <tbody>
                    {myTasksLoading ? (
                      <Loader />
                    ) : myTasksError ? (
                      <Message variant="danger">{myTasksError}</Message>
                    ) : (
                      filterAssignemnts()
                        .map((task, index) => (
                          <tr data-aos="zoom-in-up" key={task._id}>
                            <td>{index + 1}</td>
                            <td>{task.projectName}</td>
                            {/* status */}
                            {/* date */}
                            {/* <td>{task.description}</td> */}
                            <td>{task.bootcamp.name}</td>
                            <td>
                              <Link
                                onClick={() => DownloadAssignmentHandler(task)}
                              >
                                <i className="fas fa-file-download"></i>{" "}
                                DOWNLOAD
                              </Link>
                            </td>

                            <td>{getDate(task.createdAt)}</td>

                            {userDetail.user_type !== "MentorUser" &&
                              userDetail.user_type !== "AdminUser" && (
                                <>
                                  {answerListLoading ? (
                                    <Loader />
                                  ) : answerListError ? (
                                    <Message variant="danger">
                                      {answerListError}
                                    </Message>
                                  ) : (
                                    <>
                                      {!taskStatus(task._id) ? (
                                        <td>NA</td>
                                      ) : taskStatus(task._id) &&
                                        taskStatus(task._id).status ===
                                          "Not Sent" ? (
                                        <td style={{ color: "red" }}>
                                          {taskStatus(task._id).status}
                                        </td>
                                      ) : taskStatus(task._id) &&
                                        taskStatus(task._id).status ===
                                          "Pending" ? (
                                        <td
                                          style={{
                                            color: "#ffc40c",
                                          }}
                                        >
                                          {taskStatus(task._id) &&
                                            taskStatus(task._id).status}
                                        </td>
                                      ) : taskStatus(task._id) &&
                                        taskStatus(task._id).status ===
                                          "Failed" ? (
                                        <td
                                          style={{
                                            color: "red",
                                          }}
                                        >
                                          {taskStatus(task._id) &&
                                            taskStatus(task._id).status}
                                        </td>
                                      ) : taskStatus(task._id) &&
                                        taskStatus(task._id).status ===
                                          "Sent" ? (
                                        <td style={{ color: "#171717" }}>
                                          {taskStatus(task._id).status}
                                        </td>
                                      ) : (
                                        <td
                                          style={{
                                            color: "#1aff1a",
                                          }}
                                        >
                                          {taskStatus(task._id) &&
                                            taskStatus(task._id).status}
                                        </td>
                                      )}
                                    </>
                                  )}

                                  <td>
                                    {taskStatus(task._id) &&
                                    taskStatus(task._id).status !==
                                      "Not Sent" ? (
                                      "Submitted"
                                    ) : !taskStatus(task._id) ? (
                                      "NA"
                                    ) : (
                                      <Link
                                        to={`/assignment-details/${task.bootcamp._id}/${task._id}`}
                                        className=" text-info"
                                      >
                                        Submit Assignment
                                      </Link>
                                    )}
                                  </td>
                                </>
                              )}
                          </tr>
                        ))
                        .reverse()
                    )}
                  </tbody>
                </table>
              ) : (
                <div className="notFound">
                  <h4 className="text-center">You Don't have any task </h4>
                  <div></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
