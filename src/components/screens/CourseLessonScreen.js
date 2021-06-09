import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getWeekList } from '../../redux/actions/weekAction'
import DayContent from '../layout/DayContent'
import { Card, Tabs, Tab, Accordion } from 'react-bootstrap'
import { getDayList } from '../../redux/actions/dayAction'
import Plyr from 'plyr-react'
import 'plyr-react/dist/plyr.css'

export default function CourseContentScreen({ match }) {
  const dispatch = useDispatch()
  const id = match.params.id

  //redux store
  const { weekList, loading, error } = useSelector((state) => state.weekList)
  const { day } = useSelector((state) => state.dayDetails)

  //use effec
  useEffect(() => {
    dispatch(getWeekList(id))
  }, [dispatch, id])

  //functions
  const findElementText = (el, sectionName) => {
    if (day.name) {
      const sections = day.sections

      const filteredSection = sections.filter(
        (section) => section.name === sectionName
      )

      if (filteredSection.length > 0) {
        const elementType = filteredSection[0].source_code.find(
          (a) => a.element_type === el
        )
        if (elementType) {
          return elementType.element_text
        } else {
          return null
        }
      }
    }
  }

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
          style={{ backgroundImage: 'url(images/icons/icon-1.png)' }}
        ></div>
        <div
          className="patern-layer-two paroller"
          data-paroller-factor="0.40"
          data-paroller-factor-lg="-0.20"
          data-paroller-type="foreground"
          data-paroller-direction="vertical"
          style={{ backgroundImage: 'url(images/icons/icon-2.png)' }}
        ></div>
        <div className="circle-one"></div>
        <div className="auto-container">
          <div className="inner-container">
            <div className="title mb-3">{day.name}</div>
            <div className="row clearfix">
              {/* Content Column */}
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                {day.name ? (
                  <div className="inner-column">
                    <div className="course-video-box">
                      <Plyr
                        source={{
                          type: 'video',
                          sources: [
                            {
                              src: day.video_path,
                              provider: 'youtube'
                            }
                          ]
                        }}
                        options={
                          {
                            /* ... */
                          }
                        }
                      />
                    </div>

                    {/* Intro Info Tabs*/}
                    <div className="intro-info-tabs">
                      {/* Intro Tabs*/}
                      <div className="intro-tabs tabs-box">
                        {/*Tab Btns*/}
                        <Tabs defaultActiveKey="Content">
                          <Tab eventKey="Content" title="Content">
                            {day.name &&
                              day.sections.map((section) => (
                                <div
                                  className="tabs-content"
                                  style={{ padding: '0 15px' }}
                                >
                                  <div className="content">
                                    {findElementText('title', section.name) && (
                                      <div
                                        className="sub-title pt-4 pb-4"
                                        style={{ whiteSpace: 'pre;' }}
                                      >
                                        {findElementText('title', section.name)}
                                      </div>
                                    )}

                                    {findElementText(
                                      'description',
                                      section.name
                                    ) && (
                                      <div className="sub-text mb-5">
                                        {findElementText(
                                          'description',
                                          section.name
                                        )}
                                      </div>
                                    )}

                                    {findElementText('image', section.name) && (
                                      <img
                                        src={`http://localhost:5001/uploads/Source_Code/${findElementText(
                                          'image',
                                          section.name
                                        )}`}
                                        alt="img"
                                      />
                                    )}

                                    {findElementText('code', section.name) && (
                                      <div
                                        className="sub-text lessontext mb-5"
                                        style={{
                                          width: '80%',
                                          margin: '20px auto',
                                          fontSize: '16px',
                                          padding: '10px',
                                          backgroundColor: '#F5F5F5'
                                        }}
                                      >
                                        {findElementText('code', section.name)}
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

              {/* Accordian Column */}
              <div className="accordian-column col-lg-4 col-md-12 col-sm-12">
                <div className="inner-column sticky-top">
                  <div className="title">Table of contents</div>
                  {/* Accordion Box */}
                  <Accordion
                    style={{ height: '500px', overflowY: 'scroll' }}
                    className="accordion-box style-two"
                  >
                    {weekList.map((week, index) => (
                      <Card className="accordion block">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey={`${index}`}
                          className="acc-btn"
                          onClick={() => dispatch(getDayList(week._id))}
                        >
                          {week.name}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={`${index}`}>
                          <DayContent
                            weekId={week._id}
                            bootcampId={week.bootcamp}
                          />
                        </Accordion.Collapse>
                      </Card>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End intro Courses */}
    </>
  )
}
