import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import DayContent from "../layout/DayContent";
import {
  Collapse,
  Tabs,
  Tab,
  ButtonGroup,
  Button,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";

import { getDayVideoList } from "../../redux/actions/dayAction";

import Compiler from "../layout/Compiler";
import {
  createDailyActivity,
  updateDailyActivity,
} from "../../redux/actions/dailyActivityAction";

export default function CourseContentScreen({ match }) {
  const id = match.params.id;
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [language, setLanguage] = useState();
  const [lastVideo, setLastVideo] = useState(false);

  //redux store
  const { day } = useSelector((state) => state.dayDetails);

  const { userDetail } = useSelector((state) => state.userLogin);


  const { course } = useSelector((state) => state.courseDetails);

  const { dayVideoList } = useSelector((state) => state.dayVideoList);

  //use effects
  useEffect(() => {
    if (day) {
      setLanguage(day.video_path ? "english" : "arabic");
    }
  }, [day]);

  useEffect(() => {
    dispatch(getDayVideoList(id));
    if (updateSuccess) {
      dispatch(getWatchingLectures(id));
    }

   
  }, [updateSuccess, userDetail]);

  useEffect(() => {
    if (ref.current) {
      ref.current.plyr.once("ended", () => {

        dispatch(updateDailyActivity({ dayId: day._id }, id));
        setShowModal(true);
      });

      ref.current.plyr.once("playing", () => {
        dispatch(
          createDailyActivity(
            {
              dayId: day._id,
              weekId: day.week,
              duration: ref.current.plyr.duration,
            },
            id
          )
        );
      });
    }
  }, [day._id]);

  //functions
  const findElementText = (el, sectionName) => {
    if (day.name) {
      const sections = day.sections;

      const filteredSection = sections.filter(
        (section) => section.name === sectionName
      );

      if (filteredSection.length > 0) {
        const elementType = filteredSection[0].source_code.find(
          (a) => a.element_type === el
        );
        if (elementType) {
          return elementType.element_text;
        } else {
          return null;
        }
      }
    }
  };

  const _playNextVideo = () => {
    const videoIds =
      dayVideoList &&
      dayVideoList.length > 0 &&
      dayVideoList.map((dayVideo) => dayVideo._id);

    const currentIndex = videoIds.indexOf(day._id);

    if (currentIndex + 1 < videoIds.length) {
      document.getElementById(videoIds[currentIndex + 1]).click();
    }

    if (currentIndex + 2 === videoIds.length) {
      setLastVideo(true);
    }

    setShowModal(false);
    /* const btn = document.querySelectorAll('[data-plyr="play"]')[0]

    btn.click() */
  };

  return (
    <>
      {/* Intro Section */}
      <section className="intro-section-two">
        <div
          className="patern-layer-one paroller"
          data-paroller-factor="0.40"
          data-paroller-factor-lg="0.20"
          data-paroller-type="foreground"
          data-paroller-direction="vertical"
          style={{ backgroundImage: "url(images/icons/icon-1.png)" }}
        ></div>
        <div
          className="patern-layer-two paroller"
          data-paroller-factor="0.40"
          data-paroller-factor-lg="-0.20"
          data-paroller-type="foreground"
          data-paroller-direction="vertical"
          style={{ backgroundImage: "url(images/icons/icon-2.png)" }}
        ></div>
        <div className="circle-one"></div>
        <div className="p-2">
          <div className="inner-container">
            <div className="row clearfix">
              {/* Accordian Column */}
              <div className="accordian-column col-lg-3 col-md-12 col-sm-12">
                <div className="inner-column sticky-top">
                  <div className="title2 p-2 d-flex justify-content-between">
                    <div>
                      <div className="sub-title p-2 text-center">
                        {course && course.name}
                        <hr />
                      </div>
                    
                    </div>
                    <a
                      onClick={() => setOpen(!open)}
                      aria-controls="example-collapse-text"
                      aria-expanded={open}
                      className="hide-on-big-screen "
                    >
                      <i class="fas fa-bars"></i>
                    </a>
                  </div>

                  <div className="hide-on-small-screen">
                    <DayContent bootcampId={id} />
                  </div>

                  <Collapse in={open}>
                    <div id="example-collapse-text">
                      <DayContent bootcampId={id} setOpen={setOpen} />
                    </div>
                  </Collapse>
                </div>
              </div>
              {/* Content Column */}
              <div className="content-column col-lg-9 col-md-12 col-sm-12">
                {day.name ? (
                  <div className="inner-column">
                    <div className="title mb-3 pt-3">{day.name}</div>
                    <ButtonGroup aria-label="Basic example">
                      <Button
                        variant={
                          language === "english" ? "warning" : "secondary"
                        }
                        className="mr-2 mb-3"
                        onClick={() => setLanguage("english")}
                        disabled={!day.video_path}
                      >
                        English
                      </Button>
                      <Button
                        variant={
                          language === "arabic" ? "warning" : "secondary"
                        }
                        className="mr-2 mb-3"
                        onClick={() => setLanguage("arabic")}
                        disabled={!day.arabic_video_path}
                      >
                        Arabic
                      </Button>
                    </ButtonGroup>
                    <Button
                      variant={
                        language === "playcode" ? "warning" : "secondary"
                      }
                      className="mr-2 mb-3 pull-right"
                      onClick={() => setLanguage("playcode")}
                    >
                      Playcode
                    </Button>

                    {language === "playcode" ? (
                      <Compiler />
                    ) : (
                      <div className="course-video-box">
                        <Plyr
                          source={{
                            type: "video",
                            sources: [
                              {
                                src:
                                  day.video_path && language === "english"
                                    ? day.video_path
                                    : day.arabic_video_path,
                                provider: "youtube",
                              },
                            ],
                          }}
                          ref={ref}
                        />
                      </div>
                    )}

                    {/* show modal on video ended */}
                    <Modal
                      show={showModal}
                      onHide={() => setShowModal(false)}
                      centered
                    >
                      <Modal.Body className=" m-auto title p-5 ">
                        Good Job! Keep going!
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </Button>

                        {!lastVideo && (
                          <Button variant="danger" onClick={_playNextVideo}>
                            Play next
                          </Button>
                        )}
                      </Modal.Footer>
                    </Modal>

                    {/* Intro Info Tabs*/}
                    <div className="intro-info-tabs">
                      {/* Intro Tabs*/}
                      <div className="intro-tabs tabs-box">
                        {/*Tab Btns*/}
                        <Tabs defaultActiveKey="Content">
                          <Tab eventKey="Content" title="Content">
                            {day.name &&
                              day.sections.map((section) => (
                                <div className="tabs-content p-3">
                                  <div className="content">
                                    {findElementText("title", section.name) && (
                                      <div className="title pb-2">
                                        {findElementText("title", section.name)}
                                      </div>
                                    )}

                                    {findElementText(
                                      "description",
                                      section.name
                                    ) && (
                                      <div className="sub-text  mb-3">
                                        {findElementText(
                                          "description",
                                          section.name
                                        )}
                                      </div>
                                    )}

                                    {findElementText("image", section.name) && (
                                      <img
                                        src={`http://localhost:5001/uploads/Source_Code/${findElementText(
                                          "image",
                                          section.name
                                        )}`}
                                        alt="img"
                                        className="img-fluid row"
                                        style={{
                                          filter:
                                            "drop-shadow(0 0 0.75rem #B8B8B8)",
                                          maxWidth: "90%",
                                          margin: " auto",
                                        }}
                                      />
                                    )}

                                    {findElementText("code", section.name) && (
                                      <div className="mt-5 mb-5">
                                        <pre>
                                          <code>
                                            {findElementText(
                                              "code",
                                              section.name
                                            )}
                                          </code>
                                        </pre>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                          </Tab>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="sec-title style-two">
                    <div className="title">Welcome to Course Content</div>
                    <div className="sub-text">
                      Please navigate to the side menu to see the daily content
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End intro Courses */}
    </>
  );
}
