import React, { useRef, useState } from 'react'
import IdleTimer from 'react-idle-timer'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { logout } from '../../redux/actions/userAction'
import { Link, useHistory } from 'react-router-dom'

const IdleTimerContainer = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { userDetail } = useSelector((state) => state.userLogin)

  const [show, setShow] = useState(false)
  const [timeout, setTimeOut] = useState(1000 * 60 * 15 )
  const [isTimedOut, setIsTimedOut] = useState(false)


  const idleTimerRef = useRef(null)

  const logoutHandler = () => {
    dispatch(logout())
    setShow(false)
    clearTimeout(idleTimerRef.current);
  }

  const handleOnAction = (event) => {
    setIsTimedOut(false)
  }

  const handleOnActive = (event) => {
    setIsTimedOut(false)
  }

  const handleOnIdle = (event) => {
    if (isTimedOut) {
      history.push('/')
    } else {
      setShow(true)
      setIsTimedOut(true)
      idleTimerRef.current = setTimeout(logoutHandler, 5000 * 60 * 5);
    }
  }

  return (
    <>
      <IdleTimer
        ref={idleTimerRef}
        timeout={timeout}
        element={document}
        onActive={handleOnActive}
        onIdle={handleOnIdle}
        onAction={handleOnAction}
        debounce={250}
      />

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Idle Time</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: 'red' }}>
          <div>Hello {userDetail.name}, Yove've been idle for a while!</div>
          <p>You will be logged out soon</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              logoutHandler()
            }}
          >
            Log me out
          </Button>
          <Button
            variant="success"
            onClick={() => {
              setShow(false)
              clearTimeout(idleTimerRef.current);
            }}
          >
            Keep me signed in
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default IdleTimerContainer
