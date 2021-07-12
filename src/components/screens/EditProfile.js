import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userProfileUpdate, getProfile } from '../../redux/actions/userAction'
import { getServiceCategories } from '../../redux/actions/serviceCategoryAction'
import { updateServiceInstructor } from '../../redux/actions/serviceAction'

import { createBrowserHistory } from 'history'
import { useDropzone } from 'react-dropzone'
import Message from '../layout/Message'
import CropImage from '../layout/CropImage'

export default function EditProfile() {
  const dispatch = useDispatch()
  const history = createBrowserHistory({ forceRefresh: true })

  const {
    loading,
    user,
    error: getuserProfileErr
  } = useSelector((state) => state.userProfile)
  const { updateSuccess, error } = useSelector((state) => state.userUpdate)

  const {
    serviceCategories,
    loading: categoryListLoading,
    error: categoryListError
  } = useSelector((state) => state.serviceCategoryList)

  const [selectedImageFile, setSelectedImageFile] = useState()
  const [file, setFile] = React.useState()
  const [preview, setPreview] = React.useState()

  const onCropSave = ({ file, preview }) => {
    setPreview(preview)
    setFile(file)
    setPreview(preview)
    setFile(file)
  }
  const onDrop = React.useCallback((acceptedFiles) => {
    const fileDropped = acceptedFiles[0]
    if (fileDropped['type'].split('/')[0] === 'image') {
      setSelectedImageFile(fileDropped)
      return
    }
    setFile(fileDropped)
    const previewUrl = URL.createObjectURL(fileDropped)
    setPreview(previewUrl)
  })

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop
  })

  const { ref, ...rootProps } = getRootProps()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const name = firstName + ' ' + lastName
  const [bio, setBio] = useState('')
  const [facebookAddress, setFacebookAddress] = useState({})
  const [twitterAddress, setTwitterAddress] = useState({})
  const [linkedinAddress, setLinkedinAddress] = useState({})
  const [githubAddress, setGithubAddress] = useState({})

  /********* SKILLS ARRAY *******************/

  const [skill, setSkill] = useState('')
  const [skills, setSkills] = useState([])

  // select Category
  const [categories, setCategories] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectCategoryErr, setSelectCategoryErr] = useState('')

  const _handleSelectSKill = () => {
    setSkills([...skills, skill])
  }

  const _handleUnselectSkill = (skill) => {
    let NewSkills = skills.filter((item) => item !== skill)
    setSkills(NewSkills)
  }

  // select Category
  const _handleSelectCategory = () => {
    let item
    let exist = false
    // find the user id
    let category = categoryList.filter((item) => item.name === selectedCategory)
    // console.log('after filtering : ', Categories.length&&Categories[0]._id);
    for (item of categories) {
      if (item._id === category[0]._id) {
        //console.log('existing item ' , item.name);
        exist = true
      }
    }
    if (exist) setSelectCategoryErr('Category Already Selected')
    else {
      setCategories([
        ...categories,
        { name: category[0].name, _id: category[0]._id }
      ])
    }

    //console.log(selectCategoryErr,Category);
  }

  const _handleUnselectCategory = (id) => {
    let NewCategories = categories.filter((item) => item._id !== id)
    setCategories(NewCategories)
    //console.log('Category removed ');
  }

  useEffect(() => {
    if (updateSuccess) {
      history.push('/profile')
    }
    dispatch(getProfile())
  }, [dispatch, updateSuccess])

  useEffect(() => {
    if (user && user.name) {
      setUserData()
    }

    if (user && user.user_type === 'InstructorUser') {
      dispatch(getServiceCategories())
    }
  }, [user])

  useEffect(() => {
    if (serviceCategories && serviceCategories.length > 0) {
      setCategoryList(serviceCategories)
    }
  }, [serviceCategories])

  const getNetworkAddress = (name) => {
    const networkAddresses =
      user && user.networkAddresses.find((nw) => nw.network === name)

    if (networkAddresses) {
      return networkAddresses
    } else return {}
  }

  const setUserData = () => {
    const givenFirstName = user.name.split(' ').slice(0, -1).join(' ')
    const givenLastName = user.name.split(' ').slice(-1).join(' ')
    setFirstName(givenFirstName)
    setLastName(givenLastName)
    setEmail(user.email)
    setPhoneNumber(user.phone)
    setBio(user.bio)
    setSkills(user.skills)
    setFacebookAddress(getNetworkAddress('facebook'))
    setLinkedinAddress(getNetworkAddress('linkedin'))
    setGithubAddress(getNetworkAddress('github'))
    setTwitterAddress(getNetworkAddress('twitter'))
    setCategories(user.teachingFields ? user.teachingFields : [])
  }
  const submitHandler = (e) => {
    e.preventDefault()
    // set array for students ids
    let categoriesId = []
    if (categories.length) {
      categories.forEach((item) => {
        categoriesId.push(item._id)
      })
    }

    const formData = new FormData()
    formData.append('avatar', file)
    formData.append('email', email)
    formData.append('name', name)
    formData.append('phoneNumber', phoneNumber)
    formData.append('bio', bio)
    formData.append('skills', JSON.stringify(skills))
    formData.append(
      'networkAddresses',
      JSON.stringify([
        facebookAddress && facebookAddress,
        githubAddress && githubAddress,
        twitterAddress && twitterAddress,
        linkedinAddress && linkedinAddress
      ])
    )
    formData.append('teachingFields', JSON.stringify(categoriesId))

    dispatch(userProfileUpdate(formData))

    let categoriesName = []
    if (categories.length) {
      categories.forEach((item) => {
        categoriesName.push(item.name)
      })
    }

    dispatch(updateServiceInstructor({ categories: categoriesName }))
  }

  return (
    <>
      {/* Edit Profile Section */}
      <section
        className="edit-profile-section "
        style={{ paddingTop: 100 + 'px' }}
      >
        <div
          className="patern-layer-one paroller"
          data-paroller-factor="0.40"
          data-paroller-factor-lg="0.20"
          data-paroller-type="foreground"
          data-paroller-direction="vertical"
          style={{ backgroundImage: 'url(images/icons/icon-1.png)' }}
        />
        <div
          className="patern-layer-two paroller"
          data-paroller-factor="0.40"
          data-paroller-factor-lg="-0.20"
          data-paroller-type="foreground"
          data-paroller-direction="vertical"
          style={{ backgroundImage: 'url(images/icons/icon-2.png)' }}
        />
        <div className="auto-container">
          <div className="row clearfix">
            {/* Image Section */}
            <div className="image-column col-lg-3 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="image">
                  <img
                    onLoad={() => URL.revokeObjectURL(preview)}
                    src={
                      preview
                        ? preview
                        : user.avatar
                        ? `http://localhost:5001/uploads/Avatar/${user.avatar}`
                        : 'https://via.placeholder.com/200x112'
                    }
                    alt="avatar"
                  />
                </div>
                <div rootRef={ref}>
                  <div
                    {...rootProps}
                    style={{
                      height: 100,
                      background: '#efefef',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderStyle: 'dashed',
                      borderColor: '#aaa',
                      cursor: 'pointer'
                    }}
                  >
                    <input {...getInputProps()} />
                    <div className="sub-text">
                      Drag 'n' drop image file here, or click to select file
                    </div>
                  </div>
                </div>
                {/*  <a href="#" className="theme-btn btn-style-three">
                  <span className="txt">
                    Upload Picture <i className="fa fa-angle-right" />
                  </span>
                </a>
                <a href="#" className="theme-btn btn-style-two">
                  <span className="txt">
                    Delete Picture <i className="fa fa-angle-right" />
                  </span>
                </a> */}
              </div>
            </div>
            {/* Content Section */}
            <div className="content-column col-lg-9 col-md-12 col-sm-12">
              <div className="inner-column">
                {/* Edit Profile Info Tabs*/}
                <div className="edit-profile-info-tabs">
                  {/* Profile Tabs*/}
                  <div className="edit-profile-tabs tabs-box">
                    {/*Tab Btns*/}
                    <ul className="tab-btns tab-buttons clearfix">
                      <li
                        data-tab="#prod-overview"
                        className="tab-btn active-btn"
                      >
                        Overview
                      </li>
                    </ul>
                    {/*Tabs Container*/}
                    <div className="tabs-content">
                      {/*Tab / Active Tab*/}
                      <div className="tab active-tab" id="prod-overview">
                        <div className="content">
                          {/* Title Box */}
                          <div className="sub-title mb-2">
                            <div>Edit Profile</div>
                          </div>

                          {/* Profile Form */}
                          <div className="profile-form">
                            {error ? (
                              <p className="text-danger bg-light p-2 ">
                                {error}
                              </p>
                            ) : updateSuccess ? (
                              <p className="text-success bg-light p-2 ">
                                Profile Updated successfully
                              </p>
                            ) : null}
                            {/* Profile Form */}
                            <form onSubmit={submitHandler}>
                              <div className="row clearfix">
                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                  <input
                                    type="text"
                                    name="firstName"
                                    value={firstName}
                                    placeholder="First Name"
                                    onChange={(e) =>
                                      setFirstName(e.target.value)
                                    }
                                    required
                                  />
                                  <span className="icon flaticon-edit-1" />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                  <input
                                    type="text"
                                    name="lastName"
                                    value={lastName}
                                    placeholder="Last Name"
                                    onChange={(e) =>
                                      setLastName(e.target.value)
                                    }
                                    required
                                  />
                                  <span className="icon flaticon-edit-1" />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                  <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                  />
                                  <span className="icon flaticon-edit-1" />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                  <input
                                    type="text"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    placeholder="Phone"
                                    onChange={(e) =>
                                      setPhoneNumber(e.target.value)
                                    }
                                    required
                                  />
                                  <span className="icon flaticon-edit-1" />
                                </div>

                                {user && user.user_type === 'InstructorUser' && (
                                  <>
                                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                      <input
                                        type="text"
                                        name="facebook"
                                        value={
                                          facebookAddress &&
                                          facebookAddress.address
                                        }
                                        placeholder="Facebook Address"
                                        onChange={(e) =>
                                          setFacebookAddress({
                                            network: 'facebook',
                                            address: e.target.value
                                          })
                                        }
                                      />
                                      <span className="icon flaticon-edit-1" />
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                      <input
                                        type="text"
                                        name="twitter"
                                        value={
                                          twitterAddress &&
                                          twitterAddress.address
                                        }
                                        placeholder="Twitter Address"
                                        onChange={(e) =>
                                          setTwitterAddress({
                                            network: 'twitter',
                                            address: e.target.value
                                          })
                                        }
                                      />
                                      <span className="icon flaticon-edit-1" />
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                      <input
                                        type="text"
                                        name="github"
                                        value={
                                          githubAddress && githubAddress.address
                                        }
                                        placeholder="Github Address"
                                        onChange={(e) =>
                                          setGithubAddress({
                                            network: 'github',
                                            address: e.target.value
                                          })
                                        }
                                      />
                                      <span className="icon flaticon-edit-1" />
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                      <input
                                        type="text"
                                        name="linkedin"
                                        value={
                                          linkedinAddress &&
                                          linkedinAddress.address
                                        }
                                        placeholder="Linkedin Address"
                                        onChange={(e) =>
                                          setLinkedinAddress({
                                            network: 'linkedin',
                                            address: e.target.value
                                          })
                                        }
                                      />
                                      <span className="icon flaticon-edit-1" />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                      <textarea
                                        type="text"
                                        name="bio"
                                        value={bio}
                                        placeholder="Add Bio"
                                        onChange={(e) => setBio(e.target.value)}
                                      />
                                      <span className="icon flaticon-edit-1" />
                                    </div>

                                    {/* *********skill********** */}
                                    <div className="d-flex col-lg-8 col-md-6 col-sm-12 form-group ">
                                      <input
                                        type="text"
                                        name="skill"
                                        value={skill}
                                        placeholder="Add Skill"
                                        onChange={(e) => {
                                          setSkill(e.target.value)
                                        }}
                                        value={skill}
                                      />

                                      <button
                                        type="button"
                                        className="btn btn-success py-2 px-4 ml-3"
                                        onClick={_handleSelectSKill}
                                      >
                                        add
                                      </button>
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-sm-12 form-group my-3">
                                      {skills.length ? (
                                        skills.map((skill) => {
                                          return (
                                            <span className="rounded-pill  px-2 py-1  my-1 d-inline-block text-truncate bg-light">
                                              <a
                                                onClick={() => {
                                                  _handleUnselectSkill(skill)
                                                }}
                                              >
                                                <i className="fas fa-minus-circle text-danger  cursor- pointer"></i>
                                              </a>{' '}
                                              {skill}
                                            </span>
                                          )
                                        })
                                      ) : (
                                        <p className="text-warning bg-light p-1">
                                          * No Skill Added
                                        </p>
                                      )}
                                    </div>

                                    <div className="border my-3"></div>
                                    {/* ******************* */}
                                    <div className="form-group col-lg-8 col-md-6 col-sm-12  ">
                                      <label
                                        htmlFor="exampleDataList"
                                        className="form-label"
                                      >
                                        Teaching Fields
                                      </label>
                                      {/* error message */}
                                      {selectCategoryErr && (
                                        <p className="text-danger bg-light p-1">
                                          {selectCategoryErr}
                                        </p>
                                      )}
                                      <input
                                        className="form-control bg-light"
                                        list="datalistOptions"
                                        placeholder="Search Teaching Fields..."
                                        onChange={(e) => {
                                          setSelectCategoryErr('')
                                          setSelectedCategory(e.target.value)
                                        }}
                                        value={selectedCategory}
                                      />

                                      <button
                                        type="button"
                                        className="btn btn-success py-2 px-4 mt-2"
                                        onClick={_handleSelectCategory}
                                      >
                                        add
                                      </button>

                                      <datalist id="datalistOptions">
                                        {categoryList &&
                                          categoryList.length > 0 &&
                                          categoryList.map((Category) => {
                                            return (
                                              <option
                                                data={Category._id}
                                                value={Category.name}
                                                key={Category._id}
                                              >
                                                {Category.email}
                                              </option>
                                            )
                                          })}
                                      </datalist>
                                    </div>
                                    <label className="col-lg-4 col-md-6 col-sm-12 form-group">
                                      Selected Teaching Fields:{' '}
                                      {categories && categories.length}/
                                      {categoryList && categoryList.length}
                                    </label>
                                    <div className="my-3">
                                      {categories && categories.length ? (
                                        categories.map((category) => {
                                          return (
                                            <span className="rounded-pill  px-4 py-1  my-1 d-inline-block text-truncate bg-light">
                                              <a
                                                onClick={() => {
                                                  _handleUnselectCategory(
                                                    category._id
                                                  )
                                                }}
                                              >
                                                <i className="fas fa-minus-circle text-danger  cursor- pointer"></i>
                                              </a>{' '}
                                              {category.name}
                                            </span>
                                          )
                                        })
                                      ) : (
                                        <p className="text-warning bg-light p-1">
                                          * Nothing Selected
                                        </p>
                                      )}
                                    </div>
                                  </>
                                )}

                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                  <button
                                    className="theme-btn btn-style-three"
                                    type="submit"
                                    name="submit-form"
                                  >
                                    <span className="txt">
                                      Save Change{' '}
                                      <i className="fa fa-angle-right" />
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CropImage onSave={onCropSave} selectedFile={selectedImageFile} />
      </section>
      {/* End Profile Section */}
    </>
  )
}
