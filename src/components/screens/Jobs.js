import React, { useState } from 'react'
import JobsBanner from '../layout/JobsBanner'
import JobsContact from '../layout/JobsContact'
import WebDevelopmentMarket from '../layout/WebDevelopmentMarket';

const Jobs = () => {
  return (
    <>
      <JobsBanner />
      <WebDevelopmentMarket />
      <JobsContact />
    </>
  )
}

export default Jobs
