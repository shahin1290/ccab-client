import React, { useState } from 'react'
import ServiceBanner from '../layout/ServiceBanner'
import ServiceFocus from '../layout/ServiceFocus';

const ServiceHome = () => {
  return (
    <>
      <div className="bg-white">
        <ServiceBanner />
        <ServiceFocus />
      </div>
    </>
  )
}

export default ServiceHome
