import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Rodal from "rodal";
// include styles
import "rodal/lib/rodal.css";
import {
  Container,
  Table,
  Row,
  Col,
  Modal,
  Button,
  From,
  Form,
} from "react-bootstrap";
import Message from "../../layout/Message";
import {
  getUsers,
  deleteUser,
  UpdateUserRole,
} from "../../../redux/actions/userAction";
import { useHistory, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../layout/Loader";
import { getDate } from "../../../util/getDate";
import PerformanceChart from "../../layout/PerformanceChart";

export default function UserlistScreen() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [showPerformanceModal, setShowPerformanceModal] = useState("");
  const [studentId, setStudentId] = useState("");

  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetail } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { deleteSuccess } = userDelete;

  const userUpdateRole = useSelector((state) => state.userUpdateRole);
  const { error: updateUserRoleErr } = userUpdateRole;

  //get all courses
  const {
    courseList,
    loading: bootcampLoading,
    error: bootcampError,
  } = useSelector((state) => state.courseList);

  //Filter Student's courses
  const filterCourseList = () => {
    return courseList.filter(
      (course) =>
        course.price === 0 ||
        course.students.some(
          (student) => student._id === studentId || course.price === 0
        )
    );
  };

  useEffect(() => {
    if (userDetail.user_type === "AdminUser") {
      dispatch(getUsers());
    } else {
      history.push("/");
    }
  }, [dispatch, userDetail, getUsers, history, deleteSuccess]);

  // modal

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (userDetail.user_type == "AdminUser") {
      dispatch(getUsers());
    } else {
      history.push("/");
    }
  }, [show]);

  const [userClickDelete, setUserClickDelete] = useState("");

  const [updatedUser, setupdatedUser] = useState({});
  const [showEditUser, setShowEditUser] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEditUser = () => setShowEditUser(false);
  const handleShowEditUser = () => setShowEditUser(true);
  const _handleUpdateUserROle = () => {
    //console.log(updatedUser);
    let role = { role: updatedUser.user_type };
    dispatch(UpdateUserRole(role, updatedUser._id));
    toast.info(updatedUser.name + " successfuly Updated", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    dispatch(getUsers());
    if (!updateUserRoleErr) {
      dispatch({ type: "USER_UPDATE_REST" });
      dispatch(getUsers());
      setShowEditUser(false);
    }
  };

  //filter
  const [filterUser, setFilterUser] = useState("all");

  const searchBy = (user) => {
    return (
      user.name.toLowerCase().indexOf(searchTerm) > -1 ||
      user.email.toLowerCase().indexOf(searchTerm) > -1 ||
      (user.phoneNumber &&
        user.phoneNumber.toLowerCase().indexOf(searchTerm) > -1) ||
      (user.gender && user.gender.toLowerCase().indexOf(searchTerm) > -1) ||
      (user.language && user.language.toLowerCase().indexOf(searchTerm) > -1) ||
      user.createdAt.toLowerCase().indexOf(searchTerm) > -1
    );
  };

  const getFilteredUser = () => {
    if (filterUser === "all") {
      return users.length && users.filter((user) => searchBy(user));
    }
    return (
      users.length &&
      users.filter((user) => user.user_type === filterUser && searchBy(user))
    );
  };

  const getFilteredUserLength = (userType) => {
    if (userType === "all") {
      return users.length && users.filter((user) => searchBy(user)).length;
    }
    return (
      users.length &&
      users.filter((user) => user.user_type === userType && searchBy(user))
        .length
    );
  };

  return (
    <>
      <div className='container-fulid p-5 ' style={{ padding: "60px 0" }}>
        <div className='title pb-3'>Users</div>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <div>
            <div className='d-flex justify-content-between mb-3'>
              <div className='d-flex mb-2 mt-2'>
                <a
                  className='mr-2'
                  onClick={() => setFilterUser("all")}
                  style={
                    filterUser === "all"
                      ? { color: "#ea5573", fontWeight: "bold" }
                      : {}
                  }
                >
                  {` All(${getFilteredUserLength("all")})`}
                </a>
                <span className='mr-2'>| </span>
                <a
                  className='mr-2'
                  onClick={() => setFilterUser("StudentUser")}
                  style={
                    filterUser === "StudentUser"
                      ? { color: "#ea5573", fontWeight: "bold" }
                      : {}
                  }
                >
                  {` Students(${getFilteredUserLength("StudentUser")})`}
                </a>
                <span className='mr-2'>| </span>
                <a
                  className='mr-2'
                  onClick={() => setFilterUser("InstructorUser")}
                  style={
                    filterUser === "InstructorUser"
                      ? { color: "#ea5573", fontWeight: "bold" }
                      : {}
                  }
                >
                  {" "}
                  {` Instructors(${getFilteredUserLength("InstructorUser")})`}
                </a>
                <span className='mr-2'>|</span>
                <a
                  className='mr-2'
                  onClick={() => setFilterUser("MentorUser")}
                  style={
                    filterUser === "MentorUser"
                      ? { color: "#ea5573", fontWeight: "bold" }
                      : {}
                  }
                >
                  {" "}
                  {` Mentors(${getFilteredUserLength("MentorUser")})`}
                </a>{" "}
                <span className='mr-2'>|</span>
                <a
                  className='mr-2'
                  onClick={() => setFilterUser("AdminUser")}
                  style={
                    filterUser === "AdminUser"
                      ? { color: "#ea5573", fontWeight: "bold" }
                      : {}
                  }
                >
                  {` Admins(${getFilteredUserLength("AdminUser")})`}
                </a>
                <span className='mr-2'>|</span>
                <a
                  onClick={() => setFilterUser("AccountantUser")}
                  style={
                    filterUser === "AccountantUser"
                      ? { color: "#ea5573", fontWeight: "bold" }
                      : {}
                  }
                >
                  {` Accountants(${getFilteredUserLength("AccountantUser")})`}
                </a>
              </div>

              <div className='container'>
                <div className='input-group border border-secondary'>
                  <div className='input-group-prepend'>
                    <div className='input-group-text'>
                      <i className='fas fa-search'></i>
                    </div>
                  </div>
                  <input
                    type='text'
                    placeholder='search by name - email - phone - gender - language - date'
                    className='form-control '
                    name='search'
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <Table striped bordered hover responsive='sm'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Online</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>language</th>
                  <th>Role</th>
                  <th>Registered At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredUser() && getFilteredUser().length > 0
                  ? getFilteredUser().map((user) => (
                      <tr key={user._id}>
                        <td>{getFilteredUser().indexOf(user) + 1}</td>
                        <td>
                          <i
                            className='fas fa-user'
                            style={
                              user.status === "online"
                                ? { color: "rgb(46, 146, 119)" }
                                : {}
                            }
                          ></i>
                        </td>
                        <td>
                          {user.user_type === "StudentUser" ? (
                            <a
                              onClick={() => {
                                setStudentId(user._id);
                                setShowPerformanceModal({ visible: true });
                              }}
                              className='text-info'
                            >
                              {user.name}
                              <span className='ml-2'>
                                <i class='fas fa-chart-bar'></i>{" "}
                              </span>
                            </a>
                          ) : (
                            <div>{user.name}</div>
                          )}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.gender}</td>
                        <td>{user.language || "not Selected"}</td>
                        <td>{user.user_type}</td>
                        <td>
                          {user.createdAt ? getDate(user.createdAt) : "-"}
                        </td>
                        <td>
                          <Container>
                            <Row>
                              <Col style={{ padding: "0px" }}>
                                <a>
                                  <i
                                    className='fas fa-trash-restore text-danger'
                                    onClick={() => {
                                      setUserClickDelete(user);
                                      handleShow();
                                    }}
                                  ></i>
                                </a>

                                <Modal show={show} onHide={handleClose}>
                                  <Modal.Header closeButton>
                                    <Modal.Title>Deleting User</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body style={{ color: "red" }}>
                                    Are you sure to delete{" "}
                                    {userClickDelete.name} ?
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button
                                      variant='secondary'
                                      onClick={() => {
                                        handleClose();
                                      }}
                                    >
                                      Close
                                    </Button>
                                    <Button
                                      variant='danger'
                                      onClick={() => {
                                        dispatch(
                                          deleteUser(userClickDelete._id)
                                        );
                                        toast.info(
                                          userClickDelete.name +
                                            " successfuly removed",
                                          {
                                            position:
                                              toast.POSITION.BOTTOM_RIGHT,
                                          }
                                        );

                                        setShow(false);
                                      }}
                                    >
                                      Ok
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </Col>

                              <Col style={{ padding: "0px" }}>
                                <a>
                                  <i
                                    className='fas fa-user-edit text-danger'
                                    onClick={() => {
                                      setupdatedUser(user);
                                      handleShowEditUser();
                                    }}
                                  ></i>
                                </a>

                                <Modal
                                  show={showEditUser}
                                  onHide={handleCloseEditUser}
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title>Update User Role</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    {updateUserRoleErr && (
                                      <p className='text-danger p-2'>
                                        {updateUserRoleErr}
                                      </p>
                                    )}
                                    Choose the new role for:{" "}
                                    <i>{updatedUser.name}</i> ?
                                    <div className='form-check'>
                                      <input
                                        className='form-check-input'
                                        type='radio'
                                        value='StudentUser'
                                        name='userRole'
                                        id='StudentUser'
                                        defaultChecked
                                        onChange={(e) => {
                                          setupdatedUser({
                                            ...updatedUser,
                                            user_type: e.target.value,
                                          });
                                        }}
                                      />
                                      <label
                                        className='form-check-label'
                                        for='StudentUser'
                                      >
                                        Student
                                      </label>
                                    </div>
                                    <div className='form-check'>
                                      <input
                                        className='form-check-input'
                                        type='radio'
                                        value='MentorUser'
                                        name='userRole'
                                        id='MentorUser'
                                        onChange={(e) => {
                                          setupdatedUser({
                                            ...updatedUser,
                                            user_type: e.target.value,
                                          });
                                        }}
                                      />
                                      <label
                                        className='form-check-label'
                                        htmlFor='MentorUser'
                                      >
                                        Mentor
                                      </label>
                                    </div>
                                    <div className='form-check'>
                                      <input
                                        className='form-check-input'
                                        type='radio'
                                        value='InstructorUser'
                                        name='userRole'
                                        id='InstructorUser'
                                        onChange={(e) => {
                                          setupdatedUser({
                                            ...updatedUser,
                                            user_type: e.target.value,
                                          });
                                        }}
                                      />
                                      <label
                                        className='form-check-label'
                                        htmlFor='InstructorUser'
                                      >
                                        Instructor
                                      </label>
                                    </div>
                                    <div className='form-check'>
                                      <input
                                        className='form-check-input'
                                        type='radio'
                                        value='AccountantUser'
                                        name='userRole'
                                        id='AccountantUser'
                                        onChange={(e) => {
                                          setupdatedUser({
                                            ...updatedUser,
                                            user_type: e.target.value,
                                          });
                                        }}
                                      />
                                      <label
                                        className='form-check-label'
                                        htmlFor='AccountantUser'
                                      >
                                        Accountant
                                      </label>
                                    </div>
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button
                                      variant='secondary'
                                      onClick={() => {
                                        handleCloseEditUser();
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      variant='success'
                                      onClick={_handleUpdateUserROle}
                                    >
                                      Save Changes
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </Col>
                            </Row>
                          </Container>
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </Table>
          </div>
        )}
        {<ToastContainer />}

        {studentId && (
          <div className='py-2 sub-title mb-5'>
            <Rodal
              animation='zoom'
              visible={showPerformanceModal.visible}
              onClose={() => setShowPerformanceModal({ visible: false })}
              width={900}
            >
              <PerformanceChart
                courses={
                  filterCourseList(studentId).length > 0 &&
                  filterCourseList(studentId)
                }
                student={studentId}
              />
            </Rodal>
          </div>
        )}
      </div>
    </>
  );
}
