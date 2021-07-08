import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  getServiceListForAdmin,
  updateService,
  createService,
  deleteService
} from '../../../redux/actions/serviceAction'
import Message from '../../layout/Message'
import Loader from '../../layout/Loader'
import { OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap'
import { Table, Modal, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

export default function MangeService({ match }) {
  const dispatch = useDispatch()

  const pageNumber = match.params.pageNumber || 1

  /***********   Calling Reducer  ***************/

  // Admin service list Reducer
  const {
    loading: Deleteloading,
    error: DeleteError,
    successDelete
  } = useSelector((state) => state.serviceDelete)
  const {
    loading: Updateloading,
    error: UpdateError,
    success: updateSuccess
  } = useSelector((state) => state.serviceUpdate)

  // Admin service list Reducer
  const { serviceList, page, pages, loading, error } = useSelector(
    (state) => state.adminServiceList
  )

  // add service  Reducer
  const { loading: Addloading, error: AddError } = useSelector(
    (state) => state.serviceCreate
  )
  /************************************************************** */

  /************* Functions *************/
  // tooltip function
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Publish
    </Tooltip>
  )

  const renderTooltipWithHold = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Withhold
    </Tooltip>
  )

  // get date format
  const getDate = (date) => {
    let d = new Date(date)
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  }

  /* delete couse handlers  */
  const handleCloseDelete = () => setShow(false)
  const handleShowDelete = () => setShow(true)

  /* add service handles */
  const handleCloseAdd = () => {
    setShowAdd(false)
    dispatch({ type: 'service_ADD_RESET' })
  }

  const handleShowAdd = () => setShowAdd(true)
  // add service  function
  const _addBootcampHandler = () => {
    dispatch(createService())
    dispatch(getServiceListForAdmin(pageNumber))
    handleCloseAdd()
  }

  // publish service
  const publishhnadler = (service) => {
    //console.log({...service , published:true,});
    dispatch(
      updateService(
        {
          ...service,
          students: JSON.stringify(service.students),
          instructors: JSON.stringify(service.instructors),
          published: true
        },
        service._id
      )
    )
  }

  // Withhold  service
  const WithholdHnadler = (service) => {
    //console.log({...service , published:true,});
    dispatch(
      updateService(
        {
          name: service.name,
          published: false
        },
        service._id
      )
    )
  }

  /**************************************************************** */

  useEffect(() => {
    dispatch(getServiceListForAdmin(pageNumber))
  }, [dispatch, pageNumber, successDelete, updateSuccess])

  /*******************  State ********************* */
  /* to show delete service model */
  const [show, setShow] = useState(false)

  /* to show add service model */
  const [showAdd, setShowAdd] = useState(false)

  // item id
  const [Deletedservice, setDeletedservice] = useState('')
  //console.log(Deletedservice);

  /************************************************** */

  //console.log(serviceList);
  return (
    <>
      {/* Manage Cource Section */}
      <div className="manage-cource-section">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="sec-title">
            <div className="clearfix">
              <div className="pull-left">
                <div className="title">Manage Services</div>
              </div>
              <div className="pull-right ">
                {/* Add couse Button */}

                <a
                  href="#"
                  className="btn btn-danger bordered "
                  onClick={handleShowAdd}
                >
                  {Addloading ? (
                    <>
                      {' '}
                      <span className="mx-1">Adding</span>
                      <Spinner animation="border" role="status" size="sm">
                        <span className="sr-only">Loading...</span>
                      </Spinner>{' '}
                    </>
                  ) : (
                    'Add service'
                  )}
                </a>

                <Modal show={showAdd} onHide={handleCloseAdd}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add New service</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="sub-text">
                      Please press ok to add a new service ?
                    </div>
                    <div className="sub-title">
                      You need to update the service after you add it!
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                      Close
                    </Button>
                    <Button variant="danger" onClick={_addBootcampHandler}>
                      Ok
                    </Button>
                  </Modal.Footer>
                </Modal>

                {/* Manage Categories */}

                <Link
                  to="/manage-service-category"
                  className="btn btn-info bordered ml-2"
                >
                  Manage Categories
                </Link>
              </div>
            </div>
          </div>

          <div className="inner-container">
            <div className="table-responsive">
              {UpdateError ? <p className="">{UpdateError}</p> : null}
              <Table responsive="sm">
                <thead>
                  <tr>
                    <th>
                      <h5>Title</h5>
                    </th>
                    <th>
                      <h5>Created At</h5>
                    </th>

                    <th>
                      <h5>Status</h5>
                    </th>
                    <th>
                      <h5>Action</h5>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {loading ? (
                      <Loader />
                    ) : error ? (
                      <Message>{error}</Message>
                    ) : serviceList.length ? (
                      serviceList.map((item) => {
                        //console.log(item);
                        return (
                          <tr key={item._id}>
                            <th className="title" scope="col">
                              {item.name}
                            </th>
                            <th className="post-date" scope="col">
                              {getDate(item.createdAt)}
                            </th>

                            <th className="category" scope="col">
                              {item.published ? (
                                <span className="text-success">Published</span>
                              ) : (
                                <span className="text-danger">
                                  Not Published
                                </span>
                              )}
                            </th>
                            <th className="actions" scope="col">
                              <Link to={'/admin-service-update/' + item._id}>
                                <i className="fas fa-edit"></i>
                              </Link>

                              {/* delete service button */}
                              <a>
                                <i
                                  className="fas fa-trash-alt"
                                  onClick={() => {
                                    setDeletedservice(item)
                                    handleShowDelete()
                                  }}
                                ></i>
                              </a>

                              <Modal show={show} onHide={handleCloseDelete}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Deleting service</Modal.Title>
                                </Modal.Header>
                                <Modal.Body style={{ color: 'red' }}>
                                  Are you sure to delete {Deletedservice.name} ?
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant="secondary"
                                    onClick={handleCloseDelete}
                                  >
                                    Close
                                  </Button>
                                  <Button
                                    variant="danger"
                                    onClick={() => {
                                      dispatch(
                                        deleteService(Deletedservice._id)
                                      )

                                      toast.info(
                                        Deletedservice.name +
                                          ' successfuly removed',
                                        {
                                          position: toast.POSITION.BOTTOM_RIGHT
                                        }
                                      )
                                      setShow(false)
                                    }}
                                  >
                                    Ok
                                  </Button>
                                </Modal.Footer>
                              </Modal>

                              {/* publish Button and view button */}
                              {item.published ? (
                                <OverlayTrigger
                                  placement="bottom"
                                  text="Withhold"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={renderTooltipWithHold}
                                >
                                  <a
                                    onClick={() => {
                                      WithholdHnadler(item)
                                    }}
                                  >
                                    <i className="fas fa-minus-circle"></i>
                                  </a>
                                </OverlayTrigger>
                              ) : (
                                <>
                                  {/* Tool tips for publishing action */}
                                  <OverlayTrigger
                                    placement="bottom"
                                    text="Publish"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip}
                                  >
                                    <a
                                      onClick={() => {
                                        publishhnadler(item)
                                      }}
                                    >
                                      <i className="fas fa-upload"></i>
                                    </a>
                                  </OverlayTrigger>
                                </>
                              )}
                            </th>
                          </tr>
                        )
                      })
                    ) : null}
                  </>
                </tbody>
              </Table>
            </div>
          </div>
          {/* Post Share Options */}
          {/* Post Share Options */}
          <div className="styled-pagination">
            <ul className="clearfix">
              <li className="prev">
                <Link to={`/admin-page/${page > 1 ? page - 1 : 1}`}>
                  <span className="fa fa-angle-left"></span>{' '}
                </Link>
              </li>
              {[...Array(pages).keys()].map((x) => (
                <li key={x} className={x + 1 === page && 'active'}>
                  <Link key={x + 1} to={`/admin-page/${x + 1}`}>
                    {x + 1}
                  </Link>
                </li>
              ))}

              <li className="next">
                <Link to={`/admin-page/${page === pages ? page : page + 1}`}>
                  <span className="fa fa-angle-right"></span>{' '}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* End Manage Cource Section */}
      <ToastContainer />
    </>
  )
}
