import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function Pricing() {
  return (
    <div>
      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="sec-title style-two centered">
            <h2>Plans &amp; Pricing</h2>
            <div className="text">
              There are many variations of passages of Lorem Ipsum available,
            </div>
          </div>

          <Container>
            <Row>
              <Col>
                {/* Price Block */}
                <div className="price-block col  col-sm-12">
                  <div className="inner-box">
                    <div className="icon-box">
                      <span className="icon">
                        <img src="images/icons/price-1.png" alt />
                      </span>
                    </div>
                    <h3>Basic Plan</h3>
                    <div className="price">
                      3499 kr <span>Per month</span>
                    </div>
                    <div>or</div>
                    <div className="price">
                      899 kr <span>Per week</span>
                    </div>
                    <ul className="list">
                      <li className="check">
                        Phasellus enim magna, up above the most likedo ut.
                      </li>
                      <li className="check">
                        Sed consequat justo non profit us
                      </li>
                      <li className="check">
                        Ut nulla tellus, eleifend euismod pellentesque
                      </li>
                      <li className="check">
                        Phasellus enim magna, up above the most likedo ut.
                      </li>
                      <li className="check">
                        Sed consequat justo non profit us
                      </li>
                      <li className="check">
                        Ut nulla tellus, eleifend euismod pellentesque
                      </li>
                      <li className="cross">
                        Phasellus enim magna, up above the most likedo ut.
                      </li>
                      <li className="cross">
                        Sed consequat justo non profit us
                      </li>
                      <li className="cross">
                        Ut nulla tellus, eleifend euismod pellentesque
                      </li>
                      <li className="cross">
                        Sed consequat justo non profit us
                      </li>
                      <li className="cross">
                        Ut nulla tellus, eleifend euismod pellentesque
                      </li>
                    </ul>
                    <Link to="/checkout/subscription/basic" className="theme-btn btn-style-two">
                      <span className="txt">Purchase Membership</span>
                    </Link>
                  </div>
                </div>
              </Col>
              <Col>
                {/* Price Block */}
                <div className="price-block col  col-sm-12">
                  <div className="inner-box">
                    <div className="icon-box">
                      <span className="icon">
                        <img src="images/icons/price-1.png" alt />
                      </span>
                    </div>
                    <h3>Standard Plan</h3>
                    <div className="price">
                      3899 kr <span>Per month</span>
                    </div>
                    <div>or</div>
                    <div className="price">
                      999 kr <span>Per week</span>
                    </div>
                    <ul className="list">
                      <li className="check">
                        Phasellus enim magna, up above the most likedo ut.
                      </li>
                      <li className="check">
                        Sed consequat justo non profit us
                      </li>
                      <li className="check">
                        Ut nulla tellus, eleifend euismod pellentesque
                      </li>
                      <li className="check">
                        Phasellus enim magna, up above the most likedo ut.
                      </li>
                      <li className="check">
                        Sed consequat justo non profit us
                      </li>
                      <li className="check">
                        Ut nulla tellus, eleifend euismod pellentesque
                      </li>
                      <li className="cross">
                        Phasellus enim magna, up above the most likedo ut.
                      </li>
                      <li className="cross">
                        Sed consequat justo non profit us
                      </li>
                      <li className="cross">
                        Ut nulla tellus, eleifend euismod pellentesque
                      </li>
                      <li className="cross">
                        Sed consequat justo non profit us
                      </li>
                      <li className="cross">
                        Ut nulla tellus, eleifend euismod pellentesque
                      </li>
                    </ul>
                    <Link to="/checkout/subscription/standard" className="theme-btn btn-style-two">
                      <span className="txt">Purchase Membership</span>
                    </Link>
                  </div>
                </div>
              </Col>
              <Col>
                {/* Price Block */}
                <div className="price-block col  col-sm-12">
                  <div className="inner-box">
                    <div className="icon-box">
                      <span className="icon">
                        <img src="images/icons/price-1.png" alt />
                      </span>
                    </div>
                    <h3>Premium Plan</h3>
                    <div className="price">
                      4699 kr <span>Per month</span>
                    </div>
                    <div>or</div>
                    <div className="price">
                      1199 kr <span>Per week</span>
                    </div>
                    <ul className="list">
                      <li className="check">
                        Phasellus enim magna, up above the most likedo ut.
                      </li>
                      <li className="check">
                        Sed consequat justo non profit us
                      </li>
                      <li className="check">
                        Ut nulla tellus, eleifend euismod pellentesque
                      </li>
                      <li className="check">
                        Phasellus enim magna, up above the most likedo ut.
                      </li>
                      <li className="check">
                        Sed consequat justo non profit us
                      </li>
                      <li className="check">
                        Ut nulla tellus, eleifend euismod pellentesque
                      </li>
                      <li className="cross">
                        Phasellus enim magna, up above the most likedo ut.
                      </li>
                      <li className="cross">
                        Sed consequat justo non profit us
                      </li>
                      <li className="cross">
                        Ut nulla tellus, eleifend euismod pellentesque
                      </li>
                      <li className="cross">
                        Sed consequat justo non profit us
                      </li>
                      <li className="cross">
                        Ut nulla tellus, eleifend euismod pellentesque
                      </li>
                    </ul>
                    <Link to="/checkout/subscription/premium" className="theme-btn btn-style-two">
                      <span className="txt">Purchase Membership</span>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/* End Pricing Section */}
    </div>
  )
}
