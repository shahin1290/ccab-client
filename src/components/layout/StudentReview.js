import React from 'react'

const StudentReview = () => {
  const facebookRating = 5
  return (
    <div>
      <div className="py-5">
        <div className="auto-container">
          <div className="sub-title pb-4 text-center">Reviews By Students</div>
          <div className="row hidden-md-up">
            <div className="col-md-4">
              <div className="card shadow bg-white rounded pt-4 px-4 " style={{height:"320px"}}>
                <div className="card-block">
                  <div className="d-flex">
                    <div className="sub-title">Jose I.</div>
                    <div className="star-ratings-sprite">
                      <span
                        style={{
                          width: ` ${Math.round((facebookRating / 5) * 100)}%`
                        }}
                        className="star-ratings-sprite-rating"
                      ></span>
                    </div>
                  </div>

                  <p className="sub-text3 pt-3">
                    Codify college full stack developer course helped me hone my
                    skill and switch careers thanks to high-quality coursework,
                    video lectures, With live Mentoring and hands-on projects.
                    It was an amazing experience going through the program and I
                    will highly recommend it to anybody.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow bg-white rounded  px-4 pt-4" style={{height:"320px"}}>
                <div className="card-block">
                  <div className="d-flex">
                    <div className="sub-title">Trevor C.</div>
                    <div className="star-ratings-sprite">
                      <span
                        style={{
                          width: ` ${Math.round((facebookRating / 5) * 100)}%`
                        }}
                        className="star-ratings-sprite-rating"
                      ></span>
                    </div>
                  </div>

                  <p className="sub-text3 pt-3">
                    So far, the program is going great! I really appreciate a
                    lot all the help I have received from the mentors. They are
                    truly awesome and every tip, feedback, and answers they have
                    given to me has really helped me a lot to become a better
                    developer and understand everything clearly about the
                    course. The help from the live Mentoring, especially how
                    quickly they respond truly makes this course worth it.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow px-4 pt-4  bg-white rounded" style={{height:"320px"}}>
                <div className="card-block">
                  <div className="d-flex">
                    <div className="sub-title">Radhika D.</div>
                    <div className="star-ratings-sprite">
                      <span
                        style={{
                          width: ` ${Math.round((facebookRating / 5) * 100)}%`
                        }}
                        className="star-ratings-sprite-rating"
                      ></span>
                    </div>
                  </div>

                  <p className="sub-text3 pt-4 pl-3 pr-3">
                    Fantastic! The content and curriculum were excellent. Codify
                    college make us believe in learning by doing is the best way
                    by throwing challenging projects and that way works great.
                    I've learned and got comfortable with various technologies
                    throughout this program.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow px-4 pt-4  bg-white rounded" style={{height:"320px"}}>
                <div className="card-block">
                  <div className="d-flex">
                    <div className="sub-title">Stefan F.</div>
                    <div className="star-ratings-sprite">
                      <span
                        style={{
                          width: ` ${Math.round((facebookRating / 5) * 100)}%`
                        }}
                        className="star-ratings-sprite-rating"
                      ></span>
                    </div>
                  </div>

                  <p className="sub-text3 pt-3">
                    Since being furloughed from work, I've really enjoyed
                    learning skills that will improve my chances of landing a
                    full-time remote job. As most of my skills involve some
                    industrial hardware or external peripherals, acclimating to
                    the full-stack workstyle has been a whole new world. This
                    course has helped ease me into it and furthered my skills as
                    a software engineer as a whole. So far, I'm loving it!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow bg-white rounded pt-4 pl-4 pr-4" style={{height:"320px"}}>
                <div className="card-block">
                  <div className="d-flex">
                    <div className="sub-title">Ivan K.</div>
                    <div className="star-ratings-sprite">
                      <span
                        style={{
                          width: ` ${Math.round((facebookRating / 5) * 100)}%`
                        }}
                        className="star-ratings-sprite-rating"
                      ></span>
                    </div>
                  </div>

                  <p className="sub-text3 pt-3">
                    After having worked as a frontend developer and product
                    manager for a while, I wanted to get a better understanding
                    of backend web development. I enrolled in this course in
                    order to gain this skill and so far it has been a very
                    intense, but also a very rewarding experience. I can't tell
                    you how much I've learned With live Mentoring, and how much
                    I've improved in topics that were completely foreign to me
                    before.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow px-4 pt-4  bg-white rounded" style={{height:"320px"}}>
                <div className="card-block">
                  <div className="d-flex">
                    <div className="sub-title">Lazarevic W.</div>
                    <div className="star-ratings-sprite">
                      <span
                        style={{
                          width: ` ${Math.round((facebookRating / 5) * 100)}%`
                        }}
                        className="star-ratings-sprite-rating"
                      ></span>
                    </div>
                  </div>

                  <p className="sub-text3 pt-3">
                    This is my first online program and so far, it's been great.
                    The quality of the content and UI really stand out. After
                    completing my first project I was most impressed with the
                    code review. I was able to ask some questions about my code
                    and I received thoughtful and detailed answers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentReview
