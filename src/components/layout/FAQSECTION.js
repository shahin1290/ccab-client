import React, { useState } from 'react'
import Faq from 'react-faq-component'

export const data = {
  title: "FAQ (How it works)",

  rows: [
    {
      title: 'What is the mission Financity ?',
      content:
        'Sptio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.omnis voluptas assumenda est.'
    },
    {
      title: 'What is the mission Financity ?',
      content:
        'Sptio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.omnis voluptas assumenda est.'
    },
    {
      title: 'What is the mission Financity ?',
      content:
        'Sptio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.omnis voluptas assumenda est.'
    },
    {
      title: 'What is the mission Financity ?',
      content:
        'Sptio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.omnis voluptas assumenda est.'
    }
  ]
}

const FAQSECTION = () => {
  return (
    <div className="auto-container" >
      <Faq
        data={data}
        styles={{
          bgColor: 'white',
          titleTextColor: '#48482a',
          rowTitleColor: '#78789a',
          rowTitleTextSize: 'large',
          rowContentColor: '#48484a',
          rowContentTextSize: '16px',
          rowContentPaddingTop: '10px',
          rowContentPaddingBottom: '10px',
          rowContentPaddingLeft: '50px',
          rowContentPaddingRight: '150px',
          arrowColor: 'red'
        }}
        config={{
          animate: true
        }}
      />
    </div>
  )
}

export default FAQSECTION
