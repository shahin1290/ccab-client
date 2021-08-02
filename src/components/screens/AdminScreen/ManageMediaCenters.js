import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  getMediaCenterListForAdmin,
  updateMediaCenter,
  createMediaCenter,
  deleteMediaCenter
} from '../../../redux/actions/mediaCenterAction'
import Message from '../../layout/Message'
import Loader from '../../layout/Loader'
import { OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap'
import { Table, Col, Row, Modal, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

export default function MangeMediaCenters({ match }) {
  const dispatch = useDispatch()

  const pageNumber = match.params.pageNumber || 1

  /***********   Calling Reducer  ***************/

  // Admin mediaCenter list Reducer
  const {
    loading: Deleteloading,
    error: DeleteError,
    successDelete
  } = useSelector((state) => state.mediaCenterDelete)
  const {
    loading: Updateloading,
    error: UpdateError,
    success: updateSuccess
  } = useSelector((state) => state.mediaCenterUpdate)


  // Admin mediaCenter list Reducer
  const { mediaCenterList, page, pages, loading, error } = useSelector(
    (state) => state.adminmediaCenterList
  )

  // add mediaCenter  Reducer
  const { loading: Addloading, error: AddError } = useSelector(
    (state) => state.mediaCenterCreate
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


  /* delete couse handlers  */
  const handleCloseDelete = () => setShow(false)
  const handleShowDelete = () => setShow(true)

  /* add mediaCenter handles */
  const handleCloseAdd = () => {
    setShowAdd(false)
    setWeeks('')
    setAddnewmediaCenterErr('')
    dispatch({ type: 'mediaCenter_ADD_RESET' })
  }

  const handleShowAdd = () => setShowAdd(true)
  // add mediaCenter  function
  const _addBootcampHandler = () => {
    if (!weeks) {
      setAddnewmediaCenterErr('weeks should not be empty')
    } else {
      dispatch(createMediaCenter({ weeks: weeks }))
      dispatch(getMediaCenterListForAdmin(pageNumber))
      setWeeks('')
      handleCloseAdd()
    }
  }

  // publish mediaCenter
  const publishhnadler = (mediaCenter) => {
    //console.log({...mediaCenter , published:true,});
    dispatch(
      updateMediaCenter(
        {
          ...mediaCenter,
          students: JSON.stringify(mediaCenter.students),
          published: true
        },
        mediaCenter._id
      )
    )
  }

  // Withhold  mediaCenter
  const WithholdHnadler = (mediaCenter) => {
    //console.log({...mediaCenter , published:true,});
    dispatch(
      updateMediaCenter(
        { name: mediaCenter.name, video_path: mediaCenter.video_path, published: false },
        mediaCenter._id
      )
    )
  }

  /*****************************************************************/

  useEffect(() => {
    dispatch(getMediaCenterListForAdmin(pageNumber))
  }, [dispatch, pageNumber, successDelete, updateSuccess])

  /*******************  State ********************* */
  /* to show delete mediaCenter model */
  const [show, setShow] = useState(false)

  /* to show add mediaCenter model */
  const [showAdd, setShowAdd] = useState(false)

  const [weeks, setWeeks] = useState('')
  const [AddnewmediaCenterErr, setAddnewmediaCenterErr] = useState('')
  // item id
  const [DeletedmediaCenter, setDeletedmediaCenter] = useState('')
  //console.log(DeletedmediaCenter);

  /************************************************** */

  //console.log(mediaCenterList);
  return (
    <>
      {/* Manage Cource Section */}
      <div className="manage-cource-section">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="sec-title">
            <div className="clearfix">
              <div className="pull-left">
                <div className="title">Manage Media Centers</div>
              </div>
              <div className="pull-right">
                {/* Add couse Button */}
                <a
                  href="/manage-media-center-content"
                  className="btn btn-danger bordered mr-1 "
                >
                  Update Content
                </a>

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
                    'Add mediaCenter'
                  )}
                </a>

                <Modal show={showAdd} onHide={handleCloseAdd}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add New mediaCenter</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {(AddnewmediaCenterErr || AddError) && (
                      <Message variant="danger">
                        {AddnewmediaCenterErr || AddError}
                      </Message>
                    )}

                    <label className="d-block">
                      Enter the total weeks to the new mediaCenter :
                    </label>
                    <input
                      type="number"
                      value={weeks}
                      className="border py-2"
                      onChange={(e) => {
                        setAddnewmediaCenterErr('')
                        setWeeks(e.target.value)
                      }}
                    />
                    <p>You need to update the mediaCenter after you add it!</p>
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
                      <h5>Weeks</h5>
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
                    ) : mediaCenterList.length ? (
                      mediaCenterList.map((item) => {
                        //console.log(item);
                        return (
                          <tr>
                            <th className="title" scope="col">
                              {item.name}
                            </th>
                          
                            <th className="sales" scope="col">
                              {item.weeks}
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
                              <Link to={'/admin-media-center-update/' + item._id}>
                                <i className="fas fa-edit"></i>
                              </Link>

                              {/* delete mediaCenter button */}
                              <a>
                                <i
                                  className="fas fa-trash-alt"
                                  onClick={() => {
                                    setDeletedmediaCenter(item)
                                    handleShowDelete()
                                  }}
                                ></i>
                              </a>

                              <Modal show={show} onHide={handleCloseDelete}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Deleting mediaCenter</Modal.Title>
                                </Modal.Header>
                                <Modal.Body style={{ color: 'red' }}>
                                  Are you sure to delete {DeletedmediaCenter.name} ?
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
                                      dispatch(deleteMediaCenter(DeletedmediaCenter._id))

                                      toast.info(
                                        DeletedmediaCenter.name +
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
                <li className={x + 1 === page && 'active'}>
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
