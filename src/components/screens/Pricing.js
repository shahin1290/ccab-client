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
  const [sekToUsd, setSekToUsd] = useState();

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
    getPriceConversionFromSEK().then((data) => setSekToUsd(data));
  }, []);

  return (
    <div id='pricing'>
      {/* Pricing Section */}
      <section className='pricing-section'>
        <div className='auto-container'>
          {/* Sec Title */}
          <div className='sec-title style-two centered'>
            <div className='title'>
              Different Course Plans Tailored To Your Needs
            </div>
            <hr className='block-seperator mb-3' />
            <div className='text'>
            You will learn coding and build an active portfolio to showcase your skill to the recruiters.From 15 weeks, you will learn both Frontend as well as Backend web development to become a Full-stack developer who is industry-ready
            </div>
          </div>

          <Container>
            <div className='curriculum-project'>
              <ul className='d-flex justify-content-center curriculum-project pb-3'>
                <li className=' btn btn-info rounded mx-2'
                 onClick={() => setCourse("frontend")}
                              
                 style={
                  course === "frontend"
                    ? { backgroundColor: "#ea5573",color:"black", fontWeight: "bold" }
                    : {color:'#fff'}
                }
                >
        
                    Front end
                
                </li>
                <li className=' btn btn-info rounded mx-2'
                 onClick={() => setCourse("fullstack")}
                 style={
                  course === "fullstack"
                    ? { backgroundColor: "#ea5573",color:"black", fontWeight: "bold" }
                    : {}
                }
                >
                  <a
            
                 
                  >
                    Full stack
                  </a>
                </li>

                <li className='btn btn-info rounded mx-2 pt-3 d-flex align-content-center '
                 onClick={() => setCourse("special")}
                 style={
                  course === "special"
                    ? { backgroundColor: "#ea5573",color:"black", fontWeight: "bold" }
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
                                ? "Full Time"
                                : "Part time"}
                            </h3>

                            {promos && promos.length > 0 && promos[0].show && (
                              <p>
                                <del
                                  className='price'
                                  style={{ fontSize: "120%" }}
                                >
                                  {sekToUsd &&
                                    Math.round(
                                      sekToUsd[0] * (Number(plan.price) + 200)
                                    )}{" "}
                                  {sekToUsd && sekToUsd[1] + " "}
                                </del>
                              </p>
                            )}
                            <div className='price'>
                              {sekToUsd &&
                                Math.round(
                                  sekToUsd[0] *
                                    (Number(plan.price) +
                                      (promos &&
                                      promos.length > 0 &&
                                      promos[0].show
                                        ? 0
                                        : 200))
                                )}{" "}
                              {sekToUsd && sekToUsd[1] + " "}
                              <span>Per month</span>
                            </div>
                            <h5 className='pricing-sub-title'>
                            How will you learn :
                            </h5>
                            <ul className='list'>
                              {plan.service.basic.map((offer) => (
                                <li className='check'>{offer}</li>
                              ))}
                              {plan.service.star.map((notOffer) => (
                                <li className='yellow-star'>{notOffer}</li>
                              ))}

                              {plan.service.superStar.map((notOffer) => (
                                <li className='red-star'>{notOffer}</li>
                              ))}
                            </ul>

                            <h5 className='pricing-sub-title'>Requierment</h5>
                            <ul className='list'>
                              {plan.requirement.map((offer) => (
                                <li className='key'>{offer}</li>
                              ))}
                            </ul>
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
