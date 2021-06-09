import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getWeekList } from '../../../redux/actions/weekAction'
import MentorDayContent from '../../layout/MentorDayContent'
import { Card, Container, Accordion } from 'react-bootstrap'
import { getDayList } from '../../../redux/actions/dayAction'

export default function ManageMentorScreen({ match }) {
  const dispatch = useDispatch()

  const id = match.params.id
  const { weekList, loading, error } = useSelector((state) => state.weekList)
  

  useEffect(() => {
    dispatch(getWeekList(id))
  }, [dispatch, id])
  return (
    <>
      <section className="login-nav-section">
        <div className="auto-container"></div>
      </section>
      {/*End Page Title*/}
      {/* Intro Section */}
      <Container style={{ marginBottom: '200px' }}>
        {/* Accordian Column */}
        <div className="title mb-4">Table of contents</div>
        {/* Accordion Box */}
        <Accordion className="accordion-box style-two">
          {weekList.map((week, index) => (
            <Card className="accordion block">
              <Accordion.Toggle
                as={Card.Header}
                eventKey={`${index}`}
                className="acc-btn"
                style={{ display: 'flex', justifyContent: 'space-between' }}
                onClick={() => dispatch(getDayList(week._id))}
              >
                <div className="pr-5">{week.name}</div>

                
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={`${index}`}>
                <MentorDayContent weekId={week._id} bootcampId={week.bootcamp} />
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </Container>
      {/* End intro Courses */}
    </>
  )
}