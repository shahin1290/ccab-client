import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import Message from '../layout/Message'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader'
import { getDate } from '../../util/getDate'

export default function RequestPaymentList() {
  const { loading, error, requests } = useSelector((state) => state.requestList)

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
                <th>Price</th>
                <th>Requested User</th>
                <th>Status</th>
                <th>Requested At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests
                ? requests.map((req) => (
                    <tr key={req._id}>
                      <td>{requests.indexOf(req) + 1}</td>
                      <td>{req.name}</td>
                      <td>{req.amount}</td>
                      <td>{req.requestedUser.name}</td>
                      <td className="text-danger">Not Paid</td>
                      <td>{getDate(req.createdAt)}</td>
                      <td>
                        <Link
                          to={`/checkout/bill/${req._id}`}
                          className="text-info font-weight-bold"
                        >
                          Pay Now
                        </Link>
                      </td>
                    </tr>
                  ))
                : ''}
            </tbody>
          </Table>
        )}
      </div>
    </>
  )
}
