import React from 'react'
import { Row, Col } from 'react-bootstrap'

const RatingSection = () => {
  const switchUpRatting = 4.6
  const facebookRating = 4.7
  const googleRating = 4.8
  const courseReportRating = 4.3

  return (
    <section
      style={{
        backgroundColor: '#fff',
        position: 'relative',
        padding: '40px'
      }}
    >
      <div className="auto-container">
     
        <div className="row clearfix ">
          <div className="text-center col-lg-3 col-md-6 col-sm-12 pb-3">
            <img src="images/switchup.png" className="w-25 pt-5" />
            <div className="sub-text">{switchUpRatting}/5 Rating</div>

            <div className="star-ratings-sprite">
              <span
                style={{
                  width: ` ${Math.round((switchUpRatting / 5) * 100)}%`
                }}
                className="star-ratings-sprite-rating"
              ></span>
            </div>
          </div>

          <div className=" text-center col-lg-3 col-md-6 col-sm-12 pb-3">
            <img src="images/facebook.png" className="w-25 pt-5 " />
            <div className="sub-text">{facebookRating}/5 Rating</div>
            <div className="star-ratings-sprite">
              <span
                style={{
                  width: ` ${Math.round((facebookRating / 5) * 100)}%`
                }}
                className="star-ratings-sprite-rating"
              ></span>
            </div>
          </div>

          <div className=" text-center col-lg-3 col-md-6 col-sm-12 pb-3">
          <img src="images/google.png"  className="w-25 pt-5"/>
            <div className="sub-text">{googleRating}/5 Rating</div>
            <div className="star-ratings-sprite">
              <span
                style={{
                  width: ` ${Math.round((googleRating / 5) * 100)}%`
                }}
                className="star-ratings-sprite-rating"
              ></span>
            </div>
          </div>

          <div className=" text-center col-lg-3 col-md-6 col-sm-12 pb-3">
            <img src="images/coursereport.png" className="w-25 pt-5" />
            <div className="sub-text">{courseReportRating}/5 Rating</div>
            <div className="star-ratings-sprite">
              <span
                style={{
                  width: ` ${Math.round((courseReportRating / 5) * 100)}%`
                }}
                className="star-ratings-sprite-rating"
              ></span>
            </div>
          </div>
        </div>
      </div>
     
    </section>
  )
}

export default RatingSection
