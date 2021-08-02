import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getMediaCenterList } from '../../../redux/actions/mediaCenterAction'
import Message from '../../layout/Message'
import Loader from '../../layout/Loader'
import { Table, Nav } from 'react-bootstrap'
import { getDate } from '../../../util/getDate'

export default function ManageMediaCenterContent() {
  const dispatch = useDispatch()
  const { userDetail } = useSelector((state) => state.userLogin)

  const { mediaCenterList, loading, error } = useSelector(
    (state) => state.mediaCenterList
  )

  console.log(mediaCenterList);

  // count the current week for each mediaCenter
  const getWeeksLeft = (StartDate) => {
    let d = new Date(StartDate)
    let timePassed = new Date().getTime() - d.getTime()
    return Math.ceil(timePassed / 1000 / 60 / 60 / 24 / 7)
  }

  useEffect(() => {
    dispatch(getMediaCenterList())
  }, [dispatch])

  const filterMentorMediaCenters = () =>
    mediaCenterList.filter((mediaCenter) => mediaCenter.mentor._id === userDetail._id)
  return (
    <>
      {/* Manage Cource Section */}
      <div className="manage-cource-section">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="sec-title">
            <div className="clearfix">
              <div className="pull-left">
                <div className="title ">Manage Media Center Content</div>
              </div>
            </div>
          </div>
          <div className="inner-container">
            <div className="table-responsive">
              <Table responsive="sm">
                <thead>
                  <tr>
                    <th>
                      <div className="text">Title</div>
                    </th>
                  
                    <th>
                      <div className="text">Weeks</div>
                    </th>
                    <th>
                      <div className="text">Status</div>
                    </th>
                    <th>
                      <div className="text">Content</div>
                    </th>
                    <th>
                      <div className="text">Tasks</div>
                    </th>
                    <th>
                      <div className="text">Quizzes</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {loading ? (
                      <Loader />
                    ) : error ? (
                      <Message>{error}</Message>
                    ) : filterMentorMediaCenters().length > 0 ? (
                      filterMentorMediaCenters().map((item) => {
                        //console.log(item);
                        return (
                          <tr key={item._id}>
                            <th className="text" scope="col">
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
                            <th>
                              {' '}
                              <Nav.Link
                                href={`/update-media-center-day-content/${item._id}`}
                              >
                                <i className="fas fa-edit">Edit content</i>
                              </Nav.Link>
                            </th>
                            <th>
                              <Nav.Link href={`/mentor-task-list/${item._id}`}>
                                <i className="fas fa-edit">Edit Task</i>
                              </Nav.Link>
                            </th>
                            <th>
                              <Nav.Link href={`/mentor-quiz-list/${item._id}`}>
                                <i className="fas fa-edit">Edit Quiz</i>
                              </Nav.Link>
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
        </div>
      </div>
      {/* End Manage Cource Section */}
    </>
  )
}
