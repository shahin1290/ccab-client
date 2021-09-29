import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Table, Row, Col, Button, Image } from "react-bootstrap";
import Message from "../layout/Message";
import UpdateSeviceSession from "./UpdateSeviceSession";
import { getAppointments } from "../../redux/actions/appointmentAction";

import { useHistory, Link } from "react-router-dom";
import Loader from "../layout/Loader";

import Rodal from "rodal";
// include styles
import "rodal/lib/rodal.css";
import { getDate } from "../../util/getDate";

export default function ServiceSessions() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);

  const [showModal, setShowModal] = useState({ visible: false });

  const { userDetail } = userLogin;

  const [selectedAppointment, setSelectedAppointment] = useState();


  // get Users list reducer
  const { appointments, loading, error } = useSelector(
    (state) => state.appointmentList
  );

  useEffect(() => {}, [dispatch, history]);

  useEffect(() => {
    if (
      userDetail.user_type === "InstructorUser" ||
      userDetail.user_type === "AdminUser" ||
      userDetail.user_type === "StudentUser"
    ) {
      dispatch(getAppointments());
    } else {
      history.push("/");
    }
  }, [dispatch, userDetail, history]);

  /*********** functions ******************/

  const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section style={{ padding: "0 0 30px 0", backgroundColor: "white" }}>
      <div className='auto-container '>
        <div className='py-2 sub-title mb-5'>
          <Rodal
            animation='zoom'
            visible={showModal.visible}
            onClose={() => setShowModal({ visible: false })}
            width={400}
          >
            <UpdateSeviceSession
              selectedAppointment={selectedAppointment}
              setSelectedAppointment={setSelectedAppointment}
              setShowModal={setShowModal}
            />
          </Rodal>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          appointments.length &&
          appointments.map(
            (appointment) =>
              appointment.sessions.length &&
              appointment.sessions.map((req) => (
                <div key={req._id} className='text-center-small-screen  mb-3'>
                  <div className='sub-text font-weight-bold'>
                    {longEnUSFormatter.format(new Date(req.content))}{" "}
                  </div>
                  <Row className='pl-4 pr-5 mt-2'>
                    <Col md={2}>
                      {" "}
                      <Image
                        width='50'
                        src='/images/resource/avatar.svg'
                        roundedCircle
                      />
                    </Col>
                    <Col className='my-auto sub-text'>
                      {new Date(req.content).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(req.content).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Col>
                    <Col md={3} className='my-auto sub-text'>
                      {appointment.service.name}
                    </Col>{" "}
                    <Col md={3} className='my-auto sub-text'>
                      <Button
                        onClick={() => {
                          setSelectedAppointment(req);
                          setShowModal({ visible: true });
                        }}
                        variant='info'
                      >
                        update
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))
          )
        )}
      </div>
    </section>
  );
}
