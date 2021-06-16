import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import {
  getCourseDetails,
  deleteCourse,
  createCourse
} from '../../redux/actions/courseAction'
import { getOrder } from '../../redux/actions/orderAction'

import Message from '../layout/Message'
import Loader from '../layout/Loader'
import ModalVideo from 'react-modal-video'
import { createCurrrency } from '../../redux/actions/currencyAction'
import { getPriceFormat } from '../../util/priceFormat'

export default function CourseDetailScreen({ match }) {
  const ID = match.params.id
  const dispatch = useDispatch()

  // user must be logged in before!!!
  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin

  const {
    order,
    loading: getOrderLoading,
    error: getOrderError
  } = useSelector((state) => state.getOrderView)

  const { course, loading, error } = useSelector((state) => state.courseDetails)
  const {
    loading: currencyLoading,
    success: currencySuccess,
    currency
  } = useSelector((state) => state.currencyCreate)

  const [isOpen, setOpen] = useState(false)

  const [countryName, setcountryName] = useState('')
  const [countryCode, setcountryCode] = useState('')
  const [countryLang, setcountryLang] = useState('')
  const [showKlarnaImg, setShowKlarmaImg] = useState(false)
  const [countryCurrency, setCountryCurrency] = useState('')

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await axios.get('https://ipapi.co/json/')

      validateCounrty(response.data.country_name, response.data.languages)
    }

    fetchMyAPI()

    dispatch(createCurrrency())
  }, [])

  useEffect(() => {
    dispatch(getCourseDetails(ID))

    // get order for this course
    dispatch(getOrder(ID))
  }, [dispatch, ID])

  //console.log(countryName);
  // validate the user country
  const validateCounrty = (countryName, countryLang) => {
    console.log('Validate Country ')
    let KlaranCountry = [
      { name: 'Austria', code: 'de_at', lang: 'de' },
      { name: 'Belgium', code: 'fr_be', lang: 'fr' },
      { name: 'Belgium', code: 'nl_be', lang: 'nl' },
      { name: 'Denmark', code: 'da_dk', lang: 'da' },
      { name: 'Finland', code: 'fi_fi', lang: 'fi' },
      { name: 'France', code: 'fr_fr', lang: 'fr' },
      { name: 'Germany', code: 'de_de', lang: 'de' },
      { name: 'Italy', code: 'it_it', lang: 'it' },
      { name: 'Netherlands', code: 'nl_nl', lang: 'nl' },
      { name: 'Norway', code: 'nb_no', lang: 'nb' },
      { name: 'Poland', code: 'pl_pl', lang: 'pl' },
      { name: 'Spain', code: 'es_es', lang: 'es' },
      { name: 'Sweden', code: 'sv_se', lang: 'sv' },
      { name: 'Switzerland', code: 'fr_ch', lang: 'fr' },
      { name: 'Switzerland ', code: 'de_ch', lang: 'de' },
      { name: 'Switzerland ', code: 'it_ch', lang: 'it' },
      { name: 'United Kingdom	', code: 'en_gb', lang: 'en' },
      { name: 'United States', code: 'en_us', lang: 'en' }
      //{name:'Lithuania',code:'lt_ru',lang:'ru'},
    ]

    for (let i of KlaranCountry) {
      if (i.name == countryName && countryLang.indexOf(i.lang) !== -1) {
        setcountryCode(i.code)
        setShowKlarmaImg(true)
      }
    }
  }

  const getVideoID = (VideoPath) => {
    return VideoPath.slice(32)
  }
  //console.log(course)
  return (
    <>
      {/* Intro Courses */}
      <section className="intro-section">
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
          {loading ? (
            <Loader />
          ) : error ? (
            <Message>{error}</Message>
          ) : course.name ? (
            <div>
              <div className="sec-title">
                <h2>{course.name}</h2>
              </div>

              <div className="inner-container">
                <div className="row clearfix">
                  {/* Content Column */}
                  <div className="content-column col-lg-8 col-md-12 col-sm-12">
                    <div className="inner-column">
                      {/* Intro Info Tabs*/}
                      <div className="intro-info-tabs">
                        {/* Intro Tabs*/}
                        <div className="intro-tabs tabs-box">
                          {/*Tab Btns*/}
                          <ul className="tab-btns tab-buttons clearfix">
                            <li
                              data-tab="#prod-overview"
                              className="tab-btn active-btn"
                            >
                              Overview
                            </li>
                          </ul>

                          {/*Tabs Container*/}
                          <div className="tabs-content">
                            {/*Tab / Active Tab*/}
                            <div className="tab active-tab" id="prod-overview">
                              <div className="content">
                                {/* Cource Overview */}
                                <div className="course-overview">
                                  <div className="inner-box">
                                    <h4>About the Course</h4>
                                    <p>{course.description}</p>

                                    <ul className="student-list">
                                      <li className="text-dark bg-warning p-2 rounded ">
                                        {course.seats < 99
                                          ? course.seats -
                                            course.students.length
                                          : 'unlimited'}{' '}
                                        Seats available
                                      </li>
                                      <li className="text-dark bg-success p-2 rounded ">
                                        {course.weeks * 5} lectures{' '}
                                      </li>
                                    </ul>
                                    {course.info_list.length ? (
                                      course.info_list.map((item) => {
                                        return (
                                          <div key={item.title}>
                                            <h3>{item.title}</h3>
                                            <ul className="review-list">
                                              {item.items.map((itemList) => {
                                                return (
                                                  <li key={itemList.content}>
                                                    {itemList.content}
                                                  </li>
                                                )
                                              })}
                                            </ul>
                                          </div>
                                        )
                                      })
                                    ) : (
                                      <p className="p-2 text-warning">
                                        There is no Requirements
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video Column */}

                 
                    <div className="video-column col-lg-4 col-md-12 col-sm-12">
                    {currencyLoading ? (
                    <Loader />
                  ) : (
                      <div className="inner-column sticky-top">
                        {/* Video Box */}
                        <div
                          className="intro-video"
                          style={{
                            backgroundImage:
                              'url(https://server.ccab.tech/uploads/Bootcamp/' +
                              course.img_path +
                              ')'
                          }}
                        >
                          <a
                            className="lightbox-image intro-video-box"
                            onClick={() => setOpen(true)}
                          >
                            <span className="fa fa-play">
                              <i className="ripple"></i>
                            </span>
                          </a>

                          <ModalVideo
                            channel="youtube"
                            autoplay
                            isOpen={isOpen}
                            videoId={getVideoID(course.video_path)}
                            onClose={() => setOpen(false)}
                          />
                          <h4>Preview this course</h4>
                        </div>

                        {/* End Video Box */}

                        {/* <div className="time-left">
                        23 hours left at this price!
                      </div> */}
                        {order && order.course ? (
                          <a
                            href={'/course-content/' + course._id}
                            className="mt-4 theme-btn btn-style-three"
                          >
                            <span className="txt">
                              GO TO Course<i className="fa fa-angle-right"></i>
                            </span>
                          </a>
                        ) : (
                          <>
                            <div className="price mb-3">
                              {currencySuccess &&
                                (course.price > 0
                                  ? `${getPriceFormat(
                                      currency.data.amount * course.price
                                    )}  ${currency.data.currency}`
                                  : 'Free Course ')}
                            </div>
                            <a
                              href={
                                !userDetail.token
                                  ? '/login'
                                  : course.price > 0
                                  ? '/checkout/' + course._id
                                  : '/course-content/' + course._id
                              }
                              className="theme-btn btn-style-three"
                            >
                              <span className="txt">
                                Enroll now <i className="fa fa-angle-right"></i>
                              </span>
                            </a>
                            <div
                              style={{
                                margin: '10px auto 0 auto',
                                width: '60%'
                              }}
                            >
                              <img
                                width="23%"
                                className="pr-2"
                                src="https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.png"
                              />
                              <img
                                width="75%"
                                src="https://cdn.jotfor.ms/images/credit-card-logo.png"
                              />
                            </div>
                          </>
                        )}
                      </div>
                      )}
                    </div>
                 
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
      {/* End intro Courses */}

      {/* Call To Action Section Two */}
      {!userDetail.token ? (
        <section
          className="call-to-action-section-two"
          style={{ backgroundImage: 'url(images/background/3.png)' }}
        >
          <div className="auto-container">
            <div className="content">
              <h2 className=" text-dark">Ready to get started?</h2>
              <div className="text text-dark">
                Replenish him third creature and meat blessed void a fruit
                gathered you’re, they’re two <br /> waters own morning gathered
                greater shall had behold had seed.
              </div>
              <div className="buttons-box">
                <a href="/get-start" className="theme-btn btn-style-one">
                  <span className="txt">
                    Get Stared <i className="fa fa-angle-right"></i>
                  </span>
                </a>
                <a href="/courses-grid" className="theme-btn btn-style-two">
                  <span className="txt">
                    All Courses <i className="fa fa-angle-right"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : null}
      {/* End Call To Action Section Two */}
    </>
  )
}
