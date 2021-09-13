import React from "react";
import {
  ScheduleComponent,
  Inject,
  Day,
  Week,
  Month,
  Agenda,
  WorkWeek,
} from "@syncfusion/ej2-react-schedule";

const Scheduler = () => {
  return (
    <div>
      <ScheduleComponent>
        <Inject services={[Day, Week, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
};

export default Scheduler;
