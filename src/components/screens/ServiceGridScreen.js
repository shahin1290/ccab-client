import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getServiceList } from "../../redux/actions/serviceAction";
import Message from "../layout/Message";
import Loader from "../layout/Loader";

export default function ServiceGridScreen({ match }) {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const { serviceList, loading, error } = useSelector(
    (state) => state.serviceList
  );

  const filterSubscriptionService = (serviceList) => {
    return serviceList.filter((service) => {
      const titleFirstWord = service.name
        .toLowerCase()
        .split(" ")[0]
        .toLowerCase();

      return !["silver", "golden", "diamond"].includes(titleFirstWord);
    });
  };

  /*******************Functions *************/
  const categoryArray = match.params.category
    ? [match.params.category]
    : [
        ...new Set(
          filterSubscriptionService(serviceList)
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              }
              if (val.name.toLowerCase().includes(searchTerm)) {
                return val;
              }
            })
            .map((item) => item.category)
        ),
      ];

  const categoryServices = (category) =>
    filterSubscriptionService(serviceList).filter((service) => {
      if (searchTerm === "") {
        return service.category === category;
      }
      if (service.name.toLowerCase().includes(searchTerm)) {
        return service.category === category;
      }
    });

  /*  const pagination = (category) => {
    const filteredservices = serviceList.filter((service) => {
      if (searchTerm === '') {
        return service.category === category
      }
      if (service.name.toLowerCase().includes(searchTerm)) {
        return service.category === category
      }
    })

    let pageNumbers = []

    for (
      let i = 1;
      i <= Math.ceil(filteredservices.length / servicesPerPage);
      i++
    ) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  const paginate = (category, pageNumber) => {
    const found = currentPage.map((el) =>
      el.category !== category ? el : { ...el, pageNumber }
    )

    if (found) {
      setCurrentPage(found)
    }
  }

  const findPageNumber = (category) => {
    return (
      currentPage.length &&
      currentPage.find((page) => page.category === category).pageNumber
    )
  } */

  useEffect(() => {
    dispatch(getServiceList());
  }, [dispatch, searchTerm]);

  /*  useEffect(() => {
    const currentservicesArray = []
    categoryArray.map((category) => {
      currentservicesArray.push({ category: category, pageNumber: 1 })
    })

    setCurrentPage(currentservicesArray)
  }, [serviceList]) */

  return (
    <>
      <section className='page-title'>
        <div className='auto-container'>
          <div className='search-boxed'>
            <div className='search-box'>
              <div className='form-group'>
                <input
                  type='search'
                  name='search-field'
                  placeholder='Search with service name'
                  required
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type='submit'>
                  <span className='icon fa fa-search'></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Sidebar Page Container */}
      <div className='sidebar-page-container'>
        <div
          className='patern-layer-one paroller'
          data-paroller-factor='0.40'
          data-paroller-factor-lg='0.20'
          data-paroller-type='foreground'
          data-paroller-direction='vertical'
          style={{ backgroundImage: "url(images/icons/icon-1.png)" }}
        ></div>
        <div
          className='patern-layer-two paroller'
          data-paroller-factor='0.40'
          data-paroller-factor-lg='-0.20'
          data-paroller-type='foreground'
          data-paroller-direction='vertical'
          style={{ backgroundImage: "url(images/icons/icon-2.png)" }}
        ></div>
        <div className='circle-one'></div>
        <div className='circle-two'></div>
        <div className='auto-container'>
          <div className='row clearfix'>
            {/* Content Side  */}
            <div className='content-side col-lg-12 col-md-12 col-sm-12'>
              <div className='our-services'>
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message>{error}</Message>
                ) : categoryArray.length ? (
                  categoryArray.map((category) => {
                    return (
                      <div>
                        {/* Options View  */}
                        <div className='options-view'>
                          <div className='clearfix'>
                            <div className='pull-left'>
                              <div className='title pt-5 text-capitalize'>
                                {category} services
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='row clearfix'>
                          {categoryServices(category).length ? (
                            categoryServices(category).map((service) => {
                              return (
                                <div
                                  className='cource-block-two col-lg-3 col-md-6 col-sm-12'
                                  key={service._id}
                                >
                                  <div className='inner-box'>
                                    <div className='image'>
                                      <Link to={`/services/${service._id}`}>
                                        <img
                                          src={
                                            "https://server.ccab.tech/uploads/Service/" +
                                            service.img_path
                                          }
                                          alt=''
                                          style={{
                                            "max-height": "150px",
                                          }}
                                        />
                                      </Link>
                                    </div>
                                    <div className='lower-content'>
                                      <div>
                                        <Link
                                          className='sub-title'
                                          to={`/services/${service._id}`}
                                        >
                                          {service.name}
                                        </Link>
                                      </div>
                                      <div className='text'>
                                        <span
                                          className='sub-text d-inline-block text-truncate'
                                          style={{ maxWidth: "240px" }}
                                        >
                                          {service.description}
                                        </span>
                                      </div>
                                      <div className='clearfix'>
                                        <div className='pull-left'>
                                          <div className='students'>
                                            {service.instructors.length}{" "}
                                            Instructors
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <p className='pl-4 py-2 mt-4 text-dark bg-warning '>
                              No service found !
                            </p>
                          )}
                        </div>

                        {/* Pagination  */}
                        {/*    <div className="styled-pagination">
                          <ul className="clearfix">
                            <li className="prev">
                              <a
                                onClick={() => {
                                  const pageNumber =
                                    category && findPageNumber(category)
                                  pageNumber !== 1 &&
                                    paginate(category, pageNumber - 1)
                                }}
                              >
                                <span className="fa fa-angle-left"></span>{' '}
                              </a>
                            </li>
                            {pagination(category).map((pageNumber) => {
                              return (
                                <li
                                  key={pageNumber}
                                  className={
                                    findPageNumber(category) === pageNumber &&
                                    'active'
                                  }
                                >
                                  <a
                                    onClick={() =>
                                      paginate(category, pageNumber)
                                    }
                                  >
                                    {pageNumber}
                                  </a>
                                </li>
                              )
                            })}

                            <li className="next">
                              <a
                                onClick={() => {
                                  const pageNumber = findPageNumber(category)
                                  categoryservices(category).length === 3 &&
                                    paginate(category, pageNumber + 1)
                                }}
                              >
                                <span className="fa fa-angle-right"></span>{' '}
                              </a>
                            </li>
                          </ul>
                        </div> */}
                      </div>
                    );
                  })
                ) : (
                  <p className='pl-4 py-2 mt-4 text-dark bg-warning '>
                    No service found !
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular services  */}
      <section className='popular-services-section sidebar-page-container'>
        <div
          className='patern-layer-one paroller'
          data-paroller-factor='0.40'
          data-paroller-factor-lg='0.20'
          data-paroller-type='foreground'
          data-paroller-direction='vertical'
          style={{ backgroundImage: "url(images/icons/icon-1.png)" }}
        ></div>
        <div
          className='patern-layer-two paroller'
          data-paroller-factor='0.40'
          data-paroller-factor-lg='-0.20'
          data-paroller-type='foreground'
          data-paroller-direction='vertical'
          style={{ backgroundImage: "url(images/icons/icon-2.png)" }}
        ></div>
        <div className='auto-container'>
          <div className='title pb-3'>Most Popular services</div>
          <div className='row clearfix'>
            <div className='col-lg-9 col-md-12 col-sm-12'>
              <div className='row clearfix'>
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message>{error}</Message>
                ) : filterSubscriptionService(serviceList).length ? (
                  <div className='cource-block-two col-lg-4 col-md-6 col-sm-12'>
                    <div
                      className='inner-box wow fadeInLeft'
                      data-wow-delay='0ms'
                      data-wow-duration='1500ms'
                    >
                      <div className='image'>
                        <Link to='/service/1/details'>
                          <img
                            src={
                              "https://server.ccab.tech/uploads/Bootcamp/" +
                              filterSubscriptionService(serviceList)[0].img_path
                            }
                            alt=''
                          />
                        </Link>
                      </div>
                      <div className='lower-content'>
                        <div>
                          <Link
                            className='sub-title'
                            to={`/services/${serviceList[0]._id}`}
                          >
                            {filterSubscriptionService(serviceList)[0].name}
                          </Link>
                        </div>
                        <div className='text'>
                          <span
                            className='sub-text d-inline-block text-truncate'
                            style={{ maxWidth: "240px" }}
                          >
                            {
                              filterSubscriptionService(serviceList)[0]
                                .description
                            }
                          </span>
                        </div>
                        <div className='clearfix'>
                          <div className='pull-left'>
                            <div className='students'>
                              {serviceList[0].instructors.length} Instructors
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Popular services  */}
    </>
  );
}
