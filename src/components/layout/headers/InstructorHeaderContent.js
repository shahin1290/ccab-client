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

export default function InstructorHeaderContnet({ logoutHandler }) {
  return (
    <>
      {/* Item  hide-on-small-screen */}

     

      {/* Items  hide-on-big-screen */}
      <Nav className="text-dark hide-on-big-screen pr-5">
      
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
    </>
  )
}
