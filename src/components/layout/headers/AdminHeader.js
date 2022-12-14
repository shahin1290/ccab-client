import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Nav, Navbar, Dropdown, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout, isValid } from "../../../redux/actions/userAction";
import AdminHeaderContnet from "./AdminHeaderContnet";
import { getProfile } from "../../../redux/actions/userAction";
import { getCourseList } from "../../../redux/actions/courseAction";

export default function AdminHeader() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userDetail } = userLogin;

  // Getting user Details
  const { loading, user, error } = useSelector((state) => state.userProfile);

  // state from isValid reducer
  const isTokenValid = useSelector((state) => state.isTokenValid);
  const { error: ValidError, loading: ValidLoading, success } = isTokenValid;

  const dispatch = useDispatch();
  const history = useHistory();

  const { courseList } = useSelector((state) => state.courseList);

  const categoryArray = [...new Set(courseList.map((item) => item.category))];

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getCourseList());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark">
        <div className="container">
          <Navbar.Brand>Admin DashBoard</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="text-danger">
            <Nav>
              <Nav.Link className="text-dark  mr-3" href="/">
                Home
              </Nav.Link>

              <AdminHeaderContnet logoutHandler={logoutHandler} />

              {!userDetail.token ? (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/get-start">Register</Nav.Link>
                </>
              ) : (
                user.name && (
                  <div
                    className="collapse navbar-collapse"
                    style={{ marginLeft: "350px" }}
                  >
                    <ul className="navbar-nav ">
                      <li className="nav-item dropdown dropdown-slide dropdown-hover ">
                        <a href="/">
                          <div className="logo-image">
                            <img
                              src={
                                user.avatar
                                  ? `https://ccab-server.up.railway.app/uploads/Avatar/${user.avatar}`
                                  : "/images/resource/avatar.svg"
                              }
                              alt="avatar"
                            />
                          </div>
                        </a>
                        <div
                          className="dropdown-menu  mt-3"
                          aria-labelledby="navbarDropdownMenuLink"
                          style={{ top: "37px" }}
                        >
                          <a className="dropdown-item" href="/profile">
                            My Profile
                          </a>
                          <div className="dropdown-divider"></div>

                          <a className="dropdown-item" onClick={logoutHandler}>
                            Logout
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                )
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
}
