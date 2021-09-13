import React, { useState } from "react";
import ServiceBanner from "../layout/ServiceBanner";
import ServiceClasses from "../layout/ServiceClasses";
import ServiceBenefits from "../layout/ServiceBenefits";
import ServiceForm from "../layout/ServiceForm";
import ServiceGoal from "../layout/ServiceGoal";
import ServiceSteps from "../layout/ServiceSteps";

const ServiceHome = () => {
  return (
    <>
      <div className='bg-white'>
        <ServiceBanner />
        <ServiceGoal />
        <ServiceClasses />
        <ServiceBenefits />
        <ServiceSteps />
        <ServiceForm />
      </div>
    </>
  );
};

export default ServiceHome;
