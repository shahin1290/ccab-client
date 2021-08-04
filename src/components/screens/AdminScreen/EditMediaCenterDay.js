import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPlayer from 'react-player'
import { useHistory } from 'react-router-dom'
import { getDayDetails, updateDay } from '../../../redux/actions/dayAction'
import Message from '../../layout/Message'
import Loader from '../../layout/Loader'
import { Modal } from 'react-bootstrap'

export default function UpdateMentorCourse({ match }) {
  const dispatch = useDispatch()

  const {
    day,
    loading: dayLoading,
    error: dayError
  } = useSelector((state) => state.dayDetails)

  const {
    loading: updateLoading,
    error: updateError,
    success: UpdateSuccess
  } = useSelector((state) => state.dayUpdate)

  const { weekId, id } = match.params

  useEffect(() => {
    dispatch(getDayDetails(weekId, id))
    if (UpdateSuccess) {
    }
  }, [dispatch, weekId, id, UpdateSuccess])

  useEffect(() => {
    setName(day.name)
    setArabicVideo(day.arabic_video_path)

    setVideo(day.video_path)
  }, [weekId, id, day])

  //video show
  const [showVideo, setShowVideo] = useState(false)
  const [modalVideo, setModalVideo] = useState('')
  const handleCloseVideo = () => {
    setShowVideo(false)
  }
  const handleOpenVideo = () => {
    setShowVideo(true)
  }

  //form submission
  const [name, setName] = useState('')
  const [video, setVideo] = useState('')
  const [arabicVideo, setArabicVideo] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('video_path', video)
    data.append('arabic_video_path', arabicVideo)
    data.append('name', name)

    dispatch(updateDay(weekId, id, data))
  }

  return (
    <>
      {/* <!-- Edit Cource Section --> */}
      <div className="edit-cource-section">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="sec-title">
            <div className="clearfix">
              <div className="pull-left">
                <div className="title ">Edit Content</div>
              </div>
            </div>
          </div>
          {updateError ? (
            <p className="text-danger bg-light p-2 ">{updateError}</p>
          ) : UpdateSuccess ? (
            <p className="text-success bg-light p-2 ">
              Day Updated successfully
            </p>
          ) : null}
          <div className="inner-container">
            <div>
              <form onSubmit={submitHandler}>
                {/* Left Column */}
                <div
                  className="left-column col-lg-6 col-md-8 col-sm-12"
                  style={{ margin: '0 auto' }}
                >
                  <div className="inner-column">
                    {/* Edit Course Form */}
                    <div className="edit-course-form">
                      {/* Form Group */}
                      <div className="form-group">
                        <label>Name of Content</label>
                        <input
                          type="text"
                          name="name"
                          value={name}
                          placeholder="Name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right Column */}
                <div
                  className="right-column col-lg-6 col-md-8 col-sm-12"
                  style={{ margin: '0 auto' }}
                >
                  <div className="inner-column">
                    <div className="sub-title pb-2">English Video Content</div>
                    {/* Video Box */}
                    <div
                      className="video-boxed"
                      style={{
                        backgroundImage:
                          'url(images/resource/video-image-3.jpg)'
                      }}
                    >
                      <a
                        onClick={() => {
                          setModalVideo('english')
                          handleOpenVideo()
                        }}
                        className="lightbox-image intro-video-box"
                      >
                        <span className="fa fa-play">
                          <i className="ripple" />
                        </span>
                      </a>
                    </div>
                    {/* video Modal */}
                    <Modal
                      show={showVideo}
                      onHide={handleCloseVideo}
                      size="lg"
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Watch Video</Modal.Title>
                      </Modal.Header>
                      <Modal.Body className=" m-auto">
                        {/* {(AddnewCourseErr|| AddError)&&<Message variant="danger">{AddnewCourseErr||AddError}</Message>} */}
                        {modalVideo === 'english' && (
                          <ReactPlayer url={video} controls></ReactPlayer>
                        )}

                        {modalVideo === 'arabic' && (
                          <ReactPlayer url={arabicVideo} controls></ReactPlayer>
                        )}
                      </Modal.Body>
                      <Modal.Footer></Modal.Footer>
                    </Modal>
                    {/* End Video Box */}

                    {/* Url Box */}
                    <div className="url-boxed">
                      <label>URL For English Video Content</label>
                      <input
                        type="text"
                        name="video"
                        value={video}
                        defaultValue
                        placeholder="https://www.youtube.com/dummy-video.com"
                        onChange={(e) => setVideo(e.target.value)}
                      />
                      <span className="valid">Enter valid url address</span>
                    </div>

                    <div className="sub-title pb-2">Arabic Video Content</div>
                    {/* Video Box */}

                    <div
                      className="video-boxed"
                      style={{
                        backgroundImage:
                          'url(images/resource/video-image-3.jpg)'
                      }}
                    >
                      <a
                        onClick={() => {
                          setModalVideo('arabic')
                          handleOpenVideo()
                        }}
                        className="lightbox-image intro-video-box"
                      >
                        <span className="fa fa-play">
                          <i className="ripple" />
                        </span>
                      </a>
                    </div>

                    <div className="url-boxed">
                      <label>URL for Arabic Video Content</label>
                      <input
                        type="text"
                        name="video"
                        value={arabicVideo}
                        defaultValue
                        placeholder="https://www.youtube.com/dummy-video.com"
                        onChange={(e) => setArabicVideo(e.target.value)}
                      />
                      <span className="valid">Enter valid url address</span>
                    </div>
                  </div>

                  <div className="button-box text-center">
                    <button type="submit" className="theme-btn btn-style-one">
                      <span className="txt">Save Changes</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* End Manage Cource Section */}
    </>
  )
}
