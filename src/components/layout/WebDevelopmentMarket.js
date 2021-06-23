import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Logo from './../../assets/images/whiteLogo.jpg'
import CountUp from 'react-countup'

const WebDevelopmentMarket = () => {
  return (
    <section className="web-market">
      <Row className="auto-container pb-5 " style={{ margin: '0 auto' }}>
        <Col md={6} className="pr-3">
          <div className="sub-title text-danger">
            WHY YOU SHOULD LEARN CODING?
          </div>{' '}
          <div className="title">Web development market:</div>
          <div className="sub-text">
            Benefit from our network of tech employers to plan your career path.
            Our Personal Development Program provides students with advice,
            guidance and how to best approach the market as a developer. You
            will also have access to our vast employer network.
          </div>
          <div className="white-box ">
            <div className="quarter-circle-top-left "></div>

            <div className="sub-text inner-text">
              For those who want to improve upon their current knowledge base,
              or start a new career path! The ability to code and develop
              software are invaluable in today's market. It’s a skillset that is
              applicable in digital marketing, mathematics, sports analytics,
              and everything in between.The most recent boom has created a
              wealth of employment opportunities resulting in huge skills-gap in
              an industry with an already depleted talent pipeline. Accounting
              for all university Computer Science graduates – 825,000 European
              ICT jobs will remain vacant by 2020. In the US, there are an
              expected 1,000,000 jobs that will go unfilled by 2020. You should
              learn to code to stay ahead of the curve and make yourself an
              invaluable asset!
            </div>
            <div className="d-flex justify-content-between">
              <div className="ml-3 pb-3">
                <img src={Logo} width="50" />
                <span className="pl-3">Codify College</span>
              </div>
              <div className="quote mr-5 pr-5">
                <i class="fas fa-quote-right"></i>
              </div>
            </div>
          </div>
        </Col>
        <Col md={6}  className="web-market-text text-center ">
          <Row className="">
            <Col md={5} xs={12}className="big green ">
              <div>
                <div className="number">
                  {' '}
                  <CountUp
                    start={0}
                    end={825000}
                    duration={2.75}
                    separator=" "
                    decimal=","
                  />
                </div>
                <div className="sub-title  ">
                  EU ICT JOBS WILL REMAIN VACANT BY 2022
                </div>
              </div>
            </Col>{' '}
            <Col md={5} xs={12} className="big red ">
              <div>
                <div className="number">
                  {' '}
                  <CountUp
                    start={0}
                    end={825000}
                    duration={2.75}
                    separator=" "
                    decimal=","
                  />
                </div>
                <div className="sub-title  ">
                  EU ICT JOBS WILL REMAIN VACANT BY 2022
                </div>
              </div>
            </Col>{' '}
          </Row>
          <Row className="">
            <Col md={5} xs={12} className="small pink ">
              <div className="number">
                {' '}
                <CountUp
                  start={0}
                  end={25}
                  duration={2.75}
                  separator=" "
                  decimal=","
                />
              </div>
              <div className="sub-title ">INTERNSHIP AVAILABLE</div>
            </Col>{' '}
            <Col md={5} xs={12} className="small blue ">
              <div className="number">
                {' '}
                <CountUp
                  start={0}
                  end={25}
                  duration={2.75}
                  separator=" "
                  decimal=","
                />
              </div>
              <div className="sub-title ">INTERNSHIP AVAILABLE</div>
            </Col>{' '}
          </Row>
        </Col>
      </Row>
    </section>
  )
}

export default WebDevelopmentMarket
