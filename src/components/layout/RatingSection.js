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
        padding: '70px 0'
      }}
    >
      <div className="auto-container text-center">
        <Row>
          <Col md={{ span: 1, offset: 1 }}>
            <img src="images/switchup.png" />
            <div className="sub-text">{switchUpRatting}/5 Rating</div>

            <div class="star-ratings-sprite">
              <span
                style={{
                  width: ` ${Math.round((switchUpRatting / 5) * 100)}%`
                }}
                class="star-ratings-sprite-rating"
              ></span>
            </div>
          </Col>
          <Col md={{ span: 1, offset: 2 }}>
            <img src="images/facebook.png" />
            <div className="sub-text">{facebookRating}/5 Rating</div>
            <div class="star-ratings-sprite">
              <span
                style={{
                  width: ` ${Math.round((facebookRating / 5) * 100)}%`
                }}
                class="star-ratings-sprite-rating"
              ></span>
            </div>
          </Col>
          <Col md={{ span: 1, offset: 2 }}>
            <img src="images/google.png" />
            <div className="sub-text">{googleRating}/5 Rating</div>
            <div class="star-ratings-sprite">
              <span
                style={{
                  width: ` ${Math.round((googleRating / 5) * 100)}%`
                }}
                class="star-ratings-sprite-rating"
              ></span>
            </div>
          </Col>
          <Col md={{ span: 1, offset: 2 }}>
            <img src="images/coursereport.png" />
            <div className="sub-text">{courseReportRating}/5 Rating</div>
            <div class="star-ratings-sprite">
              <span
                style={{
                  width: ` ${Math.round((courseReportRating / 5) * 100)}%`
                }}
                class="star-ratings-sprite-rating"
              ></span>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default RatingSection
