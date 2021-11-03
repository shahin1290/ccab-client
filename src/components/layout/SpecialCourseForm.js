import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import { createJob } from "../../redux/actions/jobAction";
import Loader from "./Loader";
import Message from "./Message";
import { useForm } from "react-hook-form";

const SpecialCourseForm = () => {
  const dispatch = useDispatch();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const [formStep, setFormStep] = useState(0);

  const completeFormStep = () => {
    setFormStep((cur) => cur + 1);
  };

  const renderButton = () => {
    if (formStep > 2) {
      return undefined;
    } else if (formStep === 2) {
      return (
        <button
          className=' pt-3 pb-3 text-white form-group col-lg-12 col-md-12 col-sm-12'
          type='submit'
          disabled={!isValid}
        >
          Send
        </button>
      );
    } else {
      return (
        <button
          onClick={completeFormStep}
          className=' pt-3 pb-3 form-group col-lg-12 col-md-12 col-sm-12 btn  btn-lg'
          type='button'
          disabled={!isValid}
        >
          Next Step
        </button>
      );
    }
  };

  const { success, loading, error } = useSelector((state) => state.jobCreate);

  /* useEffect(() => {
    if (success) {
      setRes("Request sent Successfully");
    }
  }, [success]); */
  /* 
  useEffect(() => {
    const timer = setTimeout(() => {
      setRes("");
      setName("");
      setEmail("");
      setMessage("");
      setPhone("");
      setSubject("");
      setDoc("");
      setCv("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [res]); */

  const submitHandler = (values) => {
    const { name, email, phone, position, message } = values;
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("phone", phone);
    data.append("position", position);
    data.append("message", message);
    data.append("cv_path", values.cv[0]);
    data.append("doc_path", values.doc[0]);

    dispatch(createJob(data));

    completeFormStep();
  };

  return (
    <section className='  mb-5'>
      <div className='auto-container'>
        <Row className=''>
          <Col md={6} className='pr-5'>
            <div className='sub-title text-danger text-center-small-screen pb-3'>
              CONTACT DETAILS
            </div>
            <div className='title text-center-small-screen pb-3'>
              Apply For An Internship
            </div>
            <p className='sub-text text-center-small-screen mb-5'>
              We know that anyone can learn to Code, all you need to do is to
              take the First Step. Contact us!
            </p>
            <Row className='address'>
              <Col md={2} className='job-icon'>
                <i className='fas fa-map-marker-alt'></i>
              </Col>

              <Col>
                <div className='sub-title'>Address</div>
                <div className='sub-text'>
                  Röntgenvägen 1 141 52, Huddinge, Stockholm, Sweden
                </div>
              </Col>
            </Row>
            <Row className='address mb-3'>
              <Col md={2} className='job-icon'>
                <i class='far fa-envelope'></i>
              </Col>

              <Col>
                <div className='sub-title'>E-mail</div>
                <div className='sub-text'>
                  Mail:{" "}
                  <span style={{ color: "#fe4a55", fontWeight: "bold" }}>
                    info@codifycollege.se
                  </span>
                </div>
              </Col>
            </Row>

            <Row className='address mb-3'>
              <Col md={2} className='job-icon'>
                <i class='fas fa-phone-volume'></i>
              </Col>

              <Col>
                <div className='sub-title'>Contact</div>
                <div className='sub-text'>
                  Mobile:{" "}
                  <span style={{ color: "#fe4a55", fontWeight: "bold" }}>
                    +46-72 33 33 8 99
                  </span>
                </div>
              </Col>
            </Row>
            <Row className='address'>
              <Col md={2} className='job-icon'>
                <i class='far fa-clock'></i>
              </Col>

              <Col>
                <div className='sub-title'>Hours of Operation</div>
                <div className='sub-text'>
                  Mon - Fri: 09:00am - 05:00pm Sunday: 09:00am - 05:00pm
                  Saturday: Closed
                </div>
              </Col>
            </Row>
          </Col>
          <Col
            md={6}
            className='job-contact mt-3 text-center-small-screen p-3 mb-2'
          >
            <div className='title pb-1 '>Ready to Get Started?</div>
            <div className='sub-text'>
              Your email address will not be published. Required fields are
              marked *
            </div>

            {/* Login Form */}

            <form
              onSubmit={handleSubmit(submitHandler)}
              className='styled-form col-lg-12 col-md-12 col-sm-12'
            >
              {formStep < 3 && (
                <div className='sub-title m-3'>Step {formStep + 1} of 3</div>
              )}
              {formStep >= 0 && (
                <section className={formStep === 0 ? "d-block" : "d-none"}>
                  {/* Form Group */}
                  <div className='form-group col-lg-12 col-md-12 col-sm-12'>
                    <label className='text-white'>Your Name *</label>
                    <input
                      type='text'
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Please type your name",
                        },
                      })}
                    />
                    {errors.name && (
                      <p className='text-warning'>{errors.name.message}</p>
                    )}
                  </div>
                  {/* Form Group */}
                  <div className='form-group col-lg-12 col-md-12 col-sm-12'>
                    <label className='text text-white'>Your Email *</label>
                    <input
                      type='email'
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Please type your email",
                        },
                      })}
                    />

                    {errors.email && (
                      <p className='text-warning'>{errors.email.message}</p>
                    )}
                  </div>
                  {/* Form Group */}
                  <div className='form-group col-lg-12 col-md-12 col-sm-12'>
                    <label className='text text-white'>
                      Your Phone Number *
                    </label>
                    <input
                      type='text'
                      {...register("phone", {
                        required: {
                          value: true,
                          message: "Please type your Phone Number",
                        },
                      })}
                    />
                    {errors.phone && (
                      <p className='text-warning'>{errors.phone.message}</p>
                    )}
                  </div>
                </section>
              )}

              {formStep >= 1 && (
                <section className={formStep === 1 ? "d-block" : "d-none"}>
                  {/* Form Group */}
                  <div className='form-group col-lg-12 col-md-12 col-sm-12'>
                    <label className='text text-white'>Position *</label>
                    <input
                      type='text'
                      {...register("position", {
                        required: {
                          value: true,
                          message: "Please type your position",
                        },
                      })}
                    />
                    {errors.position && (
                      <p className='text-warning'>{errors.position.message}</p>
                    )}
                  </div>

                  {/* Form Group */}
                  <div className='form-group col-lg-12 col-md-12 col-sm-12'>
                    <label className='text text-white'>Upload your CV *</label>
                    <input
                      type='file'
                      {...register("cv", {
                        required: {
                          value: true,
                          message: "Please upload the cv",
                        },
                      })}
                    />
                    {errors.cv && (
                      <p className='text-warning'>{errors.cv.message}</p>
                    )}
                  </div>

                  {/* Form Group */}
                  <div className='form-group col-lg-12 col-md-12 col-sm-12'>
                    <label className='text text-white'>Other Documents</label>
                    <input type='file' {...register("doc")} />
                  </div>
                </section>
              )}

              {formStep >= 2 && (
                <section className={formStep === 2 ? "d-block" : "d-none"}>
                  {" "}
                  {/* Form Group */}
                  <div className='form-group col-lg-12 col-md-12 col-sm-12'>
                    <label className='text text-white'>Message</label>
                    <textarea type='text' {...register("message")} />
                  </div>
                </section>
              )}

              {loading && <Loader />}
              {error && <Message>{error}</Message>}

              {success && <Message>Request sent Successfully</Message>}

              {formStep < 2 && (
                <button
                  onClick={completeFormStep}
                  className='ml-4 form-group col-lg-11 col-md-11 col-sm-11 btn '
                  type='button'
                  disabled={!isValid}
                >
                  Next Step
                </button>
              )}

              {formStep === 2 && (
                <button
                  className='ml-4 form-group col-lg-11 col-md-11 col-sm-11 btn '
                  type='submit'
                  disabled={!isValid}
                >
                  Send
                </button>
              )}
            </form>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default SpecialCourseForm;
