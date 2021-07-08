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

export default function AccountantHeaderContnet({ logoutHandler }) {
  return (
    <>
      {/* Item  hide-on-small-screen */}

      <div className="collapse navbar-collapse pr-3">
        <ul className="navbar-nav ">
          <li className="nav-item dropdown dropdown-slide dropdown-hover ">
            <a href="#" className="text-dark pb-5 pt-5">
              Manage
            </a>
            <div
              className="dropdown-menu  mt-4 ml-5"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a className="dropdown-item" href="/accountant-request-list">
                Payment Requests
              </a>
            </div>
          </li>
        </ul>
      </div>

      {/* Items  hide-on-big-screen */}
      <Nav className="text-dark hide-on-big-screen pr-5">
        Manage
        <Dropdown.Menu show className="border-0">
          <NavDropdown.Item href="/accountant-request-list">Payment Requests</NavDropdown.Item>
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
