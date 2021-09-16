import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/actions/userAction";
import {
  updatePromo,
  getPromoDetails,
} from "../../../redux/actions/promoAction";
import { createBrowserHistory } from "history";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const history = createBrowserHistory({ forceRefresh: true });

export default function UpdatePromo({ match }) {
  const dispatch = useDispatch();
  const ID = match.params.id;

  /********* Call Reduser ************/

  const { userDetail } = useSelector((state) => state.userLogin);

  // update course reducer
  const {
    loading: promoLoading,
    error,
    success: promoSuccess,
  } = useSelector((state) => state.promoCreate);

  // get Users list reducer
  const {
    users,
    loading: getUsersLoading,
    error: getUsersError,
  } = useSelector((state) => state.userList);

  const {
    loading: promoDetailsLoading,
    success: promoDetailsSuccess,
    promo,
  } = useSelector((state) => state.promoDetails);

  const {
    success: UpdateSuccess,
    loading: Updateloading,
    error: UpdateError,
  } = useSelector((state) => state.promoUpdate);

  /*******************/

  const _setDefaultValuse = () => {
    setName(promo && promo.name);
    setDays(promo && promo.days);
    setHours(promo && promo.hours);
    setMinutes(promo && promo.minutes);
    setPercentages(promo && promo.percentages);
    setShow(promo && promo.show);
  };

  /********* State And Var ************/

  const [name, setName] = useState();
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [percentages, setPercentages] = useState();
  const [show, setShow] = useState();

  /*******************/

  useEffect(() => {
    // call the getter ( users list )
    dispatch(getUsers());

    if (ID) {
      dispatch(getPromoDetails(ID));
    }
    if (UpdateSuccess) {
      history.push("/promo-list");
    }
  }, [dispatch, ID, UpdateSuccess]);

  useEffect(() => {
    if (promo) {
      _setDefaultValuse();
    }
  }, [promo]);

  /********* functions  ************/

  //handle form submit
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updatePromo(
        {
          name,
          days,
          hours,
          minutes,
          percentages,
          show,
        },
        ID
      )
    );
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
                <div className='title'>Edit promo</div>
              </div>
            </div>
          </div>
          <div>
            {UpdateError ? (
              <p className='text-danger bg-light p-2 '>{error}</p>
            ) : UpdateSuccess ? (
              <p className='text-success bg-light p-2 '>
                promo Updated successfully
              </p>
            ) : null}
          </div>
          <div className='inner-container'>
            <div className='row clearfix'>
              {/* Left Column */}
              <div className='mx-auto'>
                <div className='inner-column'>
                  {/* Edit Course Form */}
                  <div className='edit-course-form'>
                    <form onSubmit={submitHandler}>
                      {/* Form Group */}
                      <div className='sub-text'>
                        <label>Service Name</label>
                        <input
                          class='form-control'
                          type='text'
                          name='service-name'
                          placeholder='Service Name'
                          value={name}
                          required
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>

                      <div className='form-group'>
                        <label className='sub-text'>Number of Days</label>
                        <div className='item-quantity'>
                          <input
                            className='quantity-spinner'
                            type='number'
                            min={0}
                            defaultValue={days}
                            name='quantity'
                            onChange={(e) => {
                              setDays(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className='form-group'>
                        <label className='sub-text'>Number of Hours</label>
                        <div className='item-quantity'>
                          <input
                            className='quantity-spinner'
                            type='number'
                            min={0}
                            defaultValue={hours}
                            name='quantity'
                            onChange={(e) => {
                              setHours(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className='form-group'>
                        <label className='sub-text'>Number of Minutes</label>
                        <div className='item-quantity'>
                          <input
                            className='quantity-spinner'
                            type='number'
                            min={0}
                            defaultValue={minutes}
                            name='quantity'
                            onChange={(e) => {
                              setMinutes(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className='form-group'>
                        <label className='sub-text'>
                          Promo Percentages (%)
                        </label>
                        <div className='item-quantity'>
                          <input
                            className='quantity-spinner'
                            type='number'
                            min={0}
                            defaultValue={percentages}
                            name='quantity'
                            onChange={(e) => {
                              setPercentages(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      {/* Button Box */}
                      <div className='button-box text-center'>
                        <button type='submit' class='btn btn-danger mt-5'>
                          Submit
                        </button>
                      </div>
                    </form>
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
