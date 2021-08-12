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
  display: flex;
  flex-direction: column;
  background: #effffa;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 576px) {
    width: 100%;
  }
`

const Menu = ({ open, setSelected }) => {
  const { toggleSideBar } = useSideBar()

  return (
    <StyledMenu open={open}>
      <div className="d-flex">
        <div className="sub-title mr-5">Admin Manage</div>{' '}
        <Button variant="danger" onClick={() => toggleSideBar()}>
          <span className="title">&times;</span>
        </Button>{' '}
      </div>

      <hr />
      <a onClick={() => setSelected('course')}>Manage Courses</a>
      <a onClick={() => setSelected('content')}>Manage Course Content</a>
      <a onClick={() => setSelected('media')}>Manage Media Centers</a>
      <a onClick={() => setSelected('service')}>Manage Services</a>
      <a onClick={() => setSelected('request')}>Request List</a>
      <a onClick={() => setSelected('order')}>Order List</a>
      <a onClick={() => setSelected('job')}>Job List</a>
      <a onClick={() => setSelected('user')}>User List</a>
      <a onClick={() => setSelected('report')}>Report List</a>
    </StyledMenu>
  )
}

const Sidebar = () => {
  const { sideBarOpen } = useSideBar()
  const [selected, setSelected] = useState('course')

  return (
    <div>
      {selected === 'course' && <MangeCoures />}
      {selected === 'content' && <MentorCoursesList />}
      {selected === 'media' && <ManageMediaCenters />}
      {selected === 'request' && <RequestList />}
      {selected === 'job' && <JobList />}
      {selected === 'order' && <MangeOrder />}
      {selected === 'service' && <ManageServices />}
      {selected === 'user' && <UserListScreen />}
      {selected === 'report' && <ReportList />}

      <div>
        <Menu open={sideBarOpen} setSelected={setSelected} />
      </div>
    </div>
  )
}

export default Sidebar
