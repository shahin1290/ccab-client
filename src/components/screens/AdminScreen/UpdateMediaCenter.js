import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import {
  getMediaCenterDetails,
  updateMediaCenter,
} from "../../../redux/actions/mediaCenterAction";
import { getUsers } from "../../../redux/actions/userAction";
import {
  Table,
  Col,
  Row,
  Modal,
  Button,
  Container,
  Form,
} from "react-bootstrap";
import { Card, Accordion } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { createBrowserHistory } from "history";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function UpdateMediaCenter({ match }) {
  const history = createBrowserHistory({ forceRefresh: true });

  const dispatch = useDispatch();

  /********* Call Reduser ************/

  // update mediaCenter reducer
  const {
    loading: Updateloading,
    error,
    success: UpdateSuccess,
  } = useSelector((state) => state.mediaCenterUpdate);

  // get Users list reducer
  const {
    users,
    loading: getUsersLoading,
    error: getUsersError,
  } = useSelector((state) => state.userList);

  // get mediaCenter Details Reducer
  const {
    mediaCenter,
    loading: mediaCenterDetailsloading,
    error: mediaCenterDetailsError,
  } = useSelector((state) => state.mediaCenterDetails);

  /*******************/

  /********* State And Var ************/
  const ID = match.params.id;

  const [Mentor, setMentor] = useState({}); // done
  const [price, setPrice] = useState(mediaCenter.price);
  const [name, setName] = useState(mediaCenter.name);
  const [description, setDescription] = useState(mediaCenter.description);
  const [category, setCategory] = useState(mediaCenter.category);
  const [seats, setSeats] = useState(mediaCenter.seats);
  const [published, SetPublished] = useState(mediaCenter.published);
  const [VideoUrl, setVideoUrl] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const [ImageLable, setImageLable] = useState("jpg,png file...");
  const [weeks, setWeeks] = useState(mediaCenter.weeks);
  const [MentorsList, setMentorsList] = useState([]);

  //video
  const [showVideo, setShowVideo] = useState(false);

  // update err
  const [updateErr, setUpdateErr] = useState("");
  /*******************/

  useEffect(() => {
    // call the getter ( mediaCenter Details  and users list )
    dispatch(getMediaCenterDetails(ID));
    dispatch(getUsers());
    if (UpdateSuccess) {
      history.push("/admin-media-center-list");
    }
  }, [ID, dispatch, match, UpdateSuccess]);

  /********* functions  ************/
  const _setDefaultValuse = () => {
    setMentor({ name: mediaCenter.mentor.name, _id: mediaCenter.mentor._id });
    setName(mediaCenter.name);
    setDescription(mediaCenter.description);
    setCategory(mediaCenter.category);
    setPrice(mediaCenter.price);
    setSeats(mediaCenter.seats);
    SetPublished(mediaCenter.published);
    setVideoUrl(mediaCenter.video_path);
    setImageLable(mediaCenter.img_path);
    setTitleWithAnswer(mediaCenter.info_list);
    setWeeks(mediaCenter.weeks);
  };

  const _FilterUsers = (users, role) => {
    if (role == "MentorUser") {
      return users.filter(
        (user) => user.user_type == role || user.user_type == "AdminUser"
      );
    }
    return users.filter((user) => user.user_type == role);
  };

  // select mentor
  const _handleSelectMentor = (arr) => {
    setMentor({ _id: arr[0], name: arr[1] });
  };

  // close video
  const handleCloseVideo = () => {
    setShowVideo(false);
  };
  const handleOpenVideo = () => {
    setShowVideo(true);
  };

  /********************* ************/
  /* Field Section */

  const [title, setTitle] = useState("");
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), content: "" },
  ]);

  const [titleWithAnswer, setTitleWithAnswer] = useState([]);

  const addtitleWithAnswer = () => {
    setTitleWithAnswer([
      ...titleWithAnswer,
      {
        title: title,
        items: [...inputFields],
      },
    ]);
    setTitle("");
    setInputFields([{ id: uuidv4(), content: "" }]);
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(), content: "" }]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  //handle form submit
  const submitHandler = (e) => {
    e.preventDefault();

    let infoData = [];
    if (titleWithAnswer.length) {
      titleWithAnswer.forEach((item) => {
        infoData.push(item);
      });
      dispatch(
        updateMediaCenter(
          { info_list: infoData, name: name, video_path: VideoUrl },
          mediaCenter._id
        )
      );
    }
  };

  useEffect(() => {
    if (mediaCenter.name) {
      _setDefaultValuse();
    }

    if (users && users.length) {
      setMentorsList(_FilterUsers(users, "MentorUser"));
    }
  }, [mediaCenter, users]);

  const _handleUpdateMediaCenter = () => {
    //const infoData = { infoList:  }

    //console.log('StudentsIds',StudentsIds);
    var form_data = new FormData();
    if (ImageUrl) form_data.append("img_path", ImageUrl);
    form_data.append("name", name);
    form_data.append("description", description);
    form_data.append("category", category);
    form_data.append("video_path", VideoUrl);
    form_data.append("seats", seats);
    form_data.append("weeks", weeks);
    form_data.append("mentor", Mentor._id);
    form_data.append("price", price);
    form_data.append("published", mediaCenter.published);
    //form_data.append('des_List',infoData)
    //console.log(infoData);
    dispatch(updateMediaCenter(form_data, mediaCenter._id));
  };
  return (
    <>
      {/* <!-- Edit Cource Section --> */}
      <div className='edit-cource-section'>
        <div className='auto-container'>
          {/* Sec Title */}
          <div className='sec-title'>
            <div className='clearfix'>
              <div className='pull-left'>
                <div className='title'>Edit mediaCenters</div>
              </div>
              <div className='pull-right'>
                <a href='/mentor-mediaCenters-list' className='see-all'>
                  Add Content
                </a>
              </div>
            </div>
          </div>
          <div>
            {error ? (
              <p className='text-danger bg-light p-2 '>{error}</p>
            ) : UpdateSuccess ? (
              <p className='text-success bg-light p-2 '>
                mediaCenter Updated successfully
              </p>
            ) : null}
          </div>
          <div className='inner-container'>
            <div className='row clearfix'>
              {/* Left Column */}
              <div className='left-column col-lg-8 col-md-12 col-sm-12'>
                <div className='inner-column'>
                  <div className='sub-title pb-3'>Basic Information</div>
                  <div className='sub-title pb-3 text-danger'>
                    *Add Plan name(Silver or Golden or Diamond) as a first word
                    of the mediaCenter title (Ex. Golden MERN STACK){" "}
                    <u>
                      {" "}
                      if the mediaCenter is only for any subscription plan.
                    </u>
                  </div>
                  {/* Edit mediaCenter Form */}
                  <div className='edit-course-form'>
                    <form method='post' action='index.html'>
                      {/* Form Group */}
                      <div className='form-group'>
                        <label>mediaCenter Title</label>
                        <input
                          type='text'
                          name='mediaCenter-title'
                          defaultValue
                          placeholder='mediaCenter Title'
                          value={name}
                          required
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>

                      {/* descriptopn  */}
                      <div className='form-group'>
                        <label>Description</label>
                        <span className='support'></span>
                        <textarea
                          name='message'
                          placeholder='Shortly describe this mediaCenter'
                          defaultValue={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        />
                      </div>

                      {/* Category */}
                      <div className='form-group mb-2'>
                        <label> Categogy</label>

                        <select
                          className='custom-select-box px-2 ml-2'
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value='' disabled selected>
                            select an option
                          </option>

                          <option>React </option>

                          <option>Node </option>

                          <option>Front End Development </option>

                          <option>Web Development </option>
                        </select>
                      </div>

                      <div className='my-3'>
                        <span className='rounded-pill  px-2 py-1 m-2 bg-light'>
                          <i className='fas fa-plus-circle text-success'></i>{" "}
                          {category}
                        </span>
                      </div>

                      {/* Form Group */}
                      <div className='inner-container'>
                        <div className='row clearfix'>
                          {/* Left Column */}
                          <div className='left-column col-lg-12 col-md-12 col-sm-12'>
                            <div className='inner-column'>
                              {/* Edit mediaCenter Form */}
                              <div className='edit-mediaCenter-form'>
                                <form>
                                  <div className='sub-title pb-3'>
                                    Add Describtion Info List
                                  </div>
                                  <div className='form-group'>
                                    <label>List Title</label>
                                    <input
                                      type='text'
                                      placeholder='Title'
                                      name='title'
                                      value={title}
                                      onChange={(e) => setTitle(e.target.value)}
                                    />
                                  </div>
                                  {inputFields.map((inputField, index) => (
                                    <Card key={inputField.id}>
                                      <div style={{ display: "flex" }}>
                                        <div className='form-group form-group col-lg-7 col-md-12 col-sm-12'>
                                          <label>{`Item ${1 + index}`} </label>
                                          <input
                                            type='text'
                                            placeholder='Write Item text'
                                            name='content'
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
                                          fontSize: "30px",
                                          display: "flex",
                                          width: "70px",
                                          justifyContent: "space-between",
                                          margin: "0 auto",
                                        }}
                                      >
                                        <button
                                          type='button'
                                          onClick={handleAddFields}
                                        >
                                          <i className='fas fa-plus-square'></i>
                                        </button>
                                        <button
                                          type='button'
                                          disabled={inputFields.length === 1}
                                          onClick={() =>
                                            handleRemoveFields(inputField.id)
                                          }
                                        >
                                          <i className='fas fa-minus-square'></i>
                                        </button>
                                      </div>
                                    </Card>
                                  ))}

                                  <div className='form-group col-lg-12 col-md-12 col-sm-12 text-center'>
                                    <div
                                      className='theme-btn btn-style-two'
                                      onClick={addtitleWithAnswer}
                                    >
                                      <span className='txt'>
                                        Add List{" "}
                                        <i className='fa fa-angle-right' />
                                      </span>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          {/* Right Column */}
                          <div className='right-column col-lg-12 col-md-12 col-sm-12'>
                            <div className='inner-column'>
                              <div className='edit-mediaCenter-form'>
                                {/* Form Group */}
                                <div className='form-group'>
                                  <div className='sub-title pb-3'>
                                    INFO LIST
                                  </div>

                                  <Accordion
                                    className='accordion-box style-two'
                                    defaultActiveKey='0'
                                  >
                                    {titleWithAnswer &&
                                      titleWithAnswer.map((x, index) => (
                                        <Card className='accordion block'>
                                          <Card.Header>
                                            <Accordion.Toggle
                                              variant='link'
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
                                                <div className='mb-3'>
                                                  {"- " + answer.content}
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

                      <div className='form-group'>
                        <button
                          type='button'
                          className='theme-btn btn-style-two'
                          onClick={submitHandler}
                        >
                          <span className='txt'>Add Section</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* Right Column */}
              <div className='right-column col-lg-4 col-md-12 col-sm-12'>
                <div className='inner-column'>
                  <div className='sub-title pb-3'>Video & Image</div>
                  {/* Video Box */}
                  <div
                    className='video-boxed'
                    style={{
                      backgroundImage: "url(images/resource/video-image-3.jpg)",
                    }}
                  >
                    <a
                      onClick={() => {
                        handleOpenVideo();
                      }}
                      className='lightbox-image intro-video-box'
                    >
                      <span className='fa fa-play'>
                        <i className='ripple' />
                      </span>
                    </a>
                  </div>
                  {/* video Modal */}
                  <Modal
                    show={showVideo}
                    onHide={handleCloseVideo}
                    size='lg'
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Watch Video</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className=' m-auto'>
                      {/* {(AddnewmediaCenterErr|| AddError)&&<Message variant="danger">{AddnewmediaCenterErr||AddError}</Message>} */}
                      <ReactPlayer url={VideoUrl} controls></ReactPlayer>
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                  </Modal>
                  {/* End Video Box */}

                  {/* Url Box */}
                  <div className='url-boxed'>
                    <label>Video URL</label>
                    <input
                      type='url'
                      name='videoUrl'
                      value={VideoUrl}
                      placeholder='https://www.youtube.com/dummy-video.com'
                      required
                      onChange={(e) => {
                        setVideoUrl(e.target.value);
                      }}
                    />
                    <span className='valid'>Enter valid url address</span>

                    {/* Divider */}
                    <div className='border my-3'></div>
                    {/* ***http://localhost:5001** */}
                    <label>Image URL</label>
                    {ImageLable ? (
                      <img
                        src={
                          "http://localhost:5001/uploads/Bootcamp/" + ImageLable
                        }
                      />
                    ) : (
                      <p className='text-warning bg-light p-1'>
                        * No Image Uploaded
                      </p>
                    )}
                    <span className='valid mb-3'>
                      Select (jpg / png )image{" "}
                    </span>
                    <div className='input-group '>
                      <input
                        type='file'
                        onChange={(e) => {
                          setImageLable(e.target.files[0].name);
                          setImageUrl(e.target.files[0]);
                          setUpdateErr("");
                        }}
                        className='form-control'
                        id='inputGroupFile02'
                      />
                    </div>
                  </div>

                  <div className=''></div>
                  {/* End Url Box */}

                  <div className='sub-title pb-3'>Options</div>
                  <div className='option-cource-box'>
                    <div className='box-inner'>
                      <div className='form-group mb-2'>
                        <label> Mentor</label>
                        {!MentorsList.length > 0 && (
                          <p className='text-warning bg-light p-1'>
                            * There is no Mentor Users
                          </p>
                        )}
                        {/* <span className="select-category">Select a category</span> */}
                        <select
                          className='custom-select-box px-2'
                          onChange={(e) => {
                            _handleSelectMentor(e.target.value.split(","));
                          }}
                        >
                          <option value='' disabled selected>
                            Choose Mentor{" "}
                          </option>
                          {MentorsList.length > 0 &&
                            MentorsList.map((mentor) => {
                              return (
                                <option value={[mentor._id, mentor.name]}>
                                  {mentor.name}
                                  {mentor.user_type == "AdminUser" &&
                                    " (Admin)"}
                                </option>
                              );
                            })}
                        </select>

                        <div className='my-3'>
                          {Mentor.name ? (
                            <span className='rounded-pill  px-2 py-1 m-2 bg-light'>
                              <i className='fas fa-plus-circle text-success'></i>{" "}
                              {Mentor.name}
                            </span>
                          ) : (
                            <p className='text-warning bg-light p-1'>
                              * Nothing Selected
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className='border my-3'></div>
                      {/* ******************* */}
                      <div className='form-group'>
                        <span className='price'>price</span>
                        <div className='total-price'>
                          Set mediaCenter Price :
                        </div>
                        <div className='item-quantity'>
                          <input
                            className='quantity-spinner'
                            type='number'
                            defaultValue={price}
                            name='quantity'
                            onChange={(e) => {
                              setPrice(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      {/* Divider */}
                      <div className='border my-3'></div>
                      {/* ******************* */}
                      <div className='form-group'>
                        <span className='price'>seats</span>
                        <div className='total-price'>
                          Set mediaCenter seats :
                        </div>
                        <p>More than 99 seat, it will be unlimited</p>
                        <div className='item-quantity'>
                          <input
                            className='quantity-spinner'
                            type='number'
                            min='0'
                            defaultValue={seats}
                            name='quantity'
                            onChange={(e) => {
                              setSeats(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className='form-group'>
                        <span className='price'>weeks</span>
                        <div className='total-price'>
                          Set mediaCenter weeks :
                        </div>
                        <div className='item-quantity'>
                          <input
                            className='quantity-spinner'
                            type='number'
                            min={1}
                            defaultValue={weeks}
                            name='quantity'
                            onChange={(e) => {
                              setWeeks(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Button Box */}
                  <div className='button-box text-center'>
                    <button
                      type='button'
                      className='theme-btn btn-style-one'
                      style={{ zIndex: "0" }}
                    >
                      <span className='txt' onClick={_handleUpdateMediaCenter}>
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
  );
}
