import React, { useState } from 'react'
import JobsBanner from '../layout/JobsBanner'
import JobsContact from '../layout/JobsContact'
import WebDevelopmentMarket from '../layout/WebDevelopmentMarket';

const Jobs = () => {
  return (
    <>
    <div className="bg-white">
      <JobsBanner />
      <WebDevelopmentMarket />
      <JobsContact />
      </div>
    </>
  )
}

export default Jobs
