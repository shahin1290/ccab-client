import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getServiceCategories } from '../../redux/actions/serviceCategoryAction'
import { Row, Col, Button } from 'react-bootstrap'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'

const style = {
  control: (base) => ({
    ...base,
    border: 0,
    // This line disable the blue border
    boxShadow: 'none'
  })
}

const error = {
  control: (base) => ({
    ...base,
    border: '1px solid red'
  })
}

const labelWithIcon = (
  <span className="fas fa-book-open">
    <span className="sub-title pl-2">choose subject</span>
  </span>
)

const ServiceBanner = () => {
  let history = useHistory()
  const dispatch = useDispatch()
  const [selectedOption, setSelectedOption] = useState(null)
  const [colorError, setColorError] = useState(false)

  const {
    serviceCategories,
    loading: categoryListLoading,
    error: categoryListError
  } = useSelector((state) => state.serviceCategoryList)

  const options =
    serviceCategories &&
    serviceCategories.length > 0 &&
    serviceCategories.map((c) => ({ value: c.name, label: c.name }))

  const submitHandler = (e) => {
    e.preventDefault()

    if (!(selectedOption && selectedOption.value)) {
      setColorError(true)
    } else {
      setColorError(false)
      history.push(`/service-grid/${selectedOption && selectedOption.value}`)
    }
  }

  useEffect(() => {
    dispatch(getServiceCategories())
  }, [dispatch])

  return (
    <div className="auto-container mb-5">
      <div class="service-banner-container ">
        <div className="service-banner-box ">
          <div className="service-banner-text">
            Tutoring That Gives Best Result
          </div>

          <div className="select-box mt-5">
            <form
              onSubmit={submitHandler}
              className=" select-box-content d-flex justify-content-center mt-3"
            >
              <Select
                options={options}
                styles={!colorError ? style : error}
                defaultValue={{ label: labelWithIcon }}
                onChange={setSelectedOption}
                isSearchable={true}
                className="w-50 mr-5"
              />

              <Button
                variant="danger"
                className="ml-5 pl-3"
                type="submit"
                /* href={`/service-grid/${selectedOption && selectedOption.value}`} */
              >
                Show the result &gt;
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceBanner
