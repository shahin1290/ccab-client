import React, { useState } from "react";
import styled from "styled-components";
import MangeCoures from "../screens/AdminScreen/MangeCoures";
import { useSideBar } from "../../util/sidebarState";
import { Button } from "react-bootstrap";
import MentorCoursesList from "../screens/MentorScreen/MentorCoursesList";
import ManageMediaCenters from "../screens/AdminScreen/ManageMediaCenters";
import RequestList from "../screens/AdminScreen/RequestList";
import JobList from "../screens/AdminScreen/JobList";
import MangeOrder from "../screens/AdminScreen/MangeOrder";
import ManageServices from "../screens/AdminScreen/ManageServices";
import UserListScreen from "../screens/AdminScreen/UserList";
import ReportList from "../screens/InstructorScreen/ReportList";
import PromoList from "../screens/AdminScreen/PromoList";
import StudenList from "../screens/AdminScreen/StudentList";

const StyledMenu = styled.nav`
  background: #34495e;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
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
`;

const Menu = ({ open, setBarSelected, barSelected }) => {
  const { toggleSideBar } = useSideBar();

  return (
    <StyledMenu open={open}>
      <div className='sidebar-nav'>
        <div className='d-flex '>
          <div className='title mr-5 sidebar-brand text-white'>Manage</div>{" "}
          <a style={{ color: "white" }} onClick={() => toggleSideBar()}>
            <span className='title ml-1'>&times;</span>
          </a>{" "}
        </div>

        <hr style={{ height: "1px", background: "grey", border: "0" }} />

        <li>
          {" "}
          <a
            onClick={() => setBarSelected("student")}
            style={{ background: barSelected === "student" ? "#d9534f" : "" }}
          >
            Student List
          </a>
        </li>

        <li>
          {" "}
          <a
            onClick={() => setBarSelected("course")}
            style={{ background: barSelected === "course" ? "#d9534f" : "" }}
          >
            Manage Courses
          </a>
        </li>
        <li>
          <a
            onClick={() => setBarSelected("content")}
            style={{ background: barSelected === "content" ? "#d9534f" : "" }}
          >
            Manage Course Content
          </a>
        </li>
        <li>
          <a
            onClick={() => setBarSelected("media")}
            style={{ background: barSelected === "media" ? "#d9534f" : "" }}
          >
            Manage Media Centers
          </a>
        </li>
        <li>
          <a
            onClick={() => setBarSelected("service")}
            style={{ background: barSelected === "service" ? "#d9534f" : "" }}
          >
            Manage Services
          </a>
        </li>
        <li>
          <a
            onClick={() => setBarSelected("request")}
            style={{ background: barSelected === "request" ? "#d9534f" : "" }}
          >
            Request List
          </a>
        </li>
        <li>
          <a
            onClick={() => setBarSelected("order")}
            style={{ background: barSelected === "order" ? "#d9534f" : "" }}
          >
            Order List
          </a>
        </li>
        <li>
          <a
            onClick={() => setBarSelected("job")}
            style={{ background: barSelected === "job" ? "#d9534f" : "" }}
          >
            Job List
          </a>
        </li>
        <li>
          <a
            onClick={() => setBarSelected("user")}
            style={{ background: barSelected === "user" ? "#d9534f" : "" }}
          >
            User List
          </a>
        </li>
        <li>
          <a
            onClick={() => setBarSelected("report")}
            style={{ background: barSelected === "report" ? "#d9534f" : "" }}
          >
            Report List
          </a>
        </li>

        <li>
          <a
            onClick={() => setBarSelected("promo")}
            style={{ background: barSelected === "promo" ? "#d9534f" : "" }}
          >
            Promo List
          </a>
        </li>
      </div>
    </StyledMenu>
  );
};

const Sidebar = () => {
  const { sideBarOpen, openSideBar } = useSideBar();
  const [barSelected, setBarSelected] = useState("student");

  return (
    <div>
      {barSelected === "student" && <StudenList />}
      {barSelected === "course" && <MangeCoures />}
      {barSelected === "content" && <MentorCoursesList />}
      {barSelected === "media" && <ManageMediaCenters />}
      {barSelected === "request" && <RequestList />}
      {barSelected === "job" && <JobList />}
      {barSelected === "order" && <MangeOrder />}
      {barSelected === "service" && <ManageServices />}
      {barSelected === "user" && <UserListScreen />}
      {barSelected === "report" && <ReportList />}
      {barSelected === "promo" && <PromoList />}

      <div>
        <a
          id='show-sidebar'
          className='btn btn-sm btn-dark'
          href='#'
          onClick={() => openSideBar()}
          style={{ left: sideBarOpen ? "-40px" : "0" }}
        >
          <i className='fas fa-bars'></i>
        </a>
        <Menu
          open={sideBarOpen}
          setBarSelected={setBarSelected}
          barSelected={barSelected}
        />
      </div>
    </div>
  );
};

export default Sidebar;
