import { useHistory } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import Loader from "./Loader";
// email and phone validation
import "react-phone-number-input/style.css";
import EmailValidator from "email-validator";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import axios from "axios";

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [Country, setCountry] = useState(localStorage.getItem("C_code"));

  // form data
  const [FormData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
  });

  // validation state
  const [ValidationError, setValidationError] = useState({
    NameErr: false,
    EmailErr: false,
    PhoneErr: false,
  });

  const [showButton, setShowButton] = useState(false);
  const [Hide, setHide] = useState(true);
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

  // handel Name  chainging
  const _handelFieldChange = (e) => {
    // update the state variable
    setFormData({ ...FormData, [e.target.id]: e.target.value });

    if (!e.target.value) {
      setValidationError({ ...ValidationError, [e.target.id + "Err"]: true });
    } else {
      setValidationError({ ...ValidationError, [e.target.id + "Err"]: false });
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
    _clearFrom();
    setLoading(true);
    console.log({ ...FormData });
    showThanksMessage();
    // const config={headers:{'Content-Type' : 'application/json'}}
    // try {
    //   const res = await axios.post("http://localhost:5001/contact", {
    //       ...FormData
    //   },config);

    //   setLoading(false)

    // } catch (error) {
    //   setLoading(false)
    //   setErr(error.message)
    // }
  };

  const showThanksMessage = () => {
    if (Hide && !err) {
      setHide(false);
      setTimeout(() => {
        setHide(true);
      }, 3000);
    }
  };
  const _clearFrom = () => {
    setFormData({
      Name: "",
      Email: "",
      Phone: "",
    });
    setErr("");
  };

  /* UseEffects  >>  */

  useEffect(() => {
    let NoError =
      !ValidationError.NameErr &&
      !ValidationError.EmailErr &&
      !ValidationError.PhoneErr;

    let DataExisit = FormData.Name && FormData.Email && FormData.Phone;

    //console.log(FormData.Email );
    if (NoError && DataExisit) {
      //console.log('open button');
      setShowButton(true);
    } else {
      setShowButton(false);
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

  return (
    <>
      <div className='text-center'>
        <p className='text-muted mb-2 f-13 text-uppercase'>
          Welcome To Codify College
        </p>
        <h5 className='form-dark mb-4'>Get 30 Days Free Trial</h5>
      </div>
      {/* form */}
      {err ? (
        <p
          className='text-danger pl-3 m-0 error-attention'
          style={{ fontWeight: "bold" }}
        >
          {" "}
          {err} Error{" "}
        </p>
      ) : null}
      {!Hide ? (
        <div className=' px-4 py-2 landing-thnaks-box'>
          <h3>Thank You Our Manger will contact you soon!</h3>
        </div>
      ) : (
        <form
          className='landing-form  w-100 needs-validation p-3'
          onSubmit={_handelSubmit}
        >
          <>
            <div className='form-row'>
              <div
                className='form-group  col-12'
                style={{ position: "relative" }}
              >
                {err ? <p className='text-danger'>{err}</p> : null}
              </div>

              <div
                className='form-group mb-4 col-12'
                style={{ position: "relative" }}
              >
                <input
                  type='text'
                  className='form-control'
                  id='Name'
                  placeholder='Your Name*'
                  required
                  value={FormData.Name}
                  onChange={_handelFieldChange}
                />

                {ValidationError.NameErr ? (
                  <p className='text-danger'>Enter Your Name Please!</p>
                ) : null}
              </div>

              <div className='form-group mb-4 col-12 '>
                <input
                  type='email'
                  className='form-control'
                  id='exampleFormControlInput2'
                  placeholder='Your email*'
                  required
                  value={FormData.Email}
                  onChange={_handelEmailChange}
                />

                {ValidationError.EmailErr ? (
                  <p className='text-danger'>Enter A Valid Email Please!</p>
                ) : null}
              </div>
            </div>
            <div className='form-row'>
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
            </div>

            <div className='form-row'>
              <div className='form-group mb-4 col-12 sm-12'>
                <button
                  type='submit'
                  disabled={!showButton}
                  className='btn btn-warning btn-block btn-sm formButton py-1'
                >
                  {loading ? (
                    <Loader />
                  ) : (
                    <>
                      Send <i className='mdi mdi-telegram ml-2' />
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        </form>
      )}
    </>
  );
};

export default Form;
