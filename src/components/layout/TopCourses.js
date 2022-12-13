import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCourseList } from "../../redux/actions/courseAction";
import Message from "../layout/Message";
import Loader from "../layout/Loader";
import { Link } from "react-router-dom";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 4 },
};

export default function TopCourses({ match }) {
  const dispatch = useDispatch();
  const { courseList, loading, error } = useSelector(
    (state) => state.courseList
  );

  useEffect(() => {
    if (!courseList.length) dispatch(getCourseList());
  }, [dispatch]);

  useEffect(() => {
    AOS.init();
  }, []);
  const filterSubscriptionCourse = (courseList) => {
    const filteredThreeCourses = courseList.filter(
      (course) =>
        course.name === "Frontend  Course" ||
        // course.name.toLowerCase().includes("foundation course") ||
        course.name === "Javascript Full Stack Web and  Mobile Development"
    );

    return filteredThreeCourses
      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      .filter((course) => {
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
        className="pt-3 w-75 mx-auto bg-light "
        style={{
          border: "none",
        }}
      >
        <div className="auto-container">
          {/* Sec Title */}
          <div
            data-aos="zoom-in"
            data-aos-delay="400"
            className="title text-center p-2 "
          >
            Learn how to become a full-stack developer and build web and mobile
            apps using JavaScript
          </div>
          <hr className="block-seperator mb-3" />

          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="sub-text text-center mb-3"
          >
            As a graduate, you’ll leave with a solid base of fundamental
            programming and computer science knowledge, as well as experience
            with languages, frameworks, and libraries that employers demand.
          </div>
          {loading ? <Loader /> : error && <Message>{error}</Message>}

          <AliceCarousel
            mouseTracking
            responsive={responsive}
            disableDotsControls
          >
            {/* Institution Block */}
            {courseList.length &&
              filterSubscriptionCourse(courseList).map((course) => (
                <div
                  data-aos="zoom-in-left"
                  className=" cource-block-two "
                  key={course._id}
                >
                  <div className="inner-box ">
                    <div className="image ">
                      <Link to={`/courses/${course._id}`}>
                        <img
                          src={
                            "http://localhost:5001/uploads/Bootcamp/" +
                            course.img_path
                          }
                          alt=""
                        />
                      </Link>
                    </div>

                    <div className="lower-content ">
                      <div>
                        <Link
                          className="sub-title2 my-5"
                          to={`/courses/${course._id}`}
                        >
                          {course.name}
                        </Link>
                      </div>
                      <div className="pt-4 ">
                        <span
                          className="sub-text2 d-inline-block"
                          style={{ maxWidth: "450px" }}
                        >
                          {console.log(course.name)}
                          {course &&
                          course.name &&
                          course.name ===
                            "Javascript Full Stack Web and  Mobile Development"
                            ? "HTML, CSS, JavaScript, Node, Express, MongoDB, React.js, React Native, Git, UX basics ..."
                            : course.name === "Frontend  Course" &&
                              "Frontend-programming skills with HTML5, Css3, Bootstrap4, Es6, React JS ..."}
                        </span>
                        <Link
                          className="btn p-0 m-0 text-danger"
                          to={`/courses/${course._id}`}
                        >
                          Read More
                        </Link>
                      </div>
                      <div className="clearfix my-3">
                        <div className="pull-left">
                          <div className="students">
                            {course.weeks * 5} Lectures
                          </div>
                        </div>
                        <div className="pull-right">
                          <div className="hours">
                            {course.weeks * 5 * 2} Hours
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </AliceCarousel>

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
      </section>

      {/* End Institution Section */}
    </>
  );
}
