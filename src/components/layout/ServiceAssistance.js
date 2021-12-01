import React, { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import image1 from "../../assets/images/services/whiteboard1.png";
import image2 from "../../assets/images/services/file.jpeg";
import image3 from "../../assets/images/services/mentor.jpeg";
import image4 from "../../assets/images/services/fun.jpg";

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

const ServiceAssistance = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section className=''>
      <div className='auto-container bg-white '>
        <Row className='service-focus'>
          <Col
            data-aos='flip-left'
            data-aos-delay='200'
            md={3}
            xs={12}
            className='text-center-small-screen'
          >
            <Card
              style={{
                height: "550px",
                border: 0,
                boxShadow: "0 2.8px 2.2px rgba(0, 0, 0, 0.034)",
              }}
            >
              <Card.Img variant='top' src={image1} />
              <Card.Body>
                <Card.Title className='d-flex'>
                  <div className='sub-title text-center-small-screen'>
                    Learn full-stack from the comfort of your own home
                  </div>
                </Card.Title>
                <Card.Text className='sub-text'>
                  Get access to all of the course's core contents, including
                  both text and video lessons.  Begin learning at your own pace
                  from the first day of the Bootcamp, extending the course
                  duration as needed.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col
            data-aos='flip-left'
            data-aos-delay='500'
            md={3}
            xs={12}
            className='text-center-small-screen'
          >
            <Card
              style={{
                height: "550px",
                border: 0,
                boxShadow: "0 2.8px 2.2px rgba(0, 0, 0, 0.034)",
                borderRadius: "5px",
              }}
            >
              <Card.Img variant='top' src={image2} />
              <Card.Body>
                <Card.Title className='d-flex'>
                  <div className='sub-title text-center-small-screen'>
                    Flexible schedule Completely
                  </div>
                </Card.Title>
                <Card.Text className='sub-text'>
                  We provide support via a support portal, chat, and provide
                  comments on your progress.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col
            data-aos='flip-left'
            data-aos-delay='600'
            md={3}
            xs={12}
            className='text-center-small-screen'
          >
            <Card
              style={{
                height: "550px",
                border: 0,
                boxShadow: "0 2.8px 2.2px rgba(0, 0, 0, 0.034)",
                borderRadius: "5px",
              }}
            >
              <Card.Img variant='top' src={image3} />
              <Card.Body>
                <Card.Title className='d-flex'>
                  <div className='sub-title text-center-small-screen'>
                    personal 1:1 sessions with mentors
                  </div>
                </Card.Title>
                <Card.Text className='sub-text'>
                  Schedule weekly 1:1 appointments with your mentor to work
                  through any current challenges, obtain additional
                  explanations, and ask any concerns you may have.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col
            data-aos='flip-left'
            data-aos-delay='600'
            md={3}
            xs={12}
            className='text-center-small-screen'
          >
            <Card
              style={{
                height: "550px",
                border: 0,
                boxShadow: "0 2.8px 2.2px rgba(0, 0, 0, 0.034)",
                borderRadius: "5px",
              }}
            >
              <Card.Img variant='top' src={image4} />
              <Card.Body>
                <Card.Title className='d-flex'>
                  <div className='sub-title text-center-small-screen'>
                    For code-related questions, there is a support platform
                  </div>
                </Card.Title>
                <Card.Text className='sub-text'>
                  The curriculum, projects, exercises, and outcomes are
                  identical to the boot camp's in-person version.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ServiceAssistance;
