import React, { useEffect  , useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import {
  getCourseDetails,
  deleteCourse,
  createCourse
} from '../../redux/actions/courseAction'
import Message from '../layout/Message'
import Loader from '../layout/Loader'
import ModalVideo from 'react-modal-video'

export default function CourseDetailScreen({ match }) {
  const ID = match.params.id
  const dispatch = useDispatch()

  // user must be logged in before!!!
  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin

  const { course, loading, error } = useSelector((state) => state.courseDetails)
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    dispatch(getCourseDetails(ID))
    getGeoInfo()
    if (validateCounrty())
      setShowKlarmaImg(true)
      
    console.log(course);
  }, [dispatch, ID])

  const [countryName,setcountryName]=useState('');
  const [countryCode,setcountryCode]=useState('');
  const [countryLang,setcountryLang]=useState('');
  const [ showKlarnaImg , setShowKlarmaImg]=useState('');

  // get the user ip info 
  const getGeoInfo = () => {
    axios.get('https://ipapi.co/json/').then((response) => {
        let data = response.data;
      //  console.log(data);
          setcountryName(data.country_name) 
          
          setcountryLang(data.languages)
        
    }).catch((error) => {
        console.log(error);
    });
};
//console.log(countryName);
// validate the user country
  const validateCounrty = ()=>{
      let KlaranCountry = [
        {name:'Austria',code:'de_at',lang:'de'},
        {name:'Belgium',code:'fr_be',lang:'fr'},
        {name:'Belgium',code:'nl_be',lang:'nl'},
        {name:'Denmark',code:'da_dk',lang:'da'},
        {name:'Finland',code:'fi_fi',lang:'fi'},
        {name:'France',code:'fr_fr',lang:'fr'},
        {name:'Germany',code:'de_de',lang:'de'},
        {name:'Italy',code:'it_it',lang:'it'},
        {name:'Netherlands',code:'nl_nl',lang:'nl'},
        {name:'Norway',code:'nb_no',lang:'nb'},
        {name:'Poland',code:'pl_pl',lang:'pl'},
        {name:'Spain',code:'es_es',lang:'es'},
        {name:'Sweden',code:'sv_se',lang:'sv'},
        {name:'Switzerland',code:'fr_ch',lang:'fr'},
        {name:'Switzerland ',code:'de_ch',lang:'de'},
        {name:'Switzerland ',code:'it_ch',lang:'it'},
        {name:'United Kingdom	',code:'en_gb',lang:'en'},
        {name:'United States',code:'en_us',lang:'en'},
        {name:'Lithuania',code:'lt_ru',lang:'ru'},
      ]
      let i ; 
      for (i of KlaranCountry ){
        if ( (i.name == countryName && countryLang.indexOf(i.lang) !== -1 )  ){
          setcountryCode(i.code) 
          return true;
        }
      }
  }
 // console.log(validateCounrty());
/*
Austria	de_at
Belgium (french)	fr_be
Belgium (dutch)	nl_be
Denmark	da_dk
Finland	fi_fi
France	fr_fr
Germany	de_de
Italy	it_it
Netherlands	nl_nl
Norway	nb_no
Poland	pl_pl
Spain	es_es
Sweden	sv_se
Switzerland (french)	fr_ch
Switzerland (german)	de_ch
Switzerland (italian)	it_ch
United Kingdom	en_gb
United States	en_us*/
  const getVideoID = (VideoPath)=>{
        return VideoPath.slice(32)
  }
console.log(course)
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
                                      <li className="text-dark bg-warning p-2 rounded ">{course.seats < 99 ?course.seats - course.students.length : 'unlimited'} Seats available</li>
                                      <li className="text-dark bg-success p-2 rounded ">{course.weeks*5} lectures </li>
                                    </ul>
                                    {course.info_list.length?
                                    course.info_list.map((item)=>{
                                      return(
                                        <>
                                        <h3>{item.title}</h3>
                                        <ul className="review-list">
                                         { item.items.map((itemList)=>{
                                            return(
                                              <li>{itemList.content}</li>
                                            )
                                          })}
                                        </ul>
                                        </>
                                      )
                                    }):<p className="p-2 text-warning">There is no Requirements</p>}
                 
                        
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
                    <div className="inner-column sticky-top">
                      {/* Video Box */}
                      <div
                        className="intro-video"
                        style={{
                          backgroundImage:
                            'url(https://server.ccab.tech/uploads/Bootcamp/'+course.img_path+')'
                        }}
                      >
                        <a
                         
                          className="lightbox-image intro-video-box"
                          onClick={()=> setOpen(true)}
                        >
                          <span className="fa fa-play">
                            <i className="ripple"></i>
                          </span>
                        </a>

                        <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={ getVideoID(course.video_path)} onClose={() => setOpen(false)} />
                        <h4>Preview this course</h4>
                      </div>

                     
                      {/* End Video Box */}
                      <div className="price"> {course.price >0? '$'+(course.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'):'Free Course '}</div>
                      {/* <div className="time-left">
                        23 hours left at this price!
                      </div> */}

                      <a href={!userDetail.token?'/login' :course.price >0?"https://meetings.hubspot.com/sl-melad":'/course-content/'+course._id} className="theme-btn btn-style-three">
                        <span className="txt">
                          Inroll now <i className="fa fa-angle-right"></i>
                        </span>
                      </a>
                      <div className="my-2 mt-4">
                        {showKlarnaImg?
                        <img src={`https://cdn.klarna.com/1.0/shared/image/generic/badge/${countryCode}/checkout/long-blue.png?width=440`}/>
                        :null
                        }
                      
                      </div>
                    </div>
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
