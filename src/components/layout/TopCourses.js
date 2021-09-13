import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCourseList } from "../../redux/actions/courseAction";

import Message from "../layout/Message";
import Loader from "../layout/Loader";
import { Link } from "react-router-dom";

import Carousel from "./Carousel";

export default function TopCourses({ match }) {
  const dispatch = useDispatch();
  const { courseList, loading, error } = useSelector(
    (state) => state.courseList
  );

  // shown courses in the carousel
  const [shownSlide, setShownSlide] = useState(4);

  // Window Resize Handler
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);
  });
  /************************ */

  useEffect(() => {
    dispatch(getCourseList());
  }, [dispatch]);

  useEffect(() => {
    if (window.innerWidth > 1024) {
      setShownSlide(4);
    } else if (window.innerWidth <= 1024) {
      setShownSlide(3);
    }
    if (window.innerWidth <= 767) {
      setShownSlide(2);
    } else if (window.innerWidth <= 400) {
      setShownSlide(1);
    }
    console.log(window.innerWidth);
  }, [window.innerWidth]);

  const filterSubscriptionCourse = (courseList) => {
    return courseList.filter((course) => {
      const titleFirstWord = course.name
        .toLowerCase()
        .split(" ")[0]
        .toLowerCase();

      return !["silver", "diamond", "golden"].includes(titleFirstWord);
    });
  };

  return (
    <>
      {/* Institution Section */}

      <section
        className='pt-3'
        style={{
          backgroundColor: "#F8F9FD",
        }}
      >
        <div className='auto-container'>
          {/* Sec Title */}
          <div className='title text-center p-2 '>
            Change your life with Coding
          </div>
          <hr className='block-seperator mb-3' />

          <div className='sub-text text-center mb-3'>
            We help you with career transition or add a tech stak to your
            existing skill
          </div>
          {loading ? <Loader /> : error && <Message>{error}</Message>}

          <div className='row  clearfix '>
            <div className='col-10 offset-1'>
              <Carousel variant='dark' show={shownSlide}>
                {/* Institution Block */}
                {courseList.length &&
                  filterSubscriptionCourse(courseList).map((course) => (
                    <div className=' cource-block-two ' key={course._id}>
                      <div className='inner-box '>
                        <div className='image '>
                          <Link to={`/courses/${course._id}`}>
                            <img
                              src={
                                "http://localhost:5001/uploads/Bootcamp/" +
                                course.img_path
                              }
                              alt=''
                            />
                          </Link>
                        </div>
                        <div className='lower-content'>
                          <div>
                            <Link
                              className='sub-title2'
                              to={`/courses/${course._id}`}
                            >
                              {course.name}
                            </Link>
                          </div>
                          <div className='pt-3 pb-5'>
                            <span
                              className='sub-text2 line-clamp'
                              style={{ maxWidth: "240px" }}
                            >
                              {course.description}
                            </span>
                          </div>
                          <div className='clearfix'>
                            <div className='pull-left'>
                              <div className='students'>
                                {course.weeks * 5} Lectures
                              </div>
                            </div>
                            <div className='pull-right'>
                              <div className='hours'>
                                {course.weeks * 5 * 2} Hours
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </Carousel>

              {/* Institution Block */}
              {/* {courseList.length > 0 ? (
              <div className="institution-block empty-block col-lg-4 col-md-6 col-sm-12">
                <div
                  className="inner-box wow fadeInRight"
                  data-wow-delay="0ms"
                  data-wow-duration="1500ms"
                >
                  <a href="/course-grid" className="theme-btn btn-style-three">
                    <span className="txt">Browse All</span>
                  </a>
                </div>
              </div>
            ) : (
              ''
            )} */}
            </div>
          </div>
        </div>
      </section>

      {/* End Institution Section */}
    </>
  );
}
