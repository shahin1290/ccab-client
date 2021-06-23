import React from 'react'
import { Row, Col } from 'react-bootstrap'

const WebDevelopmentMarket = () => {
  return (
    <section className="web-market mb-5">
      <Row  className="auto-container pt-5 pb-5 " style={{ margin: '0 auto' }}>
        <Col md={6} className="pr-3 mt-5">
          <div className="sub-title text-danger">WHY YOU SHOULD LEARN CODING?</div>{' '}
          <div className="title">Web development market:</div>
          <div className="sub-text">
            Benefit from our network of tech employers to plan your career path.
            Our Personal Development Program provides students with advice,
            guidance and how to best approach the market as a developer. You
            will also have access to our vast employer network.
          </div>
          <div className="white-box sub-text">
            For those who want to improve upon their current knowledge base, or
            start a new career path! The ability to code and develop software
            are invaluable in today's market. It’s a skillset that is applicable
            in digital marketing, mathematics, sports analytics, and everything
            in between.The most recent boom has created a wealth of employment
            opportunities resulting in huge skills-gap in an industry with an
            already depleted talent pipeline. Accounting for all university
            Computer Science graduates – 825,000 European ICT jobs will remain
            vacant by 2020. In the US, there are an expected 1,000,000 jobs that
            will go unfilled by 2020. You should learn to code to stay ahead of
            the curve and make yourself an invaluable asset!
          </div>
        </Col>
        <Col md={6} className="web-market-text mt-5">
          <Col sm={6} className="d-flex justify-content-between">
            <Row className="big green mt-5 p-5">
              <div>
                <div className="number">825,000</div>
                <div className="sub-title text-center ">
                  EU ICT JOBS WILL REMAIN VACANT BY 2022
                </div>
              </div>
            </Row>{' '}
            <Row className="big red ml-5 ">
              <div>
                <div className="number">1000,000</div>
                <div className="sub-title text-center">
                  EU ICT JOBS WILL REMAIN VACANT BY 2022
                </div>
              </div>
            </Row>{' '}
          </Col>
          <Col sm={6} className="d-flex justify-content-between ">
            <Row className="small pink mt-5 mr-5 p-5">
              <div className="number m-4">25</div>
              <div className="sub-title text-center">INTERNSHIP AVAILABLE</div>
            </Row>{' '}
            <Row className="small blue p-5">
              <div className="number m-4">100</div>
              <div className="sub-title text-center">SATISFACTION RATE</div>
            </Row>
          </Col>
        </Col>
      </Row>
    </section>
  )
}

export default WebDevelopmentMarket
