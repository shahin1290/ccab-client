import React, { useState } from 'react'
import ServiceBanner from '../layout/ServiceBanner'
import ServiceFocus from '../layout/ServiceFocus'
import ServiceSteps from '../layout/ServiceSteps'
import ServiceForm from '../layout/ServiceForm';

const ServiceHome = () => {
  return (
    <>
      <div className="bg-white">
        <ServiceBanner />
        <ServiceFocus />
        <ServiceSteps />
        <ServiceForm />
      </div>
    </>
  )
}

export default ServiceHome
