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
      <Container>
        {/* Accordian Column */}
        <div className="title mt-5 mb-5">Manage Course Content</div>
        {/* Accordion Box */}

        <MentorDayContent bootcampId={id} />
      </Container>
      {/* End intro Courses */}
    </>
  )
}
