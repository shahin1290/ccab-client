import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from './Message'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import { getDate } from '../../util/getDate'
import { createCurrrency } from '../../redux/actions/currencyAction'

export default function PaymentRequest() {
  const dispatch = useDispatch()

  const { loading, error, requests } = useSelector((state) => state.requestList)
  const {
    loading: currencyLoading,
    success: currencySuccess,
    currency
  } = useSelector((state) => state.currencyCreate)

  useEffect(() => {
    dispatch(createCurrrency())
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
                      <td>
                        <strong>
                          {currencySuccess &&
                            Math.round(currency.data.amount * req.amount)}{' '}
                          {currencySuccess && currency.data.currency}
                        </strong>
                      </td>
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
