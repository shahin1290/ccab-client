import React ,{useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import image1 from "../../assets/images/services/whiteboard1.png";
import image2 from "../../assets/images/services/file.jpeg";
import image3 from "../../assets/images/services/fun.jpg";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

const ServiceAssistance = () => {
  useEffect(()=>{
    AOS.init();
  },[])
  return (
    <section className=''>
      <div className='auto-container bg-white '>
        <Row className='service-focus pr-3'>
          <Col data-aos="flip-left" data-aos-delay="1000" md={4} xs={12} className="text-center-small-screen">
            <Card
              style={{
                height: "420px",
                border: 0,
                boxShadow: "0 2.8px 2.2px rgba(0, 0, 0, 0.034)",
              }}
            >
              <Card.Img variant='top' src={image1} />
              <Card.Body>
                <Card.Title className='d-flex'>
                  <div className='sub-title text-center-small-screen'>Shared Whiteboard</div>
                </Card.Title>
                <Card.Text className='sub-text'>
                  Draw, annotate, heighlight, making notes have been easier. A
                  versatile whiteboard that enable you to transform the lesson
                  into a simulating learning journey.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col  data-aos="flip-left" data-aos-delay="1500" md={4} xs={12} className="text-center-small-screen">
            <Card
              style={{
                height: "420px",
                border: 0,
                boxShadow: "0 2.8px 2.2px rgba(0, 0, 0, 0.034)",
                borderRadius: "5px",
              }}
            >
              <Card.Img variant='top' src={image2} />
              <Card.Body>
                <Card.Title className='d-flex'>
                  <div className='sub-title text-center-small-screen'>Secured File Sharing</div>
                </Card.Title>
                <Card.Text className='sub-text'>
                  No worries on missing your notes or homework ever again.
                  Revision and review your homework in centralized document that
                  save you tons of hassle.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col data-aos="flip-left" data-aos-delay="2000" md={4} xs={12} className="text-center-small-screen">
            <Card
              style={{
                height: "420px",
                border: 0,
                boxShadow: "0 2.8px 2.2px rgba(0, 0, 0, 0.034)",
                borderRadius: "5px",
              }}
            >
              <Card.Img variant='top' src={image3} />
              <Card.Body>
                <Card.Title className='d-flex'>
                  <div className='sub-title text-center-small-screen'>Fun Learning</div>
                </Card.Title>
                <Card.Text className='sub-text'>
                  Quiz games that make learning fun.
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
