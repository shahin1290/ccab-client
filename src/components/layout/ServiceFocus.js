import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import image1 from '../../assets/images/header/image-1.jpg'
import image2 from '../../assets/images/header/image-2.jpg'
import image3 from '../../assets/images/header/image-3.jpg'

const ServiceFocus = () => {
  return (
    <section className="pb-5" style={{ background: '#FAFAFA' }}>
      <div className="auto-container">
        <div className="title pt-5 pb-5 text-center letter-spacing">
          <span style={{ color: '#EB6C85' }}>
            Homework help for all subjects & ages,
          </span>{' '}
          throughout Sweden
        </div>
        <Row className="service-focus">
          <Col lg={4}>
            <Card
              style={{
                width: '97%',
                border: 0,
                boxShadow: '0 2.8px 2.2px rgba(0, 0, 0, 0.034)'
              }}
            >
              <Card.Img variant="top" src={image1} />
              <Card.Body>
                <Card.Title className="d-flex">
                  <div
                    className="res-circle mt-1 mr-1"
                    style={{ marginLeft: '-20px' }}
                  >
                    <div className="circle-txt">1</div>
                  </div>
                  <div className="sub-title">
                    Focus on the most important thing: the best teachers
                  </div>
                </Card.Title>
                <Card.Text className="sub-text">
                  The most important thing is to have a really good teacher and
                  we focus on finding the best. Only a few get the job and they
                  get solid education & coaching.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card
              style={{
                width: '97%',
                border: 0,
                boxShadow: '0 2.8px 2.2px rgba(0, 0, 0, 0.034)',
                borderRadius: '5px'
              }}
            >
              <Card.Img variant="top" src={image2} />
              <Card.Body>
                <Card.Title className="d-flex">
                  <div
                    className="res-circle mt-1 mr-1"
                    style={{ marginLeft: '-20px' }}
                  >
                    <div className="circle-txt">2</div>
                  </div>
                  <div className="sub-title">
                    Focus on the most important thing: the best teachers
                  </div>
                </Card.Title>
                <Card.Text className="sub-text">
                  The most important thing is to have a really good teacher and
                  we focus on finding the best. Only a few get the job and they
                  get solid education & coaching.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card
              style={{
                width: '97%',
                border: 0,
                boxShadow: '0 2.8px 2.2px rgba(0, 0, 0, 0.034)',
                borderRadius: '5px'
              }}
            >
              <Card.Img variant="top" src={image3} />
              <Card.Body>
                <Card.Title className="d-flex">
                  <div
                    className="res-circle mt-1 mr-1"
                    style={{ marginLeft: '-20px' }}
                  >
                    <div className="circle-txt">3</div>
                  </div>
                  <div className="sub-title">
                    Focus on the most important thing: the best teachers
                  </div>
                </Card.Title>
                <Card.Text className="sub-text">
                  The most important thing is to have a really good teacher and
                  we focus on finding the best. Only a few get the job and they
                  get solid education & coaching.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default ServiceFocus
