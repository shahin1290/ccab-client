import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getServiceCategories } from '../../redux/actions/serviceCategoryAction'

import { Row, Col, Button } from 'react-bootstrap'
import Select from 'react-select'

const style = {
  control: (base) => ({
    ...base,
    border: 0,
    // This line disable the blue border
    boxShadow: 'none'
  })
}

const labelWithIcon = (
  <span className="fas fa-book-open">
    <span className="sub-title pl-2">choose subject</span>
  </span>
)

const ServiceBanner = () => {
  const dispatch = useDispatch()
  const [selectedOption, setSelectedOption] = useState(null)

  const {
    serviceCategories,
    loading: categoryListLoading,
    error: categoryListError
  } = useSelector((state) => state.serviceCategoryList)

  const options =
    serviceCategories &&
    serviceCategories.length > 0 &&
    serviceCategories.map((c) => ({ value: c.name, label: c.name }))

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
            <div className=" select-box-content d-flex justify-content-center mt-3">
              <Select
                className="w-75"
                options={options}
                styles={style}
                defaultValue={{ label: labelWithIcon }}
                onChange={setSelectedOption}
              />

              <Button
                variant="danger"
                href={`/service-grid/${selectedOption && selectedOption.value}`}
              >
                Show result
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceBanner
