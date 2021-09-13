import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPromo } from "../../../redux/actions/promoAction";
import { createBrowserHistory } from "history";

const history = createBrowserHistory({ forceRefresh: true });

export default function AddPromo({ match }) {
  const dispatch = useDispatch();

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

  /*******************/

  /********* State And Var ************/

  const [name, setName] = useState();
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [percentages, setPercentages] = useState(0);

  /*******************/

  useEffect(() => {
    if (promoSuccess) {
      history.push("/promo-list");
    }
  }, [dispatch, match, history, promoSuccess]);

  /********* functions  ************/

  const _FilterUsers = (users, role) => {
    return users.filter((user) => user.user_type === role);
  };

  //handle form submit
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createPromo({
        name,
        days,
        hours,
        minutes,
        percentages
      })
    );
  };

  return (
    <>
      <div className='edit-cource-section'>
        <div className='auto-container'>
          {/* Sec Title */}
          <div className='sec-title'>
            <div className='clearfix'>
              <div className='pull-left'>
                <div className='title'>Add promo</div>
              </div>
            </div>
          </div>
          <div>
            {error ? (
              <p className='text-danger bg-light p-2 '>{error}</p>
            ) : promoSuccess ? (
              <p className='text-success bg-light p-2 '>
                promo Send successfully
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
                      <div className='form-group'>
                        <label className='sub-text'>Promo Name</label>
                        <input
                          class='form-control'
                          type='text'
                          name='service-name'
                          placeholder='Promo Name'
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
    </>
  );
}
