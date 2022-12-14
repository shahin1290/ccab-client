import React,{useEffect} from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
 
const RatingSection = () => {
  const switchUpRatting = 4.6
  const facebookRating = 4.7
  const googleRating = 4.8
  const trustpilot = 4


  useEffect(()=>{
    AOS.init();
  },[])
  
  return (
    <section
      style={{
        backgroundColor: "#fff",
        position: "relative",
        padding: "40px",
      }}
    >
      <div className="auto-container">
        <div className="row clearfix ">
          <div
            data-aos="flip-left"
            data-aos-delay="100"
            className="text-center col-lg-3 col-md-6 col-sm-12 pb-3"
          >
            <img alt="ccab" src="images/switchup.png" className="w-25 pt-5" />
            <div className="sub-text">{switchUpRatting}/5 Rating</div>

            <div className="star-ratings-sprite">
              <span
                style={{
                  width: ` ${Math.round((switchUpRatting / 5) * 100)}%`,
                }}
                className="star-ratings-sprite-rating"
              ></span>
            </div>
          </div>

          <div
            data-aos="flip-left"
            data-aos-delay="300"
            className=" text-center col-lg-3 col-md-6 col-sm-12 pb-3"
          >
            <img alt="ccab" src="images/facebook.png" className="w-25 pt-5 " />
            <div className="sub-text">{facebookRating}/5 Rating</div>
            <div className="star-ratings-sprite">
              <span
                style={{
                  width: ` ${Math.round((facebookRating / 5) * 100)}%`,
                }}
                className="star-ratings-sprite-rating"
              ></span>
            </div>
          </div>

          <div
            data-aos="flip-left"
            data-aos-delay="500"
            className=" text-center col-lg-3 col-md-6 col-sm-12 pb-3"
          >
            <img alt="ccab" src="images/google.png" className="w-25 pt-5" />
            <div className="sub-text">{googleRating}/5 Rating</div>
            <div className="star-ratings-sprite">
              <span
                style={{
                  width: ` ${Math.round((googleRating / 5) * 100)}%`,
                }}
                className="star-ratings-sprite-rating"
              ></span>
            </div>
          </div>

          <div
            data-aos="flip-left"
            data-aos-delay="700"
            className=" text-center col-lg-3 col-md-6 col-sm-12 pb-3"
          >
            <img alt="ccab" src="images/trustpilot.jpg" className="w-25 pt-5" />
            <div className="sub-text">{trustpilot}/5 Rating</div>
            <div className="star-ratings-sprite">
              <span
                style={{
                  width: ` ${Math.round((trustpilot / 5) * 100)}%`,
                }}
                className="star-ratings-sprite-rating"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RatingSection
