import React from "react";

export default function WhyJavascript({ match }) {
  return (
    <div>
      <section className='pricing-section'>
        <div className='auto-container'>
          {/* Sec Title */}
          <div className='sec-title style-two centered'>
            <div>
              <span className='title'>Why JavaScript?</span>
            </div>
            <hr className='block-seperator mb-3' />
          </div>
          <main>
            <ol className='gradient-list'>
              <li>
                JavaScript has been the most popular language in the world for 9
                years in a row, according to StackOverflow.com, the largest
                community website for professional and enthusiast programmers.
              </li>
              <li>
                Knowing JavaScript allows you to design Web and mobile apps
                without any restrictions. JavaScript can be used to create
                back-end, front-end, full-stack, iOS, and Android apps.
              </li>
              <li>
                The most in-demand position on the job market is full-stack
                developer.
              </li>
            </ol>
          </main>
        </div>
      </section>
    </div>
  );
}
