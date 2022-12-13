import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Rodal from "rodal";
// include styles
import "rodal/lib/rodal.css";
import {
  Container,
  Table,
  Row,
  Col,
  Modal,
  Button,
  From,
  Form,
} from "react-bootstrap";
import Message from "../../layout/Message";
import {
  getUsers,
  deleteUser,
  UpdateUserRole,
} from "../../../redux/actions/userAction";
import { useHistory, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../layout/Loader";
import { getDate } from "../../../util/getDate";

export default function UserlistScreen() {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetail } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  //Filter Student's courses
  const filterUserList = () => {
    return users && users.filter((user) => user.user_type === "StudentUser");
  };

  useEffect(() => {
    if (userDetail.user_type === "AdminUser") {
      dispatch(getUsers());
    } else {
      history.push("/");
    }
  }, [userDetail]);

  // modal

  useEffect(() => {
    if (userDetail.user_type == "AdminUser") {
      dispatch(getUsers());
    } else {
      history.push("/");
    }
  }, [userDetail]);

  // Getting user Details
  const { loading: userLoading, user } = useSelector(
    (state) => state.userProfile
  );

  return (
    <section id='team' className='pb-5'>
      <div className='container'>
        <h5 className='section-title h1'>Student List</h5>
        <div className='row'>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            filterUserList() &&
            filterUserList().map((student) => (
              <div className='col-xs-12 col-sm-6 col-md-4'>
                <div
                  className='image-flip'
                  ontouchstart="this.classNameList.toggle('hover');"
                >
                  <div className='mainflip'>
                    <div className='frontside'>
                      <div className='card'>
                        <div className='card-body'>
                          <p>
                            <img
                              className=' img-fluid'
                              src='https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_06.jpg'
                              alt='card image'
                            />
                          </p>
                          <h4 className='card-title'>{student.name}</h4>
                          <p className='card-text'>
                            <div>
                              <span className='font-weight-bold'>Email: </span>
                              {student.email}
                            </div>
                            <div>
                              <span className='font-weight-bold'>Phone: </span>
                              {student.phone || "not Provided"}
                            </div>

                            <div>
                              <span className='font-weight-bold'>Gender: </span>
                              {student.gender}
                            </div>

                            <div>
                              <span className='font-weight-bold'>
                                Medium of Language:{" "}
                              </span>
                              {student.language || "not Selected"}
                            </div>

                            <div>
                              <span className='font-weight-bold'>
                                Registration Date:{" "}
                              </span>
                              {student.createdAt
                                ? getDate(student.createdAt)
                                : "-"}
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
