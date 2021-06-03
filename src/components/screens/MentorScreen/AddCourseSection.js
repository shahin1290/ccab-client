import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getDayDetails, updateDay } from '../../../redux/actions/dayAction'
import Message from '../../layout/Message'
import Loader from '../../layout/Loader'

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
  }, [dispatch, weekId, id])

  const findElementText = (el) => {
    if (day.name) {
      const sourceCode = day.source_code

      if (sourceCode.length > 0) {
        const elementType = sourceCode.find((a) => a.element_type === el)
        if (elementType) {
          return elementType.element_text
        } else {
          return null
        }
      }
    }
    return ''
  }

  //form submission
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [code, setCode] = useState('')
  const [image, setImage] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('element_text', image)
    data.append('title', title)
    data.append('description', description)
    data.append('code', code)
    data.append('name', day.name)
    data.append('video_path', day.video_path)

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
                <div className="title ">Add Section</div>
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
          <div className="inner-container p-5">
            <div className="">
              <form onSubmit={submitHandler}>
                {/* Left Column */}
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="inner-column">
                    {/* Edit Course Form */}
                    <div className="edit-course-form">
                      {/* Form Group */}

                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          name="title"
                          value={title}
                          placeholder="Title"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          type="text"
                          name="description"
                          value={description}
                          placeholder="Description"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label>Code</label>

                        <textarea
                          type="text"
                          name="code"
                          value={code}
                          placeholder="Code"
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>

                      <div>
                        <label>Image</label>
                        <input
                          type="file"
                          name="image"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                        <span className="valid">Upload Image here</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="button-box text-center">
                  <button type="submit" className="theme-btn btn-style-one">
                    <span className="txt">Save Changes</span>
                  </button>
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
