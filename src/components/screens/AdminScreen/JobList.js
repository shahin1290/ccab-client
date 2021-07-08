import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Table, Row, Col } from 'react-bootstrap'
import Message from '../../layout/Message'
import { getJobs } from '../../../redux/actions/jobAction'
import { useHistory, Link } from 'react-router-dom'
import Loader from '../../layout/Loader'
import { getDate } from '../../../util/getDate'
import download from 'downloadjs'

export default function JobList() {
  const dispatch = useDispatch()
  const history = useHistory()
  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin

  const { jobs, loading } = useSelector((state) => state.jobList)

  useEffect(() => {
    if (userDetail.user_type === 'AdminUser') {
      dispatch(getJobs())
    } else {
      history.push('/')
    }
  }, [dispatch, userDetail])

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userDetail.token
    }
  }

  const DownloadCVHandler = async (job) => {
    // dispatch(DownloadAssignemnt(task.task._id))
    const res = await fetch(
      'http://localhost:5001/api/job/' + job._id + '/download',
      config
    )
    const blob = await res.blob()
    download(blob, job.name + '-cv')
  }

  const DownloadDocHandler = async (job) => {
    // dispatch(DownloadAssignemnt(task.task._id))
    const res = await fetch(
      'http://localhost:5001/api/job/' + job._id + '/download/others',
      config
    )
    const blob = await res.blob()
    download(blob, job.name + '-others')
  }

  return (
    <>
      <div className="container " style={{ padding: '60px 0' }}>
        <div className="title pb-3">Applicants</div>
        <div className="py-2 sub-title"></div>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Created At</th>
              <th>CV</th>
              <th>Others</th>
            </tr>
          </thead>
          <tbody>
            {jobs ? (
              jobs.map((job) => (
                <tr key={job._id}>
                  <td>{jobs.indexOf(job) + 1}</td>
                  <td>{job.name}</td>
                  <td>{job.email}</td>
                  <td>{job.phone}</td>
                  <td>{job.subject}</td>
                  <td>
                    <div style={{ maxHeight: '120px', overflowY: 'scroll' }}>
                      {job.message}
                    </div>
                  </td>
                  <td>{getDate(job.createdAt)}</td>

                  <td>
                    {job.cv_path ? (
                      <Link
                        onClick={() => DownloadCVHandler(job)}
                        className="text-info"
                      >
                        Download
                      </Link>
                    ) : (
                      'NA'
                    )}
                  </td>
                  <td>
                    {job.doc_path ? (
                      <Link
                        className="text-info"
                        onClick={() => DownloadDocHandler(job)}
                      >
                        Download
                      </Link>
                    ) : (
                      'NA'
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <p className="pl-4 py-2 mt-4 text-dark bg-warning ">
                No Request Found!
              </p>
            )}
          </tbody>
        </Table>
      </div>
    </>
  )
}
