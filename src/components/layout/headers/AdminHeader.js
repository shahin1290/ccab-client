import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Nav, Navbar, Dropdown, NavDropdown } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { logout, isValid } from '../../../redux/actions/userAction'
import AdminHeaderContnet from './AdminHeaderContnet'
import { getProfile } from '../../../redux/actions/userAction'
import { getCourseList } from '../../../redux/actions/courseAction'

export default function AdminHeader() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin

  // Getting user Details
  const { loading, user, error } = useSelector((state) => state.userProfile)

  // state from isValid reducer
  const isTokenValid = useSelector((state) => state.isTokenValid)
  const { error: ValidError, loading: ValidLoading, success } = isTokenValid

  const dispatch = useDispatch()
  const history = useHistory()

  const { courseList } = useSelector((state) => state.courseList)

  const categoryArray = [...new Set(courseList.map((item) => item.category))]

  useEffect(() => {
    dispatch(getProfile())
    dispatch(getCourseList())
  }, [dispatch])

  const logoutHandler = () => {
    dispatch(logout())
    history.push('/')
  }

  return (
    <>
      {user.avatar && (
        <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark">
          <div className="container">
            <Navbar.Brand>Admin DashBoard</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="text-danger">
              <Nav>
                <Nav.Link className="text-dark  mr-3" href="/">
                  Home
                </Nav.Link>
                {/* Items  hide-on-big-screen */}
                <div className="text-dark hide-on-big-screen pt-4 ">
                  Courses
                  <Dropdown.Menu show className="border-0">
                    <NavDropdown.Item href="/course-grid" show>
                      All Courses
                    </NavDropdown.Item>
                    {categoryArray.length &&
                      categoryArray.map((category) => (
                        <NavDropdown.Item
                          href={`/course-grid/${category}`}
                          show
                        >
                          {category}
                        </NavDropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </div>
                <div className="collapse navbar-collapse mr-3">
                  <ul className="navbar-nav ">
                    <li className="nav-item dropdown dropdown-slide dropdown-hover ">
                      <a href="#" className="text-dark">
                        Courses
                      </a>
                      <div
                        className="dropdown-menu  mt-4 ml-5"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
                        <a className="dropdown-item" href="/course-grid">
                          All Courses
                        </a>
                        <div className="dropdown-divider"></div>
                        {categoryArray.length &&
                          categoryArray.map((category) => (
                            <>
                              <a
                                className="dropdown-item"
                                href={`/course-grid/${category}`}
                              >
                                {category}
                              </a>
                              <div className="dropdown-divider"></div>
                            </>
                          ))}
                      </div>
                    </li>
                  </ul>
                </div>
                <AdminHeaderContnet></AdminHeaderContnet>

                {!userDetail.token ? (
                  <>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/get-start">Register</Nav.Link>
                  </>
                ) : (
                  <div
                    className="collapse navbar-collapse"
                    style={{ marginLeft: '350px' }}
                  >
                    <ul className="navbar-nav ">
                      <li className="nav-item dropdown dropdown-slide dropdown-hover ">
                        <a href="/">
                          <div className="logo-image">
                            <img
                              src={
                                user.avatar
                                  ? `http://localhost:5001/uploads/Avatar/${user.avatar}`
                                  : '/images/resource/avatar.svg'
                              }
                              alt="avatar"
                            />
                          </div>
                        </a>
                        <div
                          className="dropdown-menu  mt-3"
                          aria-labelledby="navbarDropdownMenuLink"
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
                )}
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
      )}
    </>
  )
}
