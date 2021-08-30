import React, {useEffect} from 'react'
import CountUp from 'react-countup'
import { useSelector, useDispatch } from 'react-redux'
import { getUesrsNumbers } from './../../redux/actions/userAction'


const AchievementSection = () => {
  const dispatch = useDispatch()
  const { courseList, loading, error } = useSelector(
    (state) => state.courseList
  )

  const { userDetail } = useSelector((state) => state.userLogin)

  const { usersCount } = useSelector((state) => state.userNumbers)

  useEffect(() => {
    dispatch(getUesrsNumbers())
  }, [dispatch])
  return (
    <section className="achievements-section-two">
          {/* Pattern Layer */}
          <div
            className="pattern-layer"
            style={{ backgroundImage: 'url(images/background/pattern-1.png)' }}
          />
          <div className="auto-container">
            {/* Sec Title */}
            <div className="sec-title style-two light centered mb-5">
              <h2>Our achievements</h2>
            </div>
            {/* Fact Counter */}
            <div className="fact-counter-two ">
              <div className="row clearfix">
                {/* Column */}
                <div className="column counter-column col-lg-4 col-md-6 col-sm-12">
                  <div
                    className="inner wow fadeInLeft"
                    data-wow-delay="0ms"
                    data-wow-duration="1500ms"
                  >
                    <div className="content">
                      <div className="icon-box">
                        <span className="icon flaticon-course" />
                      </div>
                      <h4 className="counter-title">Total Courses</h4>
                      <div className="count-outer count-box">
                        <CountUp
                          start={-2}
                          end={courseList.length}
                          duration={2.75}
                          separator=" "
                          decimal=","
                          suffix="+"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Column */}
                <div className="column counter-column col-lg-4 col-md-6 col-sm-12">
                  <div
                    className="inner wow fadeInUp"
                    data-wow-delay="0ms"
                    data-wow-duration="1500ms"
                  >
                    <div className="content">
                      <div className="icon-box">
                        <span className="icon flaticon-course-1" />
                      </div>
                      <h4 className="counter-title">Total Student</h4>
                      <div className="count-outer count-box alternate">
                        <CountUp
                          start={-2}
                          end={usersCount ? usersCount : 0}
                          duration={2.75}
                          separator=" "
                          decimal=","
                          suffix="+"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Column */}
                <div className="column counter-column col-lg-4 col-md-6 col-sm-12">
                  <div
                    className="inner wow fadeInRight"
                    data-wow-delay="0ms"
                    data-wow-duration="1500ms"
                  >
                    <div className="content">
                      <div className="icon-box">
                        <span className="icon flaticon-world" />
                      </div>
                      <h4 className="counter-title">Global Position</h4>
                      <div className="count-outer count-box">
                        <CountUp
                          start={-2}
                          end={4}
                          duration={1.5}
                          separator=" "
                          decimal=","
                          suffix="+"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  )
}

export default AchievementSection
