import React, { useState } from 'react'
import Faq from 'react-faq-component'

const data = {
  rows: [
    {
      title: 'What is the refund policy?',
      content:
        'If you subscribed, you get a 7-day free trial during which you can cancel at no penalty. After that, we don’t give refunds, but you can cancel your subscription at any time.'
    },
    {
      title: 'Can I just enroll in a single course?',
      content:
        'Yes! To get started, click the course card that interests you and enroll. You can enroll and complete the course to earn a shareable certificate.'
    },
    {
      title: 'Is financial aid available?',
      content:
        'No, Codify college does not presently provide financial aid to learners who cannot afford the fee.'
    },

    {
      title:
        'Is this course really with live Mentoring and online? Do I need to attend any classes in person?',
      content:
        'This course is entirely with live Mentoring and online, where you will book your live mentoring sessions in person from the platform calendar. You can access your lectures, readings, recorded videos, and assignments anytime and anywhere via the web or your mobile device.'
    },
    {
      title: 'Do I get a certificate after completion of the course?',
      content:
        'Yes, you will receive a certificate of graduation from the course once you pass the project.'
    },
    {
      title: 'What background knowledge is necessary?',
      content:
        'No prerequisite knowledge is needed as our course is designed to take you from ground zero up.'
    },
    {
      title: 'Do I need to take the courses in a specific order?',
      content:
        'Ideally, learners should complete the courses in the specified sequence. However, if you are already comfortable in some languages you may choose to skip the lesson which we strongly discourage.'
    }
  ]
}

const FaqSection = () => {
  const styles = {
    // bgColor: 'white',
    // rowContentColor: 'grey',
    rowContentPaddingTop: '10px',
    rowContentPaddingRight: '10px',
    rowContentPaddingLeft: '30px',
    rowContentPaddingBottom: '20px'
  }

  const config = {
    animate: true,
    tabFocus: true
  }
  return (
    <div className="mt-5 mb-5">
      <div className="auto-container">
        <div className="sub-title text-center mb-5">
          Frequenly asked questions
        </div>
        <div className="">
          <Faq data={data} styles={styles} config={config} />
        </div>
      </div>
    </div>
  )
}

export default FaqSection
