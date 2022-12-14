import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../layout/Message";

import { login } from "../../../redux/actions/userAction";
import { createBrowserHistory } from "history";
import { Link } from "react-router-dom";
import EmailValidator from "email-validator";
import Loader from "./../../layout/Loader";

export default function LoginScreen({ location }) {
  const dispatch = useDispatch();
  const history = createBrowserHistory({ forceRefresh: true });

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userDetail, error, loginSuccess } = userLogin;

  // landing form

  const [Country, setCountry] = useState(localStorage.getItem("C_code"));

  // form data
  const [FormData, setFormData] = useState({
    Password: "",
    Email: "",
  });

  // validation state
  const [ValidationError, setValidationError] = useState({
    PasswordErr: false,
    EmailErr: false,
  });

  const [showButton, setShowButton] = useState(false);
  const [Hide, setHide] = useState(true);
  const [err, setErr] = useState("");

  // handel Password  chainging
  const _handelFieldChange = (e) => {
    // update the state variable
    setFormData({ ...FormData, [e.target.id]: e.target.value });

    if (!e.target.value) {
      setValidationError({ ...ValidationError, [e.target.id + "Err"]: true });
    } else if (e.target.value.length < 8) {
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

    dispatch(login(FormData.Email, FormData.Password));
    _clearFrom();
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
      Password: "",
      Email: "",
    });
    setErr("");
  };

  /* UseEffects  >>  */
  console.log(userDetail);

  // initializing componet level state

  useEffect(() => {
    if (loginSuccess) {
      history.goBack();
    }
  }, [history, loginSuccess]);

  useEffect(() => {
    if (error) setErr(error);
  }, [error]);

  useEffect(() => {
    let NoError = !ValidationError.PasswordErr && !ValidationError.EmailErr;

    let DataExisit = FormData.Password && FormData.Email;

    //console.log(FormData.Email );
    if (NoError && DataExisit) {
      //console.log('open button');
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [ValidationError, FormData]);

  console.log("error ", error && error.message);

  return (
    <>
      <section className="teacher-login-section">
        <div className="teacher-login-box py-5 col-sm-10 col-md-6 col-lg-3 offset-1">
          {location.state && <Message>{location.state.message}</Message>}
          {/* Title Box */}
          <div className="title-box text-center">
            <a href="layout-one-1.html">
              <img
                src="images/CF-College.png"
                alt="ccab"
                className="logo-dark w-100"
                height={26}
              />
            </a>
            <h2 className="text-light my-5">
              Welcome Please login to continue!
            </h2>
          </div>
          <form
            className="landing-form  w-100 needs-validation p-3"
            onSubmit={_handelSubmit}
          >
            <>
              <div className="form-row">
                <div
                  className="form-group  col-12"
                  style={{ position: "relative" }}
                >
                  {error ? (
                    <p className="text-danger mb-0 error-attention">{error} </p>
                  ) : null}
                </div>

                <div className="form-group  col-12 ">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput2"
                    placeholder="Your Email*"
                    required
                    value={FormData.Email}
                    onChange={_handelEmailChange}
                  />

                  {ValidationError.EmailErr ? (
                    <p className="text-danger error-attention">
                      Enter A Valid Email Please!
                    </p>
                  ) : null}
                </div>

                <div
                  className="form-group  col-12"
                  style={{ position: "relative" }}
                >
                  <input
                    type="password"
                    className="form-control"
                    id="Password"
                    placeholder="Your Password*"
                    required
                    value={FormData.Password}
                    onChange={_handelFieldChange}
                  />

                  {ValidationError.PasswordErr ? (
                    <p className="text-danger error-attention">
                      Password should be at least 8 character
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group  col-12 sm-12">
                  <button
                    type="submit"
                    disabled={!showButton}
                    className="btn btn-warning btn-block btn-sm formButton py-1"
                  >
                    {loading ? (
                      <Loader />
                    ) : (
                      <>
                        Login <i className="mdi mdi-telegram ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          </form>
        </div>
      </section>
    </>
  );
}
