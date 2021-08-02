import {
  Nav,
  Dropdown,
  NavDropdown,
  Container,
  Badge,
  Image,
  Button
} from 'react-bootstrap'
import React from 'react'

export default function AdminHeaderContnet({ logoutHandler }) {
  return (
    <>
      <div className="collapse navbar-collapse mr-3">
        <ul className="navbar-nav ">
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
          <li className="nav-item dropdown dropdown-slide dropdown-hover ">
            <a className="text-dark">Manage</a>
            <div
              className="dropdown-menu  mt-4 ml-5"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a className="dropdown-item" href="/admin-order-list">
                Orders
              </a>
              <div className="dropdown-divider"></div>


              <a className="dropdown-item" href="/admin-media-center-list">
                Manage Media Centers
              </a>
              <div className="dropdown-divider"></div>

              <a className="dropdown-item" href="/admin-courses-list">
                Manage Courses
              </a>
              <div className="dropdown-divider"></div>

              <a className="dropdown-item" href="/mentor-courses-list">
                Manage Content
              </a>
              <div className="dropdown-divider"></div>

              <a className="dropdown-item" href="/admin-services-list">
                Manage Services
              </a>
              <div className="dropdown-divider"></div>

              <a className="dropdown-item" href="/admin-request-list">
                Request List
              </a>
              <div className="dropdown-divider"></div>

              <a className="dropdown-item" href="/admin-job-list">
                Job List
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/admin-users-list">
                Users
              </a>
              <div className="dropdown-divider"></div>
            </div>
          </li>
        </ul>
      </div>

      {/* Items  hide-on-big-screen */}
      <Nav className="text-dark hide-on-big-screen pr-5">
        Schedule
        <Dropdown.Menu show className="border-0">
          <NavDropdown.Item href="/reports">Reports</NavDropdown.Item>
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
      <Nav className="text-dark hide-on-big-screen pt-4 ">
        Manage
        <Dropdown.Menu show className="border-0">
          <NavDropdown.Item href="/admin-order-list">Orders</NavDropdown.Item>
          <NavDropdown.Item href="/admin-media-center-list">
            Manage Media Centers
          </NavDropdown.Item>

          <NavDropdown.Item href="/admin-courses-list">
            Manage Courses
          </NavDropdown.Item>

          <NavDropdown.Item href="/mentor-courses-list">
            Manage Content
          </NavDropdown.Item>
          <NavDropdown.Item href="/admin-services-list">
            Manage Services
          </NavDropdown.Item>
          <NavDropdown.Item href="/admin-request-list">
            Request List
          </NavDropdown.Item>
          <NavDropdown.Item href="/admin-job-list">Job List</NavDropdown.Item>
          <NavDropdown.Item href="/admin-users-list">Users</NavDropdown.Item>
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
