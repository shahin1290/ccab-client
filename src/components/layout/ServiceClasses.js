import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const ServiceClasses = () => {
  return (
    <section style={{ background: "transparent" }}>
      <div className='auto-container' style={{ background: "#fff" }}>
        <Row className="pt-1">
          <Col md={4} xs={12} >
      {/* <div className='auto-container' style={{ background: "#fff" ,zIndex:'-3' }}>
        <Row className="px-5 py-2">
          <Col md={4} xs={8} className="text-center-small-screen"> */}
            <Card
              style={{
                height: "380px",
                width: "100%",
                borderRadius: "10px",
                zIndex:1
              }}
            >
              <Card.Body className='p-3'>
                <Card.Title className='d-flex'>
                  <div className='sub-title'>Elementary Classes</div>
                </Card.Title>
                <Card.Text className='sub-text'>
                  <div className='d-flex'>
                    <div className='shape shape2 bg-info'>
                      <i
                        className='fas fa-square-root-alt p-2'
                        style={{ color: "#DCDCDC", fontSize: "13px" }}
                      ></i>
                    </div>
                    <span className='sub-text pl-2 pt-1 mb-1'>MATHMATICS</span>
                  </div>
                  <div className='d-flex'>
                    <div
                      className='shape shape1'
                      style={{ background: "#9370db" }}
                    >
                      <i
                        className='fas fa-book p-2'
                        style={{ color: "#DCDCDC", fontSize: "13px" }}
                      ></i>
                    </div>
                    <span className='sub-text pl-2 pt-1 mb-1'>ENGLISH</span>
                  </div>
                  <div className='d-flex'>
                    <div className='shape shape3 bg-danger'>
                      <i
                        className='fas fa-flask p-2'
                        style={{ color: "#DCDCDC", fontSize: "13px" }}
                      ></i>
                    </div>
                    <span className='sub-text pl-2 pt-1 mb-1'>
                      SCIENCE AND TECH
                    </span>
                  </div>
                  <div className='d-flex'>
                    <div
                      className='shape shape2'
                      style={{ background: "#9370db" }}
                    >
                      <i
                        className='fas fa-book p-2'
                        style={{ color: "#DCDCDC", fontSize: "13px" }}
                      ></i>
                    </div>
                    <span className='sub-text pl-2 pt-1 mb-1'>ARABIC</span>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} xs={12} className="text-center-small-screen">
            <Card
              style={{
                height: "380px",
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0 2.8px 2.2px rgba(0, 0, 0, 0.034)",
                zIndex:1
              }}
            >
              <Card.Body className='p-3'>
                <Card.Title>
                  <div className='sub-title text-secondary'>Junior Classes</div>
                </Card.Title>
                <Card.Text className='sub-text'>
                  <div className='d-flex'>
                    <div className='shape shape2 bg-info'>
                      <i
                        className='fas fa-square-root-alt p-2'
                        style={{ color: "#DCDCDC", fontSize: "13px" }}
                      ></i>
                    </div>
                    <span className='sub-text pl-2 pt-1 mb-1'>
                      JUNIOR MATHMATICS
                    </span>
                  </div>
                  <div className='d-flex'>
                    <div
                      className='shape shape1'
                      style={{ background: "#9370db" }}
                    >
                      <i
                        className='fas fa-flask p-2'
                        style={{ color: "#DCDCDC", fontSize: "13px" }}
                      ></i>
                    </div>
                    <span className='sub-text pl-2 pt-1 mb-1 '>ENGLISH</span>
                  </div>
                  <div className='d-flex'>
                    <div className='shape shape3 bg-danger'>
                      <i
                        className='fas fa-atom p-2'
                        style={{ color: "#DCDCDC", fontSize: "13px" }}
                      ></i>
                    </div>
                    <span className='sub-text pl-2 pt-1 mb-1'>
                      BASIC SCIENCE
                    </span>
                  </div>
                  <div className='d-flex'>
                    <div className='shape shape2 bg-success'>
                      <i
                        className='fas fa-cog p-2'
                        style={{ color: "#DCDCDC", fontSize: "13px" }}
                      ></i>
                    </div>
                    <span className='sub-text pl-2 pt-1 mb-1'>BASIC TECH</span>
                  </div>

                  <div className='d-flex'>
                    <div className='shape shape2 bg-warning'>
                      <i
                        className='fas fa-print p-2'
                        style={{ color: "#DCDCDC", fontSize: "13px" }}
                      ></i>
                    </div>
                    <span className='sub-text pl-2 pt-1 mb-1'>
                      BUSSINESS STUDIES
                    </span>
                  </div>
                  <div className='d-flex'>
                    <div
                      className='shape shape2'
                      style={{ background: "#9370db" }}
                    >
                      <i
                        className='fas fa-book p-2'
                        style={{ color: "#DCDCDC", fontSize: "13px" }}
                      ></i>
                    </div>
                    <span className='sub-text pl-2 pt-1 mb-1'>ARABIC</span>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} xs={12} className="text-center-small-screen">
            <Card
              style={{
                height: "380px",
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0 2.8px 2.2px rgba(0, 0, 0, 0.034)",
                zIndex:1
              }}
            >
              <Card.Body className='p-3'>
                <Card.Title>
                  <div className='sub-title'>Senior Classes</div>
                </Card.Title>
                <Card.Text className='sub-text'>
                  <div className='d-flex'>
                    <div className='shape shape2 bg-info'>
                      <i
                        className='fas fa-flask p-2'
                        style={{ color: "#DCDCDC", fontSize: "13px" }}
                      ></i>
                    </div>
                    <span className='sub-text pl-2 pt-1 mb-1'>MATHMATICS</span>
                  </div>
                  <div className='d-flex'>
                    <div
                      className='shape shape1'
                      style={{ background: "#9370db" }}
                    >
                      <i
                        className='fas fa-flask p-2'
                        style={{ color: "#DCDCDC", fontSize: "13px" }}
                      ></i>
                    </div>
                    <span className='sub-text pl-2 pt-1 mb-1'>ENGLISH</span>
                  </div>
                  <div className='d-flex'>
                    <div className='shape shape3 bg-danger'>
                      <i
                        className='fas fa-book p-2'
                        style={{ color: "#DCDCDC", fontSize: "13px" }}
                      ></i>
                    </div>
                    <span className='sub-text pl-2 pt-1 mb-1'>CHEMISTRY</span>
                  </div>
                  <div className='d-flex'>
                    <div className='shape shape3 bg-info'>
                      <i
                        className='fas fa-flask p-2'
                        style={{ color: "#DCDCDC", fontSize: "13px" }}
                      ></i>
                    </div>
                    <span className='sub-text pl-2 pt-1 mb-1'>BIOLOGY</span>
                  </div>
                  <div className='d-flex'>
                    <div className='shape shape3 bg-success'>
                      <i
                        className='fas fa-microscope p-2'
                        style={{ color: "#DCDCDC", fontSize: "13px" }}
                      ></i>
                    </div>
                    <span className='sub-text pl-2 pt-1 mb-1'>PHYSICS</span>
                  </div>
                  <div className='d-flex'>
                    <div
                      className='shape shape2'
                      style={{ background: "#9370db" }}
                    >
                      <i
                        className='fas fa-book p-2'
                        style={{ color: "#DCDCDC", fontSize: "13px" }}
                      ></i>
                    </div>
                    <span className='sub-text pl-2 pt-1 mb-1'>ARABIC</span>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ServiceClasses;
