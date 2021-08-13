import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import image1 from '../../assets/images/header/image-1.jpg'

const ServiceFocus = () => {
  return (
    <section className="mb-5" style={{ background: '#FAFAFA' }}>
      <div className="auto-container">
        <div className="title pt-5 pb-5 text-center">
          {' '}
          Homework help for all subjects & ages, throughout Sweden
        </div>
        <Row className="service-focus">
          <Col md={4}>
            <Card
              style={{
                width: '23rem',
                border: 0,
                boxShadow: '0 2.8px 2.2px rgba(0, 0, 0, 0.034)',
              }}
            >
              <Card.Img variant="top" src={image1} />
              <Card.Body>
                <Card.Title>
                  Focus on the most important thing: the best teachers
                </Card.Title>
                <Card.Text>
                  The most important thing is to have a really good teacher and
                  we focus on finding the best. Only a few get the job and they
                  get solid education & coaching.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              style={{
                width: '23rem',
                border: 0,
                boxShadow: '0 2.8px 2.2px rgba(0, 0, 0, 0.034)',
                borderRadius: '5px'
              }}
            >
              <Card.Img variant="top" src={image1} />
              <Card.Body>
                <Card.Title>
                  Focus on the most important thing: the best teachers
                </Card.Title>
                <Card.Text>
                  The most important thing is to have a really good teacher and
                  we focus on finding the best. Only a few get the job and they
                  get solid education & coaching.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              style={{
                width: '23rem',
                border: 0,
                boxShadow: '0 2.8px 2.2px rgba(0, 0, 0, 0.034)',
                borderRadius: '5px'
              }}
            >
              <Card.Img variant="top" src={image1} />
              <Card.Body>
                <Card.Title>
                  Focus on the most important thing: the best teachers
                </Card.Title>
                <Card.Text>
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
