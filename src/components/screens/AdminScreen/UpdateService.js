import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getServiceDetails,
  updateService
} from '../../../redux/actions/serviceAction'
import { getUsers } from '../../../redux/actions/userAction'
import { getServiceCategories } from '../../../redux/actions/serviceCategoryAction'

import { Card, Accordion, Button } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import { createBrowserHistory } from 'history'
import Rodal from 'rodal'
import AddStudentToService from './AddStudentToService'
import Loader from '../../layout/Loader'
import Message from '../../layout/Message'

export default function UpdateCourese({ match }) {
  const history = createBrowserHistory({ forceRefresh: true })
  const [showModal, setShowModal] = useState({ visible: false })

  const dispatch = useDispatch()

  /********* Call Reduser ************/

  // update service reducer
  const {
    loading: Updateloading,
    error,
    success: UpdateSuccess
  } = useSelector((state) => state.serviceUpdate)

  // get Users list reducer
  const {
    users,
    loading: getUsersLoading,
    error: getUsersError
  } = useSelector((state) => state.userList)

  // get service Details Reducer
  const {
    service,
    loading: serviceDetailsloading,
    error: serviceDetailsError
  } = useSelector((state) => state.serviceDetails)

  // get serviceCategories Reducer
  const {
    serviceCategories,
    loading: categoryListLoading,
    error: categoryListError
  } = useSelector((state) => state.serviceCategoryList)

  /*******************/

  /********* State And Var ************/
  const ID = match.params.id
  const [students, setStudents] = useState([]) // done
  const [instructors, setInstructors] = useState([]) // done
  const [price, setPrice] = useState(service.price)
  const [name, setName] = useState(service.name)
  const [description, setDescription] = useState(service.description)
  const [category, setCategory] = useState(service.category)
  const [startDate, setStartDate] = useState(new Date())
  const [seats, setSeats] = useState(service.seats)
  const [published, SetPublished] = useState(service.published)
  const [VideoUrl, setVideoUrl] = useState('')
  const [ImageUrl, setImageUrl] = useState('')
  const [ImageLable, setImageLable] = useState('jpg,png file...')
  const [weeks, setWeeks] = useState(service.weeks)
  const [InstructorList, setInstructorsList] = useState([])
  const [StudentsList, setStudentsList] = useState([])
  const [selectedStudent, setSelectedStudent] = useState('')
  const [selectStudentErr, setSelectStudentErr] = useState('')
  const [selectedInstructor, setSelectedInstructor] = useState('')
  const [selectInstructorErr, setSelectInstructorErr] = useState('')

  // update err
  const [updateErr, setUpdateErr] = useState('')
  /*******************/

  useEffect(() => {
    // call the getter ( service Details  and users list )
    dispatch(getServiceDetails(ID))
    dispatch(getServiceCategories())

    dispatch(getUsers())
    if (UpdateSuccess) {
      history.push('/admin-services-list')
    }
  }, [ID, dispatch, match, UpdateSuccess])

  /********* functions  ************/
  const _setDefaultValuse = () => {
    setName(service.name)
    setDescription(service.description)
    setCategory(service.category)
    setPrice(service.price)
    setSeats(service.seats)
    setStudents(service.students)
    setInstructors(service.instructors)
    setStartDate(new Date(service.start_date))
    SetPublished(service.published)
    setVideoUrl(service.video_path)
    setImageLable(service.img_path)
    setTitleWithAnswer(service.info_list)
    setWeeks(service.weeks)
  }

  const _FilterUsers = (users, role) => {
    if (role === 'MentorUser') {
      return users.filter(
        (user) => user.user_type === role || user.user_type === 'AdminUser'
      )
    }
    return users.filter((user) => user.user_type === role)
  }

  // select student
  const _handleSelectStudent = () => {
    let item
    let exist = false
    // find the user id
    let student = StudentsList.filter((item) => item.name === selectedStudent)
    // console.log('after filtering : ', students.length&&students[0]._id);
    for (item of students) {
      if (item._id === student[0]._id) {
        //console.log('existing item ' , item.name);
        exist = true
      }
    }
    if (exist) setSelectStudentErr('Student Already Selected')
    else {
      if (students.length < Number(seats))
        setStudents([
          ...students,
          { name: student[0].name, _id: student[0]._id }
        ])
      else {
        setSelectStudentErr('Seats available are only ' + seats)
      }
    }

    //console.log(selectStudentErr,student);
  }

  const _handleUnselectStudent = (id) => {
    let NewStudents = students.filter((item) => item._id !== id)
    setStudents(NewStudents)
    //console.log('student removed ');
  }

  // select Instructors
  const _handleSelectInstructor = () => {
    let item
    let exist = false
    // find the user id
    let instructor = InstructorList.filter(
      (item) => item.name === selectedInstructor
    )
    // console.log('after filtering : ', students.length&&students[0]._id);
    for (item of instructors) {
      if (item._id === instructor[0]._id) {
        //console.log('existing item ' , item.name);
        exist = true
      }
    }
    if (exist) setSelectInstructorErr('Student Already Selected')
    else {
      if (instructors.length < Number(seats))
        setInstructors([
          ...instructors,
          { name: instructor[0].name, _id: instructor[0]._id }
        ])
      else {
        setSelectInstructorErr('Seats available are only ' + seats)
      }
    }

    //console.log(selectStudentErr,student);
  }
  const _handleUnselectInstructor = (id) => {
    let newInstructors = instructors.filter((item) => item._id !== id)
    setInstructors(newInstructors)
  }

  /********************* ************/
  /* Field Section */

  const [title, setTitle] = useState('')
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), content: '' }
  ])

  const [titleWithAnswer, setTitleWithAnswer] = useState([])

  const addtitleWithAnswer = () => {
    setTitleWithAnswer([
      ...titleWithAnswer,
      {
        title: title,
        items: [...inputFields]
      }
    ])
    setTitle('')
    setInputFields([{ id: uuidv4(), content: '' }])
  }

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i
    })

    setInputFields(newInputFields)
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(), content: '' }])
  }

  const handleRemoveFields = (id) => {
    const values = [...inputFields]
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    )
    setInputFields(values)
  }

  //handle form submit
  const submitHandler = (e) => {
    e.preventDefault()

    let infoData = []
    if (titleWithAnswer.length) {
      titleWithAnswer.forEach((item) => {
        infoData.push(item)
      })
      dispatch(
        updateService(
          { info_list: infoData, name: name, video_path: VideoUrl },
          service._id
        )
      )
    }
  }

  useEffect(() => {
    if (service.name) {
      _setDefaultValuse()
    }

    if (users && users.length) {
      setStudentsList(_FilterUsers(users, 'StudentUser'))
      setInstructorsList(_FilterUsers(users, 'InstructorUser'))
    }
  }, [service, users])

  const _handleupdateService = () => {
    // set array for students ids
    let StudentsIds = []
    if (students.length) {
      students.forEach((item) => {
        StudentsIds.push(item._id)
      })
    }

    // set array for instructor ids
    let InstructorsIds = []
    if (instructors.length) {
      instructors.forEach((item) => {
        InstructorsIds.push(item._id)
      })
    }
    //const infoData = { infoList:  }

    //console.log('StudentsIds',StudentsIds);
    var form_data = new FormData()
    if (ImageUrl) form_data.append('service_image_path', ImageUrl)
    form_data.append('_id', service._id)
    form_data.append('name', name)
    form_data.append('description', description)
    form_data.append('category', category)
    form_data.append('seats', seats)
    form_data.append('students', JSON.stringify(StudentsIds))
    form_data.append('instructors', JSON.stringify(InstructorsIds))
    form_data.append('price', price)
    form_data.append('start_date', startDate)
    form_data.append('published', service.published)
    //form_data.append('des_List',infoData)
    //console.log(infoData);
    dispatch(updateService(form_data, service._id))
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
                <div className="title">Edit Service</div>
              </div>
            </div>
          </div>

          <div className="buttons-box pull-right">
            <Button
              variant="danger"
              onClick={() => {
                setShowModal({ visible: true })
              }}
            >
              <span className="sub-title text-white">
                <i class="fas fa-plus-square"></i> Add Student
              </span>
            </Button>
          </div>
          <div className="py-2 sub-title mb-5">
            <Rodal
              animation="zoom"
              visible={showModal.visible}
              onClose={() => setShowModal({ visible: false })}
              width={900}
            >
              <AddStudentToService />
            </Rodal>
          </div>
          <div>
            {error ? (
              <p className="text-danger bg-light p-2 ">{error}</p>
            ) : UpdateSuccess ? (
              <p className="text-success bg-light p-2 ">
                service Updated successfully
              </p>
            ) : null}
          </div>
          <div className="inner-container">
            <div className="row clearfix">
              {/* Left Column */}
              <div className="left-column col-lg-8 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="sub-title pb-3">Basic Information</div>

                  {/* Edit service Form */}
                  <div className="edit-course-form">
                    <form method="post" action="index.html">
                      {/* Form Group */}
                      <div className="form-group">
                        <label>service Title</label>
                        <input
                          type="text"
                          name="service-title"
                          defaultValue
                          placeholder="service Title"
                          value={name}
                          required
                          onChange={(e) => {
                            setName(e.target.value)
                          }}
                        />
                      </div>

                      {/* descriptopn  */}
                      <div className="form-group">
                        <label>Description</label>
                        <span className="support"></span>
                        <textarea
                          name="message"
                          placeholder="Shortly describe this service"
                          defaultValue={description}
                          onChange={(e) => {
                            setDescription(e.target.value)
                          }}
                        />
                      </div>

                      {/* Category */}
                      <div className="form-group mb-2">
                        <label> Categogy</label>

                        <select
                          className="custom-select-box px-2 ml-2"
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="" disabled selected>
                            select an option
                          </option>

                          {categoryListLoading ? (
                            <Loader />
                          ) : categoryListError ? (
                            <Message>{categoryListError}</Message>
                          ) : serviceCategories ? (
                            serviceCategories.map((req) => (
                              <option key={req._id}>{req.name}</option>
                            ))
                          ) : (
                            <p className="pl-4 py-2 mt-4 text-dark bg-warning ">
                              No serviceCatyegory Found!
                            </p>
                          )}
                        </select>
                      </div>

                      <div className="my-3">
                        <span className="rounded-pill  px-2 py-1 m-2 bg-light">
                          <i className="fas fa-plus-circle text-success"></i>{' '}
                          {category}
                        </span>
                      </div>

                      {/* Form Group */}
                      <div className="inner-container">
                        <div className="row clearfix">
                          {/* Left Column */}
                          <div className="left-column col-lg-12 col-md-12 col-sm-12">
                            <div className="inner-column">
                              {/* Edit service Form */}
                              <div className="edit-course-form">
                                <form>
                                  <div className="sub-title pb-3">
                                    Add Describtion Info List
                                  </div>
                                  <div className="form-group">
                                    <label>List Title</label>
                                    <input
                                      type="text"
                                      placeholder="Title"
                                      name="title"
                                      value={title}
                                      onChange={(e) => setTitle(e.target.value)}
                                    />
                                  </div>
                                  {inputFields.map((inputField, index) => (
                                    <Card key={inputField.id}>
                                      <div style={{ display: 'flex' }}>
                                        <div className="form-group form-group col-lg-7 col-md-12 col-sm-12">
                                          <label>{`Item ${1 + index}`} </label>
                                          <input
                                            type="text"
                                            placeholder="Write Item text"
                                            name="content"
                                            value={inputField.content}
                                            onChange={(event) =>
                                              handleChangeInput(
                                                inputField.id,
                                                event
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          fontSize: '30px',
                                          display: 'flex',
                                          width: '70px',
                                          justifyContent: 'space-between',
                                          margin: '0 auto'
                                        }}
                                      >
                                        <button
                                          type="button"
                                          onClick={handleAddFields}
                                        >
                                          <i className="fas fa-plus-square"></i>
                                        </button>
                                        <button
                                          type="button"
                                          disabled={inputFields.length === 1}
                                          onClick={() =>
                                            handleRemoveFields(inputField.id)
                                          }
                                        >
                                          <i className="fas fa-minus-square"></i>
                                        </button>
                                      </div>
                                    </Card>
                                  ))}

                                  <div className="form-group col-lg-12 col-md-12 col-sm-12 text-center">
                                    <div
                                      className="theme-btn btn-style-two"
                                      onClick={addtitleWithAnswer}
                                    >
                                      <span className="txt">
                                        Add List{' '}
                                        <i className="fa fa-angle-right" />
                                      </span>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          {/* Right Column */}
                          <div className="right-column col-lg-12 col-md-12 col-sm-12">
                            <div className="inner-column">
                              <div className="edit-course-form">
                                {/* Form Group */}
                                <div className="form-group">
                                  <div className="sub-title pb-3">
                                    INFO LIST
                                  </div>

                                  <Accordion
                                    className="accordion-box style-two"
                                    defaultActiveKey="0"
                                  >
                                    {titleWithAnswer &&
                                      titleWithAnswer.map((x, index) => (
                                        <Card className="accordion block">
                                          <Card.Header>
                                            <Accordion.Toggle
                                              variant="link"
                                              eventKey={`${index}`}
                                            >
                                              {x.title}
                                            </Accordion.Toggle>
                                          </Card.Header>
                                          <Accordion.Collapse
                                            eventKey={`${index}`}
                                          >
                                            <Card.Body>
                                              {x.items.map((answer) => (
                                                <div className="mb-3">
                                                  {'- ' + answer.content}
                                                </div>
                                              ))}
                                            </Card.Body>
                                          </Accordion.Collapse>
                                        </Card>
                                      ))}
                                  </Accordion>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*  bootcamp sections  */}

                      <div className="form-group">
                        <button
                          type="button"
                          className="theme-btn btn-style-two"
                          onClick={submitHandler}
                        >
                          <span className="txt">Add Section</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* Right Column */}
              <div className="right-column col-lg-4 col-md-12 col-sm-12">
                <div className="inner-column">
                  {/* Url Box */}
                  <div className="url-boxed">
                    {/* Divider */}
                    <div className="border my-3"></div>
                    {/* ***http://localhost:5001** */}
                    <label>Image URL</label>
                    {ImageLable ? (
                      <img
                        src={
                          'http://localhost:5001/uploads/Bootcamp/' + ImageLable
                        }
                      />
                    ) : (
                      <p className="text-warning bg-light p-1">
                        * No Image Uploaded
                      </p>
                    )}
                    <span className="valid mb-3">
                      Select (jpg / png )image{' '}
                    </span>
                    <div className="input-group ">
                      <input
                        type="file"
                        onChange={(e) => {
                          setImageLable(e.target.files[0].name)
                          setImageUrl(e.target.files[0])
                          setUpdateErr('')
                        }}
                        className="form-control"
                        id="inputGroupFile02"
                      />
                    </div>
                  </div>

                  <div className=""></div>
                  {/* End Url Box */}

                  <div className="sub-title pb-3">Options</div>
                  <div className="option-cource-box">
                    <div className="box-inner">
                      {/* ******************* */}
                      <div className="form-group ">
                        <label htmlFor="exampleDataList" className="form-label">
                          Instructors
                        </label>
                        {/* error message */}
                        {selectInstructorErr && (
                          <p className="text-danger bg-light p-1">
                            {selectInstructorErr}
                          </p>
                        )}
                        <input
                          className="form-control bg-light"
                          list="datalistOptions1"
                          id="exampleDataList1"
                          placeholder="search instructor..."
                          onChange={(e) => {
                            setSelectInstructorErr('')
                            setSelectedInstructor(e.target.value)
                          }}
                          value={selectedInstructor}
                        />

                        <button
                          type="button"
                          className="btn btn-success py-2 px-4 mt-2"
                          onClick={_handleSelectInstructor}
                        >
                          add
                        </button>

                        <datalist id="datalistOptions1">
                          {InstructorList.length > 0 &&
                            InstructorList.map((instructor) => {
                              return (
                                <option
                                  data={instructor._id}
                                  value={instructor.name}
                                  key={instructor._id}
                                >
                                  {instructor.email}
                                </option>
                              )
                            })}
                        </datalist>
                      </div>
                      <label className="mt-2">
                        Selected Instructors : {instructors.length}/
                        {InstructorList.length}
                      </label>
                      <div className="my-3">
                        {instructors.length > 0 ? (
                          instructors.map((instructor) => {
                            return (
                              <span className="rounded-pill  px-2 py-1  my-1 d-inline-block text-truncate bg-light">
                                <a
                                  onClick={() => {
                                    _handleUnselectInstructor(instructor._id)
                                  }}
                                >
                                  <i className="fas fa-minus-circle text-danger  cursor- pointer"></i>
                                </a>{' '}
                                {instructor.name}
                              </span>
                            )
                          })
                        ) : (
                          <p className="text-warning bg-light p-1">
                            * Nothing Selected
                          </p>
                        )}
                      </div>

                      {/* Divider */}
                      <div className="border my-3"></div>
                      {/* ******************* */}
                      <div className="form-group ">
                        <label htmlFor="exampleDataList" className="form-label">
                          Students
                        </label>
                        {/* error message */}
                        {selectStudentErr && (
                          <p className="text-danger bg-light p-1">
                            {selectStudentErr}
                          </p>
                        )}
                        <input
                          className="form-control bg-light"
                          list="datalistOptions2"
                          id="exampleDataList2"
                          placeholder="search student..."
                          onChange={(e) => {
                            setSelectStudentErr('')
                            setSelectedStudent(e.target.value)
                          }}
                          value={selectedStudent}
                        />

                        <button
                          type="button"
                          className="btn btn-success py-2 px-4 mt-2"
                          onClick={_handleSelectStudent}
                        >
                          add
                        </button>

                        <datalist id="datalistOptions2">
                          {StudentsList.length > 0 &&
                            StudentsList.map((student) => {
                              return (
                                <option
                                  data={student._id}
                                  value={student.name}
                                  key={student._id}
                                >
                                  {student.email}
                                </option>
                              )
                            })}
                        </datalist>
                      </div>
                      <label className="mt-2">
                        Selected Students : {students.length}/
                        {StudentsList.length}
                      </label>
                      <div className="my-3">
                        {students.length ? (
                          students.map((student) => {
                            return (
                              <span className="rounded-pill  px-2 py-1  my-1 d-inline-block text-truncate bg-light">
                                <a
                                  onClick={() => {
                                    _handleUnselectStudent(student._id)
                                  }}
                                >
                                  <i className="fas fa-minus-circle text-danger  cursor- pointer"></i>
                                </a>{' '}
                                {student.name}
                              </span>
                            )
                          })
                        ) : (
                          <p className="text-warning bg-light p-1">
                            * Nothing Selected
                          </p>
                        )}
                      </div>

                      {/* Divider */}
                      <div className="border my-3"></div>
                      {/* ******************* */}
                      <div className="form-group">
                        <span className="price">price</span>
                        <div className="total-price">Set service Price :</div>
                        <div className="item-quantity">
                          <input
                            className="quantity-spinner"
                            type="number"
                            defaultValue={price}
                            name="quantity"
                            onChange={(e) => {
                              setPrice(e.target.value)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Button Box */}
                  <div className="button-box text-center">
                    <button
                      type="button"
                      className="theme-btn btn-style-one"
                      style={{ zIndex: '0' }}
                    >
                      <span className="txt" onClick={_handleupdateService}>
                        Save Changes
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Manage Cource Section */}
    </>
  )
}
