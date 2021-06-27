import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { getServiceDetails } from '../../redux/actions/serviceAction'
import { getOrder } from '../../redux/actions/orderAction'
import Message from '../layout/Message'
import Loader from '../layout/Loader'
import { createCurrrency } from '../../redux/actions/currencyAction'
import { getPriceFormat } from '../../util/priceFormat'

export default function ServiceDetailScreen({ match }) {
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

  const { service, loading, error } = useSelector(
    (state) => state.serviceDetails
  )
  // get Users list reducer
  const {
    users,
    loading: getUsersLoading,
    error: getUsersError
  } = useSelector((state) => state.userList)

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
  const [Mentor, setMentor] = useState({})
  const [selectedInsructor, setSelectedInstructor] = useState('')

  // select mentor
  const _handleSelectMentor = (arr) => {
    setMentor({ _id: arr[0], name: arr[1] })
  }

  //get the bio of selected Instructor
  const selectedInstructorBio = () => {
    if (service) {
      const foundInstructor =
        service.instructors &&
        service.instructors.find(
          (instructor) => instructor._id === selectedInsructor
        )

      if (foundInstructor) {
        return {
          name: foundInstructor.name,
          networkAddresses: foundInstructor.networkAddresses,
          bio: foundInstructor.bio,
          skills: foundInstructor.skills
        }
      }
    }
  }

  selectedInstructorBio()

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await axios.get('https://ipapi.co/json/')

      validateCounrty(response.data.country_name, response.data.languages)
    }

    fetchMyAPI()

    dispatch(createCurrrency())
  }, [])

  useEffect(() => {
    if (service.name) {
      setSelectedInstructor(service.instructors[0]._id)
    }
  }, [service])

  useEffect(() => {
    dispatch(getServiceDetails(ID))

    // get order for this service
    dispatch(getOrder(ID))
  }, [dispatch, ID])

  //console.log(countryName);
  // validate the user country
  const validateCounrty = (countryName, countryLang) => {
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
  //console.log(service)
  return (
    <>
      {/* Intro services */}
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
          ) : service.name ? (
            <div>
              <div className="sec-title">
                <h2>{service.name}</h2>
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
                                    <h4>About the service</h4>
                                    <p>{service.description}</p>

                                    <ul className="student-list">
                                      <li className="text-dark bg-warning p-2 rounded ">
                                        {service.seats < 99
                                          ? service.seats -
                                            service.students.length
                                          : 'unlimited'}{' '}
                                        Seats available
                                      </li>
                                      <li className="text-dark bg-success p-2 rounded ">
                                        {service.weeks * 5} lectures{' '}
                                      </li>
                                    </ul>
                                    {service.info_list.length ? (
                                      service.info_list.map((item) => {
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
                        {/* Intro Tabs*/}
                        <div className="sub-title p-4">Instructors</div>
                        <div className="intro-tabs tabs-box mt-3">
                          {/*Tab Btns*/}
                          <ul className="tab-btns tab-buttons clearfix">
                            {service.name &&
                              service.instructors.length &&
                              service.instructors.map((instructor) => (
                                <li
                                  data-tab="#prod-overview"
                                  className="tab-btn"
                                  onClick={() =>
                                    setSelectedInstructor(instructor._id)
                                  }
                                  style={{
                                    backgroundColor:
                                      instructor._id === selectedInsructor
                                        ? '#EA5573'
                                        : ''
                                  }}
                                >
                                  <a>
                                    <div className="logo-image">
                                      <img
                                        src={
                                          instructor.avatar
                                            ? `http://localhost:5001/uploads/Avatar/${instructor.avatar}`
                                            : '/images/resource/avatar.svg'
                                        }
                                        alt="avatar"
                                      />
                                    </div>
                                  </a>
                                </li>
                              ))}
                          </ul>

                          {/*Tabs Container*/}
                          <div className="tabs-content">
                            {/*Tab / Active Tab*/}
                            <div className="tab active-tab" id="prod-overview">
                              <div className="content">
                                {/* Cource Overview */}
                                <div className="course-overview">
                                  <div className="inner-box">
                                    <div className="title">
                                      {selectedInstructorBio() &&
                                        selectedInstructorBio().name}
                                    </div>
                                    <div className=" col-lg-9 col-md-6 col-sm-12">
                                      <div className=" logo-widget">
                                        <div className="social-box">
                                          {selectedInstructorBio() &&
                                            selectedInstructorBio()
                                              .networkAddresses &&
                                            selectedInstructorBio()
                                              .networkAddresses.length > 0 &&
                                            selectedInstructorBio().networkAddresses.map(
                                              (networkAddress) => (
                                                <>
                                                  {networkAddress.network ===
                                                    'facebook' && (
                                                    <a
                                                      href={
                                                        networkAddress.address
                                                      }
                                                      className="fa fa-facebook p-2"
                                                      style={{
                                                        color: '#3b5998'
                                                      }}
                                                    />
                                                  )}

                                                  {networkAddress.network ===
                                                    'twitter' && (
                                                    <a
                                                      href={
                                                        networkAddress.address
                                                      }
                                                      className="fa fa-twitter p-2"
                                                      style={{
                                                        color: '#1DA1F2'
                                                      }}
                                                    />
                                                  )}

                                                  {networkAddress.network ===
                                                    'linkedin' && (
                                                    <a
                                                      href={
                                                        networkAddress.address
                                                      }
                                                      className="fa fa-linkedin p-2"
                                                      style={{
                                                        color: '#0A66C2'
                                                      }}
                                                    />
                                                  )}

                                                  {networkAddress.network ===
                                                    'github' && (
                                                    <a
                                                      href={
                                                        networkAddress.address
                                                      }
                                                      className="fa fa-github p-2"
                                                    />
                                                  )}
                                                </>
                                              )
                                            )}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="mt-5 mb-5">
                                      <div className="sub-title">
                                        About{' '}
                                        <span>
                                          {selectedInstructorBio() &&
                                            selectedInstructorBio().name}
                                        </span>{' '}
                                      </div>
                                      <hr />

                                      <div className="sub-text">
                                        {selectedInstructorBio() &&
                                          selectedInstructorBio().bio}
                                      </div>
                                    </div>

                                    <div className="sub-title">Skills</div>
                                    <hr />

                                    {selectedInstructorBio() &&
                                      selectedInstructorBio().skills &&
                                      selectedInstructorBio().skills.length >
                                        0 &&
                                      selectedInstructorBio().skills.map(
                                        (skill) => (
                                          <div className="sub-text">
                                            {skill}
                                          </div>
                                        )
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
                              'url(http://localhost:5001/uploads/Service/' +
                              service.img_path +
                              ')'
                          }}
                        ></div>

                        {order && order.service ? (
                          <a
                            href={'/service-content/' + service._id}
                            className="mt-4 theme-btn btn-style-three"
                          >
                            <span className="txt">
                              GO TO service<i className="fa fa-angle-right"></i>
                            </span>
                          </a>
                        ) : (
                          <>
                            <div>
                              {currencySuccess &&
                                (service.price > 0 ? (
                                  <div className="price mb-3">
                                    {` ${
                                      currency.data.currency
                                    } ${getPriceFormat(
                                      Math.round(
                                        currency.data.amount * service.price
                                      )
                                    )} `}
                                    <div className="sub-title">
                                      (per session)
                                    </div>
                                  </div>
                                ) : (
                                  'Free service '
                                ))}
                              {/* Service Form */}
                              <div className="option-cource-box">
                                <div className="">
                                  <div className="form-group mb-2">
                                    <div className="sub-title mb-2">
                                      {' '}
                                      Instructor
                                    </div>
                                    {service.name &&
                                      !service.instructors.length && (
                                        <p className="text-warning bg-light p-1">
                                          * There is no Instructor User
                                        </p>
                                      )}
                                    {/* <span className="select-category">Select a category</span> */}
                                    <select
                                      className="custom-select-box px-2"
                                      onChange={(e) => {
                                        _handleSelectMentor(
                                          e.target.value.split(',')
                                        )
                                      }}
                                    >
                                      <option value="" disabled selected>
                                        Choose Instructor{' '}
                                      </option>
                                      {service.name &&
                                        service.instructors.length &&
                                        service.instructors.map(
                                          (instructor) => {
                                            return (
                                              <option
                                                value={[
                                                  instructor._id,
                                                  instructor.name
                                                ]}
                                                key={instructor._id}
                                              >
                                                {instructor.name}
                                                {instructor.user_type ==
                                                  'AdminUser' && ' (Admin)'}
                                              </option>
                                            )
                                          }
                                        )}
                                    </select>

                                    <div className="my-3">
                                      {Mentor.name ? (
                                        <span className="rounded-pill  px-2 py-1 m-2 bg-light">
                                          <i className="fas fa-plus-circle text-success"></i>{' '}
                                          {Mentor.name}
                                        </span>
                                      ) : (
                                        <p className="text-warning bg-light p-1">
                                          * Nothing Selected
                                        </p>
                                      )}
                                    </div>

                                    {/* Divider */}
                                    <div className="border my-1"></div>
                                    {/* ******************* */}
                                    <div className="form-group">
                                      <div className="sub-title mb-2">
                                        Set Session Numbers :
                                      </div>

                                      <div className="item-quantity">
                                        <input
                                          className="quantity-spinner"
                                          type="number"
                                          min="0"
                                          name="quantity"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <a
                              href={
                                !userDetail.token
                                  ? '/login'
                                  : service.price > 0
                                  ? '/checkout/' + service._id
                                  : '/service-content/' + service._id
                              }
                              className="theme-btn btn-style-three mt-2"
                            >
                              <span className="txt">
                                Book now <i className="fa fa-angle-right"></i>
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
      {/* End intro services */}

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
                <a href="/services-grid" className="theme-btn btn-style-two">
                  <span className="txt">
                    All services <i className="fa fa-angle-right"></i>
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
