import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from './Message'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import { getDate } from '../../util/getDate'
import { createCurrrency } from '../../redux/actions/currencyAction'
import { getRequests } from '../../redux/actions/requestAction'
import StudentPaymentRequest from './StudentPaymentRequest'

export default function PaymentRequest() {
  const dispatch = useDispatch()

  const { loading, error, requests } = useSelector((state) => state.requestList)

  useEffect(() => {
    dispatch(getRequests())
  }, [dispatch])

  return (
    <>
      <div className="container " style={{ padding: '60px 0' }}>
        <div className="title pb-3">Bill</div>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive="sm">
            <thead>
              <tr>
                <th>#</th>

                <th>Request Name</th>
                <th>Amount</th>
                <th>Requested At</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests &&
                requests.map((req, index) => (
                  <StudentPaymentRequest req={req} index={index} />
                ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  )
}
