import {
  Nav,
  Navbar,
  NavDropdown,
  Dropdown,
  Badge,
  Image,
  Button
} from 'react-bootstrap'
import React from 'react'

export default function StudentHeaderContnet({ logoutHandler }) {
  return (
    <>
      {/* Item  hide-on-small-screen */}

      <div className="collapse navbar-collapse pr-3">
        <ul className="navbar-nav ">
          <li className="nav-item dropdown dropdown-slide dropdown-hover ">
            <a href="#" className="text-dark pb-5 pt-5">
              Tests
            </a>
            <div
              className="dropdown-menu  mt-4 ml-5"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a className="dropdown-item" href="/quizzes">
                Quiz
              </a>
              <div className="dropdown-divider"></div>

              <a className="dropdown-item" href="/assignments">
                Assignment
              </a>
            </div>
          </li>

          <li className="nav-item dropdown dropdown-slide dropdown-hover ">
            <a href="#" className="text-dark pb-5 pt-5">
              Schedule
            </a>
            <div
              className="dropdown-menu  mt-4 ml-5"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a className="dropdown-item" href="/reports">
                Reports
              </a>
              
            </div>
          </li>
        </ul>
      </div>

      

      {/* Items  hide-on-big-screen */}
      <Nav className="text-dark hide-on-big-screen pr-5">
        Tests
        <Dropdown.Menu show className="border-0">
          <NavDropdown.Item href="/quizzes">Quiz</NavDropdown.Item>
          <NavDropdown.Item href="/assignments">Assignment</NavDropdown.Item>
        </Dropdown.Menu>
        <Nav.Link href="/profile" className="text-dark hide-on-big-screen">
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
  )
}
