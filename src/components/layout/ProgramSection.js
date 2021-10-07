import React from 'react'
import image4 from './../../assets/images/image-4.png'

const ProgramSection = () => {
  return (
    <section className="program-section mt-5 ">
          <div className="auto-container">
     
            <div className="row clearfix" style={{paddingBottom:0, marginBottom:0}}>

                            {/* Content Column */}
              <div className="content-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column text-center">
                  {/* <div className="title">Who is this course for?</div>
                  <hr className="block-seperator mt-4" /> */}
                  <div className='sec-title style-two centered'>
                          <div className='title'>
                            Who is this course for?
                          </div>
                          <hr className='block-seperator mb-3' />
                          <div className='text'>
                            Register yourself now and get real employabe skills that top
                            companies want.
                          </div>
                          <div className="sub-text">
                              If you're looking to transition to a career as a
                              developer, or add a tech stack to your existing skill,
                              then this course is for you.
                            </div>
                            <div className="sub-text">
                              If you're looking for the most efficient way to learn,
                              come this way
                          </div>
                        </div>

                  {/* <a
                    activeclassName="active"
                    className="theme-btn btn-style-three"
                    href="https://meetings.hubspot.com/sl-melad"
                  >
                    <span className="txt">Book an Interview</span>
                  </a> */}
                </div>
              </div>

              {/* Image Column */}
              <div className="image-column col-lg-6 col-md-12 col-sm-12 whoSection">
                <div className="inner-column">
                  <div className="image titlt" data-tilt data-tilt-max={4}>
                    <img src={image4} />
                  </div>
                </div>
              </div>


            </div>
          </div>
        </section>
  )
}

export default ProgramSection
