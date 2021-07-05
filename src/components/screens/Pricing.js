import React, { useState , useEffect } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { plans } from '../../util/plans'
import {getPriceConversionFromSEK} from './../../util/getPriceConversion';
import axios from 'axios'
export default function Pricing() {
  const [period, setPeriod] = useState('weekly')
  const [sekToUsd, setSekToUsd] = useState()


  const getPlans = () => {
    return plans.filter((plan) => plan.period === period)
  }
 

  console.log(sekToUsd);
  useEffect(() => {
   getPriceConversionFromSEK().then(data=>setSekToUsd(data))
  
  }, [])

  return (
    <div id="pricing">
      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="sec-title style-two centered">
            <h2>Plans &amp; Pricing</h2>
            <div className="text">
            Register now and start coding from today. No experience needed !
            </div>
          </div>

          <Container>
            <div className="curriculum-project">
              <ul className="d-flex justify-content-center curriculum-project">
                <li className="pl-5 ">
                  <a
                    onClick={() => setPeriod('weekly')}
                    style={
                      period === 'weekly'
                        ? { color: '#ea5573', fontWeight: 'bold' }
                        : {}
                    }
                  >
                    Weekly
                  </a>
                </li>
                <li className="pl-5 ">
                  <a
                    style={
                      period === 'monthly'
                        ? { color: '#ea5573', fontWeight: 'bold' }
                        : {}
                    }
                    onClick={() => setPeriod('monthly')}
                  >
                    Monthly
                  </a>
                </li>
              </ul>
            </div>

            <Row>
              {getPlans().length &&
                getPlans().map((plan) => (
                  <Col className="no-gutter" key={plan._id}>
                    {/* Price Block */}
                    <div className="price-block col  col-sm-12">
                      <div className="inner-box">
                        <div className="icon-box">
                          <span className="icon" >
                            {/* <img src="images/icons/price-1.png" alt /> */}
                            <i className="fas fa-gem planicon"></i>
                          </span>
                        </div>
                        <h3>{plan.name}</h3>
                       
                        <p><del className="price" style={{fontSize : "120%"}}>{(sekToUsd&&(Math.round(sekToUsd[0]*(Number(plan.price)+200))))}  {sekToUsd&&sekToUsd[1]+' '}</del></p>
                        <div className="price">
                          {(sekToUsd&&(Math.round(sekToUsd[0]*plan.price)))} {sekToUsd&&sekToUsd[1]+' '}
                          <span>
                            {period === 'monthly' ? 'Per month' : 'Per week'}
                          </span>
                        </div>

                        <ul className="list">
                          {plan.offers.map((offer) => (
                            <li className="check">{offer}</li>
                          ))}
                          {plan.notOffers.map((notOffer) => (
                            <li className="cross">{notOffer}</li>
                          ))}
                        </ul>
                        <Link
                          to={`/checkout/subscription/${plan._id}`}
                          className="theme-btn btn-style-two"
                        >
                          <span className="txt">Select</span>
                        </Link>
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
  )
}
