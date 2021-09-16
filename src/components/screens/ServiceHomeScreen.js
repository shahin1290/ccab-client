import React, { useState } from "react";
import ServiceBanner from "../layout/ServiceBanner";
import ServiceClasses from "../layout/ServiceClasses";
import ServiceBenefits from "../layout/ServiceBenefits";
import ServiceContact from "../layout/ServiceContact";
import ServiceGoal from "../layout/ServiceGoal";
import ServiceSteps from "../layout/ServiceSteps";
import ServiceVideoChat from "../layout/ServiceVideoChat";
import ServiceAssistance from "../layout/ServiceAssistance";

const ServiceHome = () => {
  return (
    <>
      <div className='bg-white'>
        <ServiceBanner />
        <div style={{ background: "#F8F9FD"}}>
          <div className='service-classes'>
            <ServiceClasses />
          </div>
          <ServiceVideoChat />

          <ServiceAssistance />
        </div>
        {/* <ServiceGoal />
        <ServiceBenefits /> */}
        <ServiceSteps />
        <ServiceContact />
      </div>
    </>
  );
};

export default ServiceHome;
