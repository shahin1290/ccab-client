import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Table,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Message from "../../layout/Message";
import {
  getPromos,
  deletePromo,
  updatePromo,
} from "../../../redux/actions/promoAction";
import { useHistory, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../layout/Loader";

export default function PromoList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userDetail } = userLogin;

  const {
    promos,
    success: promoSuccess,
    loading: promoLoading,
    error: promoError,
  } = useSelector((state) => state.promoList);
  const {
    loading: Deleteloading,
    error: DeleteError,
    successDelete,
  } = useSelector((state) => state.promoDelete);

  const {
    success: UpdateSuccess,
    loading: Updateloading,
    error: UpdateError,
  } = useSelector((state) => state.promoUpdate);

  // tooltip function
  const renderTooltip = (props) => (
    <Tooltip id='button-tooltip' {...props}>
      Publish
    </Tooltip>
  );

  const renderTooltipWithHold = (props) => (
    <Tooltip id='button-tooltip' {...props}>
      Withhold
    </Tooltip>
  );

  // publish course
  const publishhnadler = (promo) => {
    dispatch(
      updatePromo(
        {
          ...promo,
          show: true,
        },
        promo._id
      )
    );
  };

  // Withhold  course
  const WithholdHnadler = (promo) => {
    dispatch(
      updatePromo(
        {
          ...promo,
          show: false,
        },
        promo._id
      )
    );
  };

  //use effect

  useEffect(() => {
    if (userDetail.user_type === "AdminUser") {
      dispatch(getPromos());
    } else {
      history.push("/");
    }
  }, [dispatch, userDetail, successDelete, UpdateSuccess]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ? ")) {
      dispatch(deletePromo(id));
      toast.info("User successfuly removed", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <div className='container'>
      <div style={{ padding: "60px 0" }}>
        <div className='title pb-3'>Promos</div>
        <div className='py-2 sub-title'>
          <Link to='/add-promo'>
            {" "}
            <i class='far fa-plus-square text-danger'></i> Add promo
          </Link>
        </div>
        {promoLoading ? (
          <Loader />
        ) : promoError ? (
          <Message>{promoError}</Message>
        ) : (
          promos && (
            <Table striped bordered hover responsive='sm'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>promo Name</th>
                  <th>promo count down</th>
                  <th>promo percentages</th>
                  <th>Show</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {promos &&
                  promos.map((req) => (
                    <tr key={req._id}>
                      <td>{promos.indexOf(req) + 1}</td>
                      <td>{req.name}</td>

                      <td>
                        {req.days} Days : {req.hours} Hours : {req.minutes}{" "}
                        Minutes
                      </td>
                      <td>{req.percentages} %</td>

                      <td>
                        {req.show ? (
                          <span className='bg-success text-white p-2'>
                            True
                          </span>
                        ) : (
                          <span className='bg-danger text-white p-2'>
                            False
                          </span>
                        )}
                      </td>

                      <td>
                        <Container>
                          <Row>
                            <Col style={{ padding: "0px" }}>
                              <a onClick={() => deleteHandler(req._id)}>
                                <i className='fas fa-trash-restore text-danger'></i>
                              </a>
                            </Col>

                            <Col style={{ padding: "0px" }}>
                              <Link to={`/promo-edit/${req._id}`}>
                                <i className='fas fa-edit text-danger'></i>
                              </Link>
                            </Col>

                            {/* publish Button and view button */}
                            {req.show ? (
                              <OverlayTrigger
                                placement='bottom'
                                text='Withhold'
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltipWithHold}
                              >
                                <a
                                  onClick={() => {
                                    WithholdHnadler(req);
                                  }}
                                >
                                  <i className='fas fa-minus-circle'></i>
                                </a>
                              </OverlayTrigger>
                            ) : (
                              <>
                                {/* Tool tips for publishing action */}
                                <OverlayTrigger
                                  placement='bottom'
                                  text='Publish'
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={renderTooltip}
                                >
                                  <a
                                    onClick={() => {
                                      publishhnadler(req);
                                    }}
                                  >
                                    <i className='fas fa-upload'></i>
                                  </a>
                                </OverlayTrigger>
                              </>
                            )}
                          </Row>
                        </Container>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )
        )}
      </div>

      {<ToastContainer />}
    </div>
  );
}
