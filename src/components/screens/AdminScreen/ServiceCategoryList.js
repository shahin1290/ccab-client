import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Table,
  Modal,
  Button,
  Spinner,
  Container,
  Row,
  Col
} from 'react-bootstrap'
import Message from '../../layout/Message'
import {
  getServiceCategories,
  deleteServiceCategory,
  createServiceCategory,
  getServiceCategoryDetails,
  updateServiceCategory
} from '../../../redux/actions/serviceCategoryAction'
import { useHistory, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Loader from '../../layout/Loader'

export default function ServiceCatyegoryList() {
  const dispatch = useDispatch()
  const history = useHistory()
  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin

  /* to show add ServiceCategory model */
  const [showAdd, setShowAdd] = useState(false)

  /* add ServiceCategory handles */
  const handleCloseAdd = () => {
    setShowAdd(false)
    setAddnewServiceCategoryErr('')
  }

  const handleShowAdd = () => setShowAdd(true)

  const [name, setName] = useState('')
  const [AddnewServiceCategoryErr, setAddnewServiceCategoryErr] = useState('')

  // add ServiceCategory  function
  const _addCategoryHandler = () => {
    if (!name) {
      setAddnewServiceCategoryErr('name should not be empty')
    } else {
      dispatch(createServiceCategory({ name }))

      handleCloseAdd()
    }
  }

  /* to show add ServiceCategory model */
  const [showEdit, setShowEdit] = useState(false)

  /* Edit ServiceCategory handles */
  const handleCloseEdit = () => {
    setShowEdit(false)
    setEditnewServiceCategoryErr('')
  }

  const handleShowEdit = () => setShowEdit(true)

  const [editName, setEditName] = useState('')
  const [editId, setEditId] = useState('')

  const [EditnewServiceCategoryErr, setEditnewServiceCategoryErr] = useState('')

  // Edit ServiceCategory  function
  const _editCategoryHandler = (id) => {
    if (!editName) {
      setEditnewServiceCategoryErr('name should not be empty')
    } else {
      dispatch(updateServiceCategory({ name: editName }, editId))

      handleCloseEdit()
    }
  }

  // add ServiceCategory  Reducer
  const {
    loading: Addloading,
    error: AddError,
    success: AddSuccess
  } = useSelector((state) => state.serviceCategoryCreate)

  const {
    serviceCategories,
    loading: categoryListLoading,
    error: categoryListError
  } = useSelector((state) => state.serviceCategoryList)

  const {
    loading: Deleteloading,
    error: DeleteError,
    successDelete
  } = useSelector((state) => state.serviceCategoryDelete)

  const { success: updateSuccess, error: updateError } = useSelector(
    (state) => state.serviceCategoryUpdate
  )

  useEffect(() => {
    if (userDetail.user_type === 'AdminUser') {
      dispatch(getServiceCategories())
    } else {
      history.push('/')
    }
  }, [dispatch, userDetail, AddSuccess, successDelete, updateSuccess])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure ? ')) {
      dispatch(deleteServiceCategory(id))
      toast.info('User successfuly removed', {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
  }

  return (
    <>
      <div className="container " style={{ padding: '60px 0' }}>
        <div className="title pb-3">Category List</div>

        <a
          href="#"
          className="btn btn-danger bordered "
          onClick={handleShowAdd}
        >
          {Addloading ? (
            <span>
              {' '}
              <span className="mx-1">Adding</span>
              <Spinner animation="border" role="status" size="sm">
                <span className="sr-only">Loading...</span>
              </Spinner>{' '}
            </span>
          ) : (
            'Add Category'
          )}
        </a>

        {/* Add Modal */}

        <Modal show={showAdd} onHide={handleCloseAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Service Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {(AddnewServiceCategoryErr || AddError) && (
              <Message variant="danger">
                {AddnewServiceCategoryErr || AddError}
              </Message>
            )}

            <label className="d-block">
              Enter the unique name of the Service Category :
            </label>
            <input
              type="text"
              value={name}
              className="border py-2"
              onChange={(e) => {
                setAddnewServiceCategoryErr('')
                setName(e.target.value)
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAdd}>
              Close
            </Button>
            <Button variant="danger" onClick={_addCategoryHandler}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Modal */}

        <Modal show={showEdit} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit New Service Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {(EditnewServiceCategoryErr || updateError) && (
              <Message variant="danger">
                {EditnewServiceCategoryErr || updateError}
              </Message>
            )}

            <label className="d-block">
              Enter the unique name of the Service Category :
            </label>
            <input
              type="text"
              value={editName}
              className="border py-2"
              onChange={(e) => {
                setEditnewServiceCategoryErr('')
                setEditName(e.target.value)
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            </Button>
            <Button variant="danger" onClick={_editCategoryHandler}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>#</th>

              <th>Catyegory Name</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categoryListLoading ? (
              <Loader />
            ) : categoryListError ? (
              <Message>{categoryListError}</Message>
            ) : serviceCategories ? (
              serviceCategories.map((req) => (
                <tr key={req._id}>
                  <td>{serviceCategories.indexOf(req) + 1}</td>
                  <td>{req.name}</td>

                  <td>
                    <Container>
                      <Row>
                        <Col style={{ padding: '0px' }}>
                          <a onClick={() => deleteHandler(req._id)}>
                            <i className="fas fa-trash-restore text-danger"></i>
                          </a>
                        </Col>

                        <Col style={{ padding: '0px' }}>
                          <a
                            onClick={() => {
                              setEditName(req.name)
                              setEditId(req._id)
                              handleShowEdit()
                            }}
                          >
                            <i className="fas fa-edit text-danger"></i>
                          </a>
                        </Col>
                      </Row>
                    </Container>
                  </td>
                </tr>
              ))
            ) : (
              <p className="pl-4 py-2 mt-4 text-dark bg-warning ">
                No serviceCatyegory Found!
              </p>
            )}
          </tbody>
        </Table>
      </div>
      {<ToastContainer />}
    </>
  )
}
