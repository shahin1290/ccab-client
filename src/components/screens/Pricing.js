import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { plans } from "../../util/plans";
import { getPriceConversionFromSEK } from "./../../util/getPriceConversion";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

export default function Pricing() {
  const [period, setPeriod] = useState("weekly");
  const [sekToUsd, setSekToUsd] = useState();

  const getPlans = () => {
    return plans.filter((plan) => plan.period === period);
  };

  const {
    promos,
    success: promoSuccess,
    loading: promoLoading,
    error: promoError,
  } = useSelector((state) => state.promoList);

  console.log(sekToUsd);
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
              Register yourself now and get real employabe skills that top
              companies want.
            </div>
          </div>

          <Container>
            <div className='curriculum-project'>
              <ul className='d-flex justify-content-center curriculum-project'>
                <li className='pl-5 '>
                  <a
                    onClick={() => setPeriod("weekly")}
                    style={
                      period === "weekly"
                        ? { color: "#ea5573", fontWeight: "bold" }
                        : {}
                    }
                  >
                    Weekly
                  </a>
                </li>
                <li className='pl-5 '>
                  <a
                    style={
                      period === "monthly"
                        ? { color: "#ea5573", fontWeight: "bold" }
                        : {}
                    }
                    onClick={() => setPeriod("monthly")}
                  >
                    Monthly
                  </a>
                </li>
              </ul>
            </div>

            <Row>
              {getPlans().length &&
                getPlans().map((plan) => (
                  <Col className='no-gutter' sm={12} lg={4} md={9}  key={plan._id}
                  style={{
                    overflow:'auto'
                  }}>
                    {/* Price Block */}
                    <div className='price-block col  col-sm-12 mx-auto'>
                      <div className='inner-box d-flex flex-column justify-content-between mb-5'
                       style={{ overflow:'auto' }}>

                        <div>
                          <div className='icon-box'>
                            <span className='icon'>
                              {/* <img src="images/icons/price-1.png" alt /> */}
                              <i className='fas fa-gem planicon'></i>
                            </span>
                          </div>
                          <h3>{plan.name}</h3>

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
                                sekToUsd[0] * plan.price +
                                  (promos && promos.length > 0 && promos[0].show
                                    ? 0
                                    : 200)
                              )}{" "}
                            {sekToUsd && sekToUsd[1] + " "}
                            <span>
                              {period === "monthly" ? "Per month" : "Per week"}
                            </span>
                          </div>
                            <h5 className="pricing-sub-title">What You Will Get :</h5>        
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

                          <h5 className="pricing-sub-title">Requierment</h5>  
                          <ul className='list'>
                            {plan.requirement.map((offer) => (
                              <li className='key'>{offer}</li>
                            ))}

                          </ul>
                        </div>

                        <div>
                          <Link
                            to={`/checkout/subscription/${plan._id}`}
                            className='theme-btn btn-style-two'
                          >
                            <span className='txt'>Select</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
            </Row>
          </Container>
        </div>
      </section>
      {/* End Pricing Section */}
    </div>
  );
}
