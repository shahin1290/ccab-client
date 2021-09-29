import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  updateAppointment,
  getAppointments,
} from "../../redux/actions/appointmentAction";
import { createBrowserHistory } from "history";
import {  Button } from "react-bootstrap";

const UpdateSeviceSession = ({
  selectedAppointment,
  setSelectedAppointment,
  setShowModal,
}) => {
  const dispatch = useDispatch();

  const history = createBrowserHistory({ forceRefresh: true });

  const { success: updateSuccess } = useSelector(
    (state) => state.appointmentUpdate
  );

  const submitHandlar = () => {
    dispatch(updateAppointment(selectedAppointment, selectedAppointment._id));
  };

  useEffect(() => {
    if (updateSuccess) {
      setShowModal({ visible: false });
      dispatch(getAppointments());
    }
  }, [updateSuccess]);

  return (
    <div className="p-3">
      <DatePicker
        selected={selectedAppointment && new Date(selectedAppointment.content)}
        showTimeSelect
        dateFormat='MMMM d, yyyy h:mm aa'
        onChange={(e) =>
          setSelectedAppointment({ ...selectedAppointment, content: e })
        }
      />

      <div className="m-3">
        {" "}
        <Button variant="info" className="mx-auto" onClick={submitHandlar}>Submit</Button>
      </div>
    </div>
  );
};

export default UpdateSeviceSession;
