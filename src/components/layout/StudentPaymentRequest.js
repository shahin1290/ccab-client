import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from './Message'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import { getDate } from '../../util/getDate'
import { createCurrrency } from '../../redux/actions/currencyAction'

export default function PaymentRequest({ req, index }) {
  
  

  return (
    <>
     
        <tr key={req._id}>
          <td>{index + 1}</td>
          <td>{req.name}</td>
          <td>
            <strong>
              {req.amount} {req.currency}
            </strong>
          </td>

          <td>{getDate(req.createdAt)}</td>
          {req.status !== 'Paid' ? (
            <td className="text-danger font-weight-bold">Not Paid</td>
          ) : (
            <td className="text-success font-weight-bold">Paid</td>
          )}
          {req.status !== 'Paid' ? (
            <td>
              <Link
                to={`/checkout/bill/${req._id}`}
                className="text-info font-weight-bold"
              >
                Pay Now
              </Link>
            </td>
          ) : (
            <td className="font-weight-bold">-</td>
          )}
        </tr>
    </>
  )
}
