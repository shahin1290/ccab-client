import React, { useState } from 'react'
import styled from 'styled-components'
import MangeCoures from '../screens/AdminScreen/MangeCoures'
import { useSideBar } from '../../util/sidebarState'
import { Button } from 'react-bootstrap'
import MentorCoursesList from '../screens/MentorScreen/MentorCoursesList'
import ManageMediaCenters from '../screens/AdminScreen/ManageMediaCenters'
import RequestList from '../screens/AdminScreen/RequestList'
import JobList from '../screens/AdminScreen/JobList'
import MangeOrder from '../screens/AdminScreen/MangeOrder'
import ManageServices from '../screens/AdminScreen/ManageServices'
import UserListScreen from '../screens/AdminScreen/UserList'
import ReportList from '../screens/InstructorScreen/ReportList'

const StyledMenu = styled.nav`
  background: #34495e;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  height: 100%;
  text-align: left;
  padding: 2rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 576px) {
    width: 100%;
  }
`

const Menu = ({ open, setBarSelected, barSelected }) => {
  const { toggleSideBar } = useSideBar()

  return (
    <StyledMenu open={open}>
      <div className="sidebar-nav">
        <div className="d-flex ">
          <div className="title mr-5 sidebar-brand text-white pt-2">Manage</div>{' '}
          <Button variant="danger" onClick={() => toggleSideBar()}>
            <span className="title">&times;</span>
          </Button>{' '}
        </div>

        <hr />
        <li>
          {' '}
          <a onClick={() => setBarSelected('course')} style={{background: barSelected === 'course' ? 'red' : ''}}>Manage Courses</a>
        </li>
        <li>
          <a onClick={() => setBarSelected('content')}>Manage Course Content</a>
        </li>
        <li>
          <a onClick={() => setBarSelected('media')}>Manage Media Centers</a>
        </li>
        <li>
          <a onClick={() => setBarSelected('service')}>Manage Services</a>
        </li>
        <li>
          <a onClick={() => setBarSelected('request')}>Request List</a>
        </li>
        <li>
          <a onClick={() => setBarSelected('order')}>Order List</a>
        </li>
        <li>
          <a onClick={() => setBarSelected('job')}>Job List</a>
        </li>
        <li>
          <a onClick={() => setBarSelected('user')}>User List</a>
        </li>
        <li>
          <a onClick={() => setBarSelected('report')}>Report List</a>
        </li>
      </div>
    </StyledMenu>
  )
}

const Sidebar = () => {
  const { sideBarOpen } = useSideBar()
  const [barSelected, setBarSelected] = useState('course')

  return (
    <div>
      {barSelected === 'course' && <MangeCoures />}
      {barSelected === 'content' && <MentorCoursesList />}
      {barSelected === 'media' && <ManageMediaCenters />}
      {barSelected === 'request' && <RequestList />}
      {barSelected === 'job' && <JobList />}
      {barSelected === 'order' && <MangeOrder />}
      {barSelected === 'service' && <ManageServices />}
      {barSelected === 'user' && <UserListScreen />}
      {barSelected === 'report' && <ReportList />}

      <div>
        <Menu open={sideBarOpen} setBarSelected={setBarSelected} />
      </div>
    </div>
  )
}

export default Sidebar
