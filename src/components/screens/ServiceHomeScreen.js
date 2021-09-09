import React, { useState } from 'react'
import ServiceBanner from '../layout/ServiceBanner'
import ServiceClasses from '../layout/ServiceClasses'
import ServiceBenefits from '../layout/ServiceBenefits'
import ServiceForm from '../layout/ServiceForm';
import ServiceGoal from '../layout/ServiceGoal'


const ServiceHome = () => {
  return (
    <>
      <div className="bg-white">
        <ServiceBanner />
        <ServiceGoal />
        <ServiceClasses />
        <ServiceBenefits />
        <ServiceForm />
      </div>
    </>
  )
}

export default ServiceHome
