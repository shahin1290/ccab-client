import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import logo from "./../../../assets/images/CF.png";
import { registerUser } from "../../../redux/actions/userAction";
import { createBrowserHistory } from "history";
import { Link } from "react-router-dom";
import EmailValidator from "email-validator";
import Loader from "./../../layout/Loader";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import MainLoader from "./../../layout/LandingMainLoader";
import Select from "react-select";

export default function StudentRegisterScreen({ location }) {
  const dispatch = useDispatch();
  const history = createBrowserHistory({ forceRefresh: true });

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetail } = userLogin;
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, registerSuccess } = userRegister;

  //current stage >
  const [currentStage, setCurrentStage] = useState(0);

  const labelWithIcon = (
    <span className='fas fa-book-open'>
      <span className='sub-title pl-2'>choose subject</span>
    </span>
  );

  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: "HTML & CSS", label: "HTML & CSS" },
    { value: "JavaScript", label: "JavaScript" },
    { value: " Python", label: " Python" },
    { value: " PHP", label: " PHP" },
    { value: " C", label: " C" },
    { value: " C++", label: " C++" },
    { value: " NodeJs", label: " NodeJs" },
    { value: " React", label: " React" },
    { value: " Angular", label: " Angular" },
    { value: " Vue", label: " Vue" },
    { value: " Ruby", label: " Ruby" },
    { value: " Java", label: " Java" },
  ];
  // landing form

  const [Country, setCountry] = useState(localStorage.getItem("C_code"));

  // form data
  const [FormData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Phone: "",
    Password: "",
    RePassword: "",
    Email: "",
    Gender: "",
    Lang: "",
    Terms: false,
    Education: "",
  });

  // validation state
  const [ValidationError, setValidationError] = useState({
    PasswordErr: false,
    RePasswordErr: false,
    FirstNameErr: false,
    LastNameErr: false,
    EmailErr: false,
    PhoneErr: false,
    GenderErr: false,
    EducationErr: false,
    LangErr: false,
  });

  const [showButton, setShowButton] = useState({
    btnStage1: false,
    btnStage2: false,
    btnStage3: false,
    btnStage4: false,
  });
  const [err, setErr] = useState("");

  // handel Phone number  chainging
  const _handelPhoneChange = (e) => {
    // validate Phone number !
    if (e && !isValidPhoneNumber(e)) {
      setValidationError({ ...ValidationError, PhoneErr: true });
    } else if (e && isValidPhoneNumber(e)) {
      setValidationError({ ...ValidationError, PhoneErr: false });
      console.log("Correct!");
    }
    //console.log(e);
    setFormData({ ...FormData, Phone: e });
  };

  // handel text  chainging
  const _handelFieldChange = (e) => {
    // update the state variable
    setFormData({ ...FormData, [e.target.id]: e.target.value });

    if (!e.target.value) {
      setValidationError({ ...ValidationError, [e.target.id + "Err"]: true });
    } else {
      setValidationError({ ...ValidationError, [e.target.id + "Err"]: false });
    }
  };

  // handel Password  chainging
  const _handelPasswordChange = (e) => {
    // update the state variable
    setFormData({ ...FormData, [e.target.id]: e.target.value });

    if (!e.target.value) {
      setValidationError({
        ...ValidationError,
        [e.target.id + "Err"]: "Password should not be empty",
      });
    } else if (e.target.value.length < 8) {
      setValidationError({
        ...ValidationError,
        [e.target.id + "Err"]: "Password should be at least 8 character",
      });
    } else if (FormData.RePassword && FormData.RePassword !== e.target.value) {
      setValidationError({
        ...ValidationError,
        [e.target.id + "Err"]: "Password is not matched",
      });
    } else {
      setValidationError({
        ...ValidationError,
        RePasswordErr: false,
        PasswordErr: false,
      });
    }
  };

  // handel Password  chainging
  const _handelRePasswordChange = (e) => {
    // update the state variable
    setFormData({ ...FormData, [e.target.id]: e.target.value });

    if (!e.target.value) {
      setValidationError({
        ...ValidationError,
        [e.target.id + "Err"]: "Password should not be empty",
      });
    } else if (e.target.value.length < 8) {
      setValidationError({
        ...ValidationError,
        [e.target.id + "Err"]: "Password should be at least 8 character",
      });
    } else if (e.target.value !== FormData.Password) {
      setValidationError({
        ...ValidationError,
        [e.target.id + "Err"]: "Password is not matched",
      });
    } else {
      setValidationError({
        ...ValidationError,
        RePasswordErr: false,
        PasswordErr: false,
      });
    }
  };

  // handel Email chainging
  const _handelEmailChange = (e) => {
    setFormData({ ...FormData, Email: e.target.value });

    if (
      (e.target.value && !EmailValidator.validate(e.target.value)) ||
      !e.target.value
    ) {
      setValidationError({ ...ValidationError, EmailErr: true });
    } else if (e.target.value) {
      setValidationError({ ...ValidationError, EmailErr: false });
    }
  };

  const _handelSubmit = async (e) => {
    e.preventDefault();

    let name = FormData.FirstName + " " + FormData.LastName;
    dispatch(
      registerUser(
        name,
        FormData.Email,
        FormData.Password,
        FormData.Phone,
        FormData.Gender,
        FormData.Education,
        FormData.Lang,
        FormData.Education
      )
    );

    _clearFrom();
    //dispatch(registerUser(name, email, password, phoneNumber, gender, language))
  };

  const _clearFrom = () => {
    setFormData({
      FirstName: "",
      LastName: "",
      Phone: "",
      Password: "",
      RePassword: "",
      Email: "",
      Gender: "",
      Lang: "",
      Terms: false,
      Education: "",
    });
    setErr("");
  };

  /* UseEffects  >>  */

  useEffect(() => {
    // console.log(`redirect ${redirect}`);
    if (userDetail && userDetail.name) {
      history.push("/profile");
    }
    if (registerSuccess) {
      history.push({
        pathname: "/login",
        state: {
          message: "User Registration Successful, Please Login !",
        },
      });
    }
  }, [registerSuccess, history]);

  // show buttons
  useEffect(() => {
    let noErrorStage1 =
      !ValidationError.FirstNameErr &&
      !ValidationError.LastNameErr &&
      !ValidationError.GenderErr &&
      !ValidationError.PhoneErr;

    let noErrorStage2 =
      !ValidationError.EmailErr &&
      !ValidationError.PasswordErr &&
      !ValidationError.RePasswordErr;

    let noErrorStage3 =
      !ValidationError.LangErr && !ValidationError.EducationErr;

    let DataExisitStage1 =
      FormData.FirstName &&
      FormData.LastName &&
      FormData.Gender &&
      FormData.Phone;

    let DataExisitStage2 = FormData.Email && FormData.Password;

    let DataExisitStage3 = FormData.Lang && FormData.Education;

    let DataExisitStage4 = FormData.Terms;

    console.log(FormData.Email);
    if (currentStage == 0 && noErrorStage1 && DataExisitStage1) {
      console.log("open button", noErrorStage1 && DataExisitStage1);
      setShowButton({ ...showButton, btnStage1: true });
    } else if (currentStage == 0) {
      console.log("Not open button");
      setShowButton({ ...showButton, btnStage1: false });
    }
    console.log("currentStage", currentStage);
    if (noErrorStage2 && DataExisitStage2) {
      setShowButton({ ...showButton, btnStage2: true });
    } else if (currentStage == 1) {
      setShowButton({ ...showButton, btnStage2: false });
    }

    console.log("currentStage", currentStage);
    if (noErrorStage3 && DataExisitStage3) {
      setShowButton({ ...showButton, btnStage3: true });
    } else if (currentStage == 2) {
      setShowButton({ ...showButton, btnStage3: false });
    }

    if (DataExisitStage4) {
      setShowButton({ ...showButton, btnStage4: true });
    } else if (currentStage == 3) {
      setShowButton({ ...showButton, btnStage4: false });
    }
  }, [ValidationError, FormData]);

  // request client Country
  useEffect(() => {
    // getting the client country
    async function fetchMyAPI() {
      if (!Country) {
        let response = await axios.get("https://ipapi.co/json/");

        console.log(btoa(response.data.country_code));
        localStorage.setItem("C_code", btoa(response.data.country_code));
        setCountry(response.data.country_code);
      }
    }

    fetchMyAPI();
  }, []);

  console.log("formData ", FormData);
  console.log("showButton ", showButton);
  // active color : #ec4c16

  return (
    <>
      <section className='student-signup-section'>
        {userDetail && userDetail.name ? (
          <MainLoader />
        ) : (
          <>
            {/*Navbar Start*/}
            <nav className='navbar navbar-expand-lg p-1 bg-light navbar-custom '>
              <div className='container'>
                {/* LOGO */}

                <a className='navbar-brand logo' href='/'>
                  <img
                    src='images/CF-College.png'
                    alt='photo'
                    className
                    height={10}
                  />
                </a>
              </div>
            </nav>
            {/* Navbar End */}
            <div className='student-signup-box py-3 col-sm-10 col-md-6 col-lg-4 offset-md-3'>
              {/* Title Box */}
              <div className='title-box pl-3 pt-1 text-start'>
                <h2 className=' mb-5'>Signup Form</h2>

                <ul className='signup-setps'>
                  <div className={currentStage == 0 ? "active" : ""}>
                    <li>1 </li>
                    <span className='w-50 d-block mt-2'>
                      Personal Information
                    </span>
                  </div>

                  <div className={currentStage == 1 ? "active" : ""}>
                    <li>2 </li>
                    <span className='w-50 d-block mt-2'>
                      Account Information
                    </span>
                  </div>

                  <div className={currentStage == 2 ? "active" : ""}>
                    <li>3 </li>
                    <span className='w-50 d-block mt-2'>Eduction History</span>
                  </div>

                  <div className={currentStage == 3 ? "active" : ""}>
                    <li className='no-after'>4 </li>
                    <span className='w-100 d-block mt-2'>Terms & policy</span>
                  </div>
                </ul>
              </div>
              <form
                className='student-signup-form  w-100 needs-validation p-3'
                onSubmit={_handelSubmit}
              >
                <>
                  <div className='form-row'>
                    <div
                      className='form-group  col-12'
                      style={{ position: "relative" }}
                    >
                      {error ? (
                        <p className='text-danger mb-0 error-attention'>
                          {error}{" "}
                        </p>
                      ) : null}
                    </div>

                    {/* input Stage 1 */}
                    {currentStage == 0 ? (
                      <>
                        {/* First Name */}
                        <div className='form-group  col-12 '>
                          <input
                            type='text'
                            className='form-control'
                            id='FirstName'
                            placeholder='Your First Name*'
                            required
                            value={FormData.FirstName}
                            onChange={_handelFieldChange}
                          />

                          {ValidationError.FirstNameErr ? (
                            <p className='text-danger error-attention'>
                              Enter First Name Please!
                            </p>
                          ) : null}
                        </div>

                        {/* Last Name */}
                        <div className='form-group  col-12 '>
                          <input
                            type='text'
                            className='form-control'
                            id='LastName'
                            placeholder='Your Last Name*'
                            required
                            value={FormData.LastName}
                            onChange={_handelFieldChange}
                          />

                          {ValidationError.LastNameErr ? (
                            <p className='text-danger error-attention'>
                              Enter Last Name Please!
                            </p>
                          ) : null}
                        </div>

                        {/* phone */}
                        <div className='form-group mb-4 col-12 sm-12'>
                          <PhoneInput
                            international
                            countryCallingCodeEditable={false}
                            defaultCountry={atob(Country)}
                            value={FormData.Phone}
                            onChange={_handelPhoneChange}
                          />
                          {ValidationError.PhoneErr ? (
                            <p className='text-danger'>
                              Enter A Valid Phone Number Please!
                            </p>
                          ) : null}
                        </div>

                        <div
                          className='form-group  col-12'
                          style={{ position: "relative" }}
                        >
                          <select
                            className='form-select'
                            id='Gender'
                            onChange={_handelFieldChange}
                            aria-label='Default select example'
                          >
                            <option selected disabled>
                              Select your gender
                            </option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                            <option value='others'>Other</option>
                          </select>

                          {ValidationError.GenderErr ? (
                            <p className='text-danger error-attention'>
                              Select your gender please{" "}
                            </p>
                          ) : null}
                        </div>
                      </>
                    ) : null}

                    {/* input Stage 2 */}
                    {currentStage == 1 ? (
                      <>
                        {/* Email */}
                        <div className='form-group  col-12 '>
                          <input
                            type='email'
                            className='form-control'
                            id='exampleFormControlInput2'
                            placeholder='Your Email*'
                            required
                            value={FormData.Email}
                            onChange={_handelEmailChange}
                          />

                          {ValidationError.EmailErr ? (
                            <p className='text-danger error-attention'>
                              Enter A Valid Email Please!
                            </p>
                          ) : null}
                        </div>
                        <div
                          className='form-group  col-12'
                          style={{ position: "relative" }}
                        >
                          <input
                            type='password'
                            className='form-control'
                            id='Password'
                            placeholder='Your Password*'
                            required
                            value={FormData.Password}
                            onChange={_handelPasswordChange}
                          />

                          {ValidationError.PasswordErr ? (
                            <p className='text-danger error-attention'>
                              {ValidationError.PasswordErr}
                            </p>
                          ) : null}
                        </div>

                        <div
                          className='form-group  col-12'
                          style={{ position: "relative" }}
                        >
                          <input
                            type='password'
                            className='form-control'
                            id='RePassword'
                            placeholder='Confirm Password*'
                            required
                            value={FormData.RePassword}
                            onChange={_handelRePasswordChange}
                          />

                          {ValidationError.RePasswordErr ? (
                            <p className='text-danger error-attention'>
                              {ValidationError.RePasswordErr}{" "}
                            </p>
                          ) : null}
                        </div>
                      </>
                    ) : null}

                    {/* input Stage 3 */}
                    {currentStage == 2 ? (
                      <>
                        <div
                          className='form-group  col-12  '
                          style={{ position: "relative" }}
                        >
                          <select
                            className='form-select'
                            id='Lang'
                            onChange={_handelFieldChange}
                            aria-label='Default select example'
                          >
                            <option selected disabled>
                              Select Language{" "}
                            </option>
                            <option value='en'>English</option>
                            <option value='ar'>Arabic</option>
                          </select>

                          {ValidationError.LangErr ? (
                            <p className='text-danger error-attention'>
                              Select your language please{" "}
                            </p>
                          ) : null}
                        </div>

                        <div
                          className='form-group  col-12'
                          style={{ position: "relative" }}
                        >
                          <select
                            className='form-select'
                            id='Education'
                            onChange={_handelFieldChange}
                            aria-label='Default select example'
                          >
                            <option selected disabled>
                              Select your education status
                            </option>
                            <option value='9-11'>Completed Year 9-11</option>
                            <option value='12'>
                              Completed High School(Year 12)
                            </option>
                            <option value='diploma'>Diploma</option>
                            <option value='undergraduate'>Undergraduate</option>
                            <option value='postgraduate'>
                              Post Graduate Degree
                            </option>
                            <option value='masters'>Masters</option>
                            <option value='phd'>PhD</option>
                            <option value='other'>Other</option>
                          </select>

                          {ValidationError.EducationErr ? (
                            <p className='text-danger error-attention'>
                              Select your education status{" "}
                            </p>
                          ) : null}
                        </div>

                        <div
                          className='form-group  col-12'
                          style={{ position: "relative" }}
                        >
                          <Select
                            options={options}
                            placeholder={
                              "Select your previous coding experiences"
                            }
                            styles={{
                              control: (base) => ({
                                ...base,
                                boxShadow: "none",
                                zIndex: 5000,
                                padding: "7px",
                                border: "1px solid #222",
                                backgroundColor: "#F5F5F5",
                              }),
                              placeholder: (base) => ({
                                ...base,
                                fontSize: "1em",
                                color: "#222",
                                fontWeight: 400,
                                paddingLeft: "7px",
                              }),
                              option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isFocused
                                  ? "#1E90FF"
                                  : "",
                                color: state.isFocused ? "#fff" : "#222",
                                paddingLeft: 25,
                                textAlign: "left",
                              }),
                            }}
                            onChange={setSelectedOption}
                            isSearchable={true}
                            isMulti
                          />
                        </div>
                      </>
                    ) : null}

                    {/* input Stage 4 */}
                    {currentStage == 3 ? (
                      <>
                        <div className='form-check mb-3'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='Terms'
                            onChange={() => {
                              setFormData({ ...FormData, Terms: true });
                            }}
                          />

                          <label className='form-check-label' htmlFor='Terms'>
                            I agree the user agreement and{" "}
                            <a
                              href='/privacy'
                              target='_blank'
                              className='text-danger'
                            >
                              Terms &amp; Conditions
                            </a>
                          </label>
                        </div>
                      </>
                    ) : null}
                  </div>

                  {/* button stage number 1 */}
                  {currentStage == 0 ? (
                    <div className='form-row '>
                      <div className='form-group   col-sm-6'>
                        <button
                          type='button'
                          disabled={!showButton.btnStage1}
                          onClick={() => {
                            setCurrentStage(1);
                          }}
                          className='btn btn-warning btn-block btn-sm formButton py-1'
                        >
                          {loading ? <Loader /> : <>Next </>}
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {/* stage number 2 */}
                  {currentStage == 1 ? (
                    <div className='form-row'>
                      <div className='form-group   col-sm-6'>
                        <button
                          type='button'
                          onClick={() => {
                            setCurrentStage(0);
                          }}
                          className='btn btn-outline-warning btn-block  btn-sm formButton py-1'
                        >
                          {loading ? <Loader /> : <>Previous </>}
                        </button>
                      </div>
                      <div className='form-group   col-sm-6'>
                        <button
                          type='button'
                          disabled={!showButton.btnStage2}
                          onClick={() => {
                            setCurrentStage(2);
                          }}
                          className='btn btn-warning btn-block btn-sm formButton py-1'
                        >
                          {loading ? <Loader /> : <>Next </>}
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {/* stage number 3 */}
                  {currentStage == 2 ? (
                    <div className='form-row'>
                      <div className='form-group   col-sm-6'>
                        <button
                          type='button'
                          onClick={() => {
                            setCurrentStage(1);
                          }}
                          className='btn btn-outline-warning btn-block  btn-sm formButton py-1'
                        >
                          {loading ? <Loader /> : <>Previous </>}
                        </button>
                      </div>
                      <div className='form-group   col-sm-6'>
                        <button
                          type='button'
                          disabled={!showButton.btnStage3}
                          onClick={() => {
                            setCurrentStage(3);
                          }}
                          className='btn btn-warning btn-block btn-sm formButton py-1'
                        >
                          {loading ? <Loader /> : <>Next </>}
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {/* stage number 4 */}
                  {currentStage == 3 ? (
                    <div className='form-row'>
                      <div className='form-group   col-sm-6'>
                        <button
                          type='button'
                          onClick={() => {
                            setCurrentStage(2);
                          }}
                          className='btn btn-outline-warning btn-block btn-sm formButton py-1'
                        >
                          Previous
                        </button>
                      </div>
                      <div className='form-group   col-sm-6'>
                        <button
                          type='submit'
                          disabled={!showButton.btnStage4}
                          className='btn btn-warning btn-block btn-sm formButton py-1'
                        >
                          {loading ? <Loader /> : <>Signup </>}
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <div className='form-group col-lg-12 col-md-12 col-sm-12'>
                    <div className='users'>
                      Already have an account!{" "}
                      <a href='/login' className='link-info text-danger'>
                        <u>Sign In</u>
                      </a>
                    </div>
                  </div>
                </>
              </form>
            </div>
          </>
        )}
      </section>
    </>
  );
}
