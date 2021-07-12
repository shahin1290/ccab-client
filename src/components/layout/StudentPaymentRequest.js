import React from 'react'

import { Link } from 'react-router-dom'
import { getDate } from '../../util/getDate'

export default function PaymentRequest({ req, index }) {
  const checkUpcomming = (expiryDate) => {
    return (
      new Date().setMonth(new Date().getMonth() + 1) >
      new Date(expiryDate).getTime()
    )
  }

  return (
    <>
      <tr
        key={req._id}
        className={
          new Date(req.expireAt).getTime() < new Date().getTime()
            ? 'text-danger'
            : ''
        }
      >
        <td>{index + 1}</td>
        <td>{req.name}</td>
        <td>
          <strong>
            {req.amount} {req.currency}
          </strong>
        </td>

        <td>{getDate(req.createdAt)}</td>
        <td>{getDate(req.expireAt)}</td>
        {req.status !== 'Paid' ? (
          <td className="text-danger font-weight-bold">Not Paid</td>
        ) : (
          <td className="text-success font-weight-bold">Paid</td>
        )}
        {req.status !== 'Paid' ? (
          <td>
            {!checkUpcomming(req.expireAt) ? (
              <span className="sub-text">Upcoming...</span>
            ) : (
              <Link
                to={`/checkout/bill/${req._id}`}
                className="text-info font-weight-bold"
              >
                Pay Now
              </Link>
            )}
          </td>
        ) : (
          <td className="font-weight-bold">-</td>
        )}
      </tr>
    </>
  )
}
