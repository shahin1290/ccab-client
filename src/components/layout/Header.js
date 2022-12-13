import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getCourseList } from "../../redux/actions/courseAction";

// include styles
import "rodal/lib/rodal.css";
import { Nav, Dropdown, NavDropdown, Navbar } from "react-bootstrap";
// imgaes
import Logo from "./../../assets/images/whiteLogo.png";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userAction";

import AdminHeader from "./../layout/headers/AdminHeaderContnet";
import StudentHeaderContent from "./../layout/headers/StudentHeaderContent";
import InstructorHeaderContent from "./../layout/headers/InstructorHeaderContent";
import AccountantHeaderContent from "./../layout/headers/AccountantHeaderContent";

import { getProfile } from "../../redux/actions/userAction";

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

export default function Header() {
  const { userDetail } = useSelector((state) => state.userLogin);

  // Getting user Details
  const { loading, user, error } = useSelector((state) => state.userProfile);

  const { courseList } = useSelector((state) => state.courseList);

  /*******************Functions *************/
  const categoryArray = [...new Set(courseList.map((item) => item.category))];

 

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (userDetail.name) {
      dispatch(getProfile());
    }
    dispatch(getCourseList());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="p-2 "
        style={{
          zIndex: "1030",
          backgroundColor: "#fff",
        }}
      >
        <div className="container">
          <Navbar.Brand href="/">
            <img
              data-aos="fade-down"
              data-aos-delay="400"
              className="ml-5"
              src={Logo}
              title="Bootcamp"
              width="40px"
            />
            <span data-aos="fade-left" className="ml-2 text-dark ">
              CF College{" "}
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link className="text-dark hide-on-small-screen" href="/">
                Home
              </Nav.Link>

              {/* <Nav.Link className='text-dark' href='/services'>
              Services
            </Nav.Link> */}
              {/* Items  hide-on-big-screen */}
              {/*  <div className='text-dark hide-on-big-screen pt-4'>
              Courses
              <Dropdown.Menu show className='border-0'>
                <NavDropdown.Item href='/course-grid'>
                  All Courses
                </NavDropdown.Item>
                {categoryArray.length &&
                  categoryArray.map((category) => (
                    <NavDropdown.Item
                      key={category}
                      href={`/course-grid/${category}`}
                    >
                      {category}
                    </NavDropdown.Item>
                  ))}
              </Dropdown.Menu>
            </div> */}
              {/* <div className="text-dark hide-on-big-screen pt-4">
              Services
              <Dropdown.Menu show className="border-0">
                <NavDropdown.Item href="/course-grid">
                  All Services
                </NavDropdown.Item>
                {serviceCategoryArray.length &&
                  serviceCategoryArray.map((category) => (
                    <NavDropdown.Item
                      key={category}
                      href={`/service-grid/${category}`}
                    >
                      {category}
                    </NavDropdown.Item>
                  ))}
              </Dropdown.Menu>
            </div> */}
              <div className="collapse navbar-collapse mr-3">
                <ul className="navbar-nav ">
                  {/*  <li className='nav-item dropdown dropdown-slide dropdown-hover '>
                  <Link
                    to='pricing'
                    spy={true}
                    smooth={true}
                    className='text-dark pb-5 pt-5'
                  >
                    Courses
                  </Link>
                  <div
                    className='dropdown-menu  mt-4 ml-5'
                    aria-labelledby='navbarDropdownMenuLink'
                  >
                    <a className='dropdown-item' href='/course-grid'>
                      All Courses
                    </a>
                    <div className='dropdown-divider'></div>
                    {categoryArray.length &&
                      categoryArray.map((category) => (
                        <div key={category}>
                          <a
                            className='dropdown-item'
                            href={`/course-grid/${category}`}
                          >
                            {category}
                          </a>
                          <div className='dropdown-divider'></div>
                        </div>
                      ))}
                  </div>
                </li> */}
                </ul>
              </div>
              {/* <div className="collapse navbar-collapse mr-3">
              <ul className="navbar-nav ">
                <li className="nav-item dropdown dropdown-slide dropdown-hover ">
                  <a href="#" className="text-dark pb-5 pt-5">
                    Services
                  </a>
                  <div
                    className="dropdown-menu  mt-4 ml-5"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <a className="dropdown-item" href="/service-grid">
                      All Services
                    </a>
                    <div className="dropdown-divider"></div>
                    {serviceCategoryArray.length &&
                      serviceCategoryArray.map((category) => (
                        <div key={category}>
                          <a
                            className="dropdown-item"
                            href={`/service-grid/${category}`}
                          >
                            {category}
                          </a>
                          <div className="dropdown-divider"></div>
                        </div>
                      ))}
                  </div>
                </li>
              </ul>
            </div> */}

              <Nav.Link className="text-dark" href="/jobs">
                Jobs
              </Nav.Link>
            </Nav>
            {userDetail.user_type === "MentorUser" ? (
              <>
                <div className="collapse navbar-collapse mr-3">
                  <ul className="navbar-nav ">
                    <li className="nav-item dropdown dropdown-slide dropdown-hover ">
                      <a href="#" className="text-dark pb-5 pt-5">
                        Manage
                      </a>
                      <div
                        className="dropdown-menu  mt-4 ml-5"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
                        <a
                          className="dropdown-item"
                          href="/mentor-courses-list"
                        >
                          Mange Courses
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/mentor-users-list">
                          Users
                        </a>
                        <div className="dropdown-divider"></div>
                      </div>
                    </li>
                  </ul>
                </div>

                <Nav className="text-dark hide-on-big-screen pt-4 ">
                  Manage
                  <Dropdown.Menu show className="border-0">
                    <NavDropdown.Item href="/mentor-courses-list">
                      Mange Courses
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/mentor-users-list">
                      Users
                    </NavDropdown.Item>
                  </Dropdown.Menu>
                  <Nav.Link
                    href="/profile"
                    className="text-dark hide-on-big-screen"
                    style={{ top: "37px" }}
                  >
                    My Profile
                  </Nav.Link>
                  <Nav.Link
                    onClick={logoutHandler}
                    className="text-dark hide-on-big-screen"
                  >
                    Logout
                  </Nav.Link>
                </Nav>
              </>
            ) : userDetail.user_type === "StudentUser" ? (
              <StudentHeaderContent logoutHandler={logoutHandler} />
            ) : userDetail.user_type === "AdminUser" ? (
              <AdminHeader logoutHandler={logoutHandler} />
            ) : userDetail.user_type === "InstructorUser" ? (
              <InstructorHeaderContent logoutHandler={logoutHandler} />
            ) : (
              userDetail.user_type === "AccountantUser" && (
                <AccountantHeaderContent logoutHandler={logoutHandler} />
              )
            )}

            <Nav>
              {!userDetail.token ? (
                <>
                  <Nav.Link className="text-dark" href="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link className="text-dark" href="/get-start">
                    Register
                  </Nav.Link>
                </>
              ) : (
                user.name && (
                  <div className="collapse navbar-collapse mr-3">
                    <ul className="navbar-nav">
                      <li className="nav-item dropdown dropdown-slide dropdown-hover">
                        <a>
                          <div className="logo-image pb-1">
                            <img
                              src={
                                user.avatar
                                  ? `http://localhost:5001/uploads/Avatar/${user.avatar}`
                                  : "/images/resource/avatar.svg"
                              }
                              alt="avatar"
                            />
                          </div>
                        </a>
                        <div
                          className="dropdown-menu  mt-3 p-0"
                          aria-labelledby="navbarDropdownMenuLink"
                          style={{ top: "37px" }}
                        >
                          <a className="dropdown-item py-3" href="/profile">
                            My Profile
                          </a>
                          <div className="dropdown-divider m-0"></div>

                          <a
                            className="dropdown-item py-3"
                            onClick={logoutHandler}
                          >
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
