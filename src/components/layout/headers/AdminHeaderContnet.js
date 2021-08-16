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
import { Link } from 'react-router-dom'
import { useSideBar } from '../../../util/sidebarState'

export default function AdminHeaderContnet({ logoutHandler }) {
  const { openSideBar } = useSideBar()
  return (
    <>
      <div className="collapse navbar-collapse mr-3">
        <ul className="navbar-nav ">
          <li className="nav-item dropdown dropdown-slide dropdown-hover ">
            <Link
              className="text-dark"
              to="/admin-sidebar"
              onClick={() => openSideBar()}
            >
              Manage
            </Link>
          </li>
        </ul>
      </div>

      {/* Items  hide-on-big-screen */}

      <Nav className="text-dark hide-on-big-screen pt-4 ">
        <Nav.Link
          href="/admin-sidebar"
          className="text-dark hide-on-big-screen"
        >
          Manage
        </Nav.Link>
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
