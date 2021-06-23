import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import DayContent from '../layout/DayContent'
import { Collapse, Tabs, Tab, ButtonGroup, Button } from 'react-bootstrap'
import Plyr from 'plyr-react'
import 'plyr-react/dist/plyr.css'

export default function CourseContentScreen({ match }) {
  const id = match.params.id
  const [open, setOpen] = useState(false)
 

  //redux store
  const { day } = useSelector((state) => state.dayDetails)



  const [language, setLanguage] = useState('')

  useEffect(() => {
    if(day){
      setLanguage(day.video_path?'english':'arabic')
    }

  }, [day]);

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
        <div className="p-2">
          <div className="inner-container">
            <div className="row clearfix">
              {/* Accordian Column */}
              <div className="accordian-column col-lg-3 col-md-12 col-sm-12">
                <div className="inner-column sticky-top">
                  <div className="title2 p-2 d-flex justify-content-between">
                    Course Content{' '}
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
                          language === 'english' ? 'warning' : 'secondary'
                        }
                        className="mr-2 mb-3"
                        onClick={() => setLanguage('english')}
                        disabled={!day.video_path}
                      >
                        English
                      </Button>
                      <Button
                        variant={
                          language === 'arabic' ? 'warning' : 'secondary'
                        }
                        className="mr-2 mb-3"
                        onClick={() => setLanguage('arabic')}
                        disabled={!day.arabic_video_path}
                      >
                        Arabic
                      </Button>
                    </ButtonGroup>

                    {day.arabic_video_path && language === 'arabic' && (
                      <div className="course-video-box">
                        <Plyr
                          source={{
                            type: 'video',
                            sources: [
                              {
                                src: day.arabic_video_path,
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
                    )}
                    {day.video_path && language === 'english' && (
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
                    )}

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
                                    {findElementText('title', section.name) && (
                                      <div className="title pb-2">
                                        {findElementText('title', section.name)}
                                      </div>
                                    )}

                                    {findElementText(
                                      'description',
                                      section.name
                                    ) && (
                                      <div className="sub-text  mb-3">
                                        {findElementText(
                                          'description',
                                          section.name
                                        )}
                                      </div>
                                    )}

                                    {findElementText('image', section.name) && (
                                      <img
                                        src={`https://server.ccab.tech/uploads/Source_Code/${findElementText(
                                          'image',
                                          section.name
                                        )}`}
                                        alt="img"
                                        className="img-fluid row"
                                        style={{
                                          filter:
                                            'drop-shadow(0 0 0.75rem #B8B8B8)',
                                          maxWidth: '90%',
                                          margin: ' auto'
                                        }}
                                      />
                                    )}

                                    {findElementText('code', section.name) && (
                                      <div className="mt-5 mb-5">
                                        <pre>
                                          <code>
                                            {findElementText(
                                              'code',
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
  )
}
