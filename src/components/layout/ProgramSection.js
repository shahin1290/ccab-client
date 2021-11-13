import React ,{useEffect} from 'react'
import image4 from './../../assets/images/image-4.png'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
 
const ProgramSection = () => {
  useEffect(()=>{
    AOS.init();
  },[])
  
  return (
    <section className="program-section mt-5 ">
          <div className="auto-container">
     
            <div className="row clearfix" style={{paddingBottom:0, marginBottom:0 , overflow:'hidden'}}>

                            {/* Content Column */}
             

              {/* Image Column */}
              {/* <div data-aos="zoom-out-down" className="image-column col-lg-6 col-md-12 col-sm-12 whoSection">
                <div className="inner-column">
                  <div className="image titlt" data-tilt data-tilt-max={4}>
                    <img src={image4} />
                  </div>
                </div>
              </div> */}
          <div className="text-center col-lg-6 col-md-6 col-sm-12">
          <div className="inner-column">
                  <div className="image titlt" data-tilt data-tilt-max={4}>
                    <img src={image4} />
                  </div>
                </div>
            {/* End Video Section Two */}
          </div>

              <div className="col-lg-6 col-md-6 col-sm-12">
              <div className='title text-center '>
                          Career support
                          </div>
                          <hr className='block-seperator mb-3' />
                  <div className="sub-title pb-3 pt-3 ">
                  Register yourself now and get real employabe skills that top
                                  companies want.
                  </div>
                  
                  <div className="sub-text pb-5 ">
                      CV writing. 
                      Technical Interviews / Mock Interviews.
                      Personal Development Program
                      Portfolioing.
                      Networking Events.
                  </div>
                  <div className="sub-text">
                      If you're looking to transition to a career as a
                      developer, or add a tech stack to your existing skill,
                      then <span style={{color :'#ec4c16'}}>FullStack course </span>is for you.
                  </div>
             </div>


            </div>
          </div>
        </section>
  )
}

export default ProgramSection
