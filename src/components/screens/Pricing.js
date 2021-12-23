import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { plans } from "../../util/plans";
import { getPriceConversionFromSEK } from "./../../util/getPriceConversion";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import SpecialCourseForm from "../layout/SpecialCourseForm";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import Tuition from "../layout/Tuition";

export default function Pricing({ match }) {
  const subscription = match && match.params.plan;

  const [course, setCourse] = useState(
    (subscription &&
      subscription.toLocaleLowerCase().includes("full stack") &&
      "fullstack") ||
      (subscription &&
        subscription.toLocaleLowerCase().includes("front end") &&
        "frontend") ||
      (subscription &&
        subscription.toLocaleLowerCase().includes("foundation") &&
        "special") ||
      "frontend"
  );
  const [currencyFromSek, setCurrencyFromSek] = useState();

  const getPlans = () => {
    return plans.filter((plan) => plan.course === course);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  const {
    promos,
    success: promoSuccess,
    loading: promoLoading,
    error: promoError,
  } = useSelector((state) => state.promoList);

  useEffect(() => {
    getPriceConversionFromSEK().then((data) => setCurrencyFromSek(data));
  }, []);
  console.log("started.....", promos);
  console.log("currencyFromSek", currencyFromSek);
  return (
    <div id='pricing'>
      {/* Pricing Section */}
      <section className='pricing-section' style={{ background: "#fafafa" }}>
        <div className='auto-container'>
          <Container>
            <div className='curriculum-project'>
              <div className='sec-title style-two centered'>
                <div>
                  <span className='title'> Different Course Plans</span>
                </div>
                <hr className='block-seperator mb-3' />
              </div>
              <ul className='d-flex justify-content-center curriculum-project pb-3'>
                <li
                  className=' btn btn-info rounded mx-2'
                  onClick={() => setCourse("frontend")}
                  style={
                    course === "frontend"
                      ? {
                          backgroundColor: "#ea5573",
                          color: "black",
                          fontWeight: "bold",
                        }
                      : { color: "#fff" }
                  }
                >
                  Web Development
                </li>

                <li
                  className='btn btn-info rounded mx-2 pt-3 d-flex align-content-center '
                  onClick={() => setCourse("special")}
                  style={
                    course === "special"
                      ? {
                          backgroundColor: "#ea5573",
                          color: "black",
                          fontWeight: "bold",
                        }
                      : {}
                  }
                >
                  Special
                </li>
              </ul>
            </div>
            {course !== "special" ? (
              <Row>
                {getPlans().length &&
                  getPlans().map((plan, index) => (
                    <Col
                      className='no-gutter offset-md-2 offset-lg-1'
                      sm={12}
                      lg={5}
                      md={9}
                      key={plan._id}
                      style={{
                        overflow: "hidden",
                      }}
                    >
                      {/* Price Block */}
                      <div
                        data-aos='flip-right'
                        data-aos-delay={(index + 2) * 100}
                        className='price-block col  col-sm-12 mx-auto'
                      >
                        <div
                          className='inner-box d-flex flex-column justify-content-between mb-5'
                          style={{ overflow: "auto" }}
                        >
                          <div>
                            <div className='icon-box'>
                              <span className='icon'>
                                {/* <img src="images/icons/price-1.png" alt /> */}
                                <i className='fas fa-gem planicon'></i>
                              </span>
                            </div>
                            <h3>
                              {plan.name
                                .toLocaleLowerCase()
                                .includes("full time")
                                ? "Full Stack Web and Mobile Development"
                                : "Frontend Development"}
                            </h3>

                            {promos && promos.length > 0 && promos[0].show && (
                              <p>
                                <del
                                  className='price'
                                  style={{ fontSize: "120%" }}
                                >
                                  {(currencyFromSek &&
                                    Math.round(
                                      currencyFromSek[0] *
                                        (Number(plan.price) + 200)
                                    )) ||
                                    Math.floor(plan.price / 8) + " USD"}{" "}
                                  {currencyFromSek && currencyFromSek[1] + " "}
                                </del>
                              </p>
                            )}
                            <div className='price'>
                              {currencyFromSek &&
                                Math.round(
                                  currencyFromSek[0] *
                                    (Number(plan.price) +
                                      (promos &&
                                      promos.length > 0 &&
                                      promos[0].show
                                        ? 0
                                        : 200))
                                )}
                              {currencyFromSek && currencyFromSek[1] + " "}
                              <span>Per month</span>
                            </div>
                            <h5 className='pricing-sub-title'>
                              How will you learn :
                            </h5>
                            <ul className='list'>
                              {plan.service.basic.map((offer) => (
                                <li className='check'>{offer}</li>
                              ))}
                            </ul>
                            <div className='list text-muted'>
                              {plan.requirement}
                            </div>
                          </div>

                          <div>
                            <a
                              href={`/checkout/subscription/${plan._id}`}
                              className='theme-btn btn-style-two'
                            >
                              <span className='txt'>Select</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
              </Row>
            ) : (
              <SpecialCourseForm />
            )}
          </Container>
        </div>
      </section>
      {/* End Pricing Section */}
    </div>
  );
}
