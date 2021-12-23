import React, { useState, useEffect } from "react";
import { ReviewCard } from "./ReviewCard";
import { Element } from "react-scroll";
import styled from "styled-components";
import { GoQuote } from "react-icons/go";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 4 },
};

const QuoteIcon = styled.div`
  position: absolute;
  top: 1px;
  left: 1px;
  color: #f8a555;
  font-size: 20px;
`;

const ReviewText = styled.p`
  font-size: 14px;
  color: #585858;
  font-weight: normal;
  margin: 20px;
  overflow: hidden;
`;

const UserImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin: 0px 10px 20px 10px;
`;

const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: sp;
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-size: 15px;
  color: #000;
`;

const items = [
  <div
    class='card  bg-white rounded d-flex flex-column justify-content-between'
    style={{ height: "360px" }}
  >
    <CardContainer>
      <QuoteIcon>
        <GoQuote />
      </QuoteIcon>
      <ReviewText>
        Codify college full stack developer course helped me hone my skill and
        switch careers thanks to high-quality coursework, video lectures, With
        live Mentoring and hands-on projects. It was an amazing experience going
        through the program and I will highly recommend it to anybody.
      </ReviewText>
    </CardContainer>
    <UserDetails>
      <UserImg src={"/images/person1.jpg"} />
      <UserInfo>
        <UserName>Jose I.</UserName>
      </UserInfo>
    </UserDetails>
  </div>,

  <div
    class='card  bg-white rounded flex-column justify-content-between'
    style={{ height: "360px" }}
  >
    <CardContainer>
      <QuoteIcon>
        <GoQuote />
      </QuoteIcon>
      <ReviewText>
        So far, the program is going great! I really appreciate a lot all the
        help I have received from the mentors. They are truly awesome and every
        tip, feedback, and answers they have given to me has really helped me a
        lot to become a better developer and understand everything clearly about
        the course. The help from the live Mentoring, especially how quickly
        they respond truly makes this course worth it.
      </ReviewText>
    </CardContainer>
    <UserDetails>
      <UserImg src={"/images/person2.jpg"} />
      <UserInfo>
        <UserName>Trevor C.</UserName>
      </UserInfo>
    </UserDetails>
  </div>,

  <div
    class='card  bg-white rounded flex-column justify-content-between'
    style={{ height: "360px" }}
  >
    <CardContainer>
      <QuoteIcon>
        <GoQuote />
      </QuoteIcon>
      <ReviewText>
        Fantastic! The content and curriculum were excellent. Codify college
        make us believe in learning by doing is the best way by throwing
        challenging projects and that way works great. I've learned and got
        comfortable with various technologies throughout this program.
      </ReviewText>
    </CardContainer>
    <UserDetails>
      <UserImg src={"/images/person3.jpg"} />
      <UserInfo>
        <UserName>Radhika D.</UserName>
      </UserInfo>
    </UserDetails>
  </div>,

  <div
    class='card  bg-white rounded flex-column justify-content-between'
    style={{ height: "360px" }}
  >
    <CardContainer>
      <QuoteIcon>
        <GoQuote />
      </QuoteIcon>
      <ReviewText>
        Since being furloughed from work, I've really enjoyed learning skills
        that will improve my chances of landing a full-time remote job. As most
        of my skills involve some industrial hardware or external peripherals,
        acclimating to the full-stack workstyle has been a whole new world. This
        course has helped ease me into it and furthered my skills as a software
        engineer as a whole. So far, I'm loving it!
      </ReviewText>
    </CardContainer>
    <UserDetails>
      <UserImg src={"/images/person4.jpg"} />
      <UserInfo>
        <UserName>Stefan F.</UserName>
      </UserInfo>
    </UserDetails>
  </div>,

  <div
    class='card  bg-white rounded flex-column justify-content-between'
    style={{ height: "360px" }}
  >
    <CardContainer>
      <QuoteIcon>
        <GoQuote />
      </QuoteIcon>
      <ReviewText>
        After having worked as a frontend developer and product manager for a
        while, I wanted to get a better understanding of backend web
        development. I enrolled in this course in order to gain this skill and
        so far it has been a very intense, but also a very rewarding experience.
        I can't tell you how much I've learned With live Mentoring, and how much
        I've improved in topics that were completely foreign to me before.
      </ReviewText>
    </CardContainer>
    <UserDetails>
      <UserImg src={"/images/person5.jpg"} />
      <UserInfo>
        <UserName>Ivan K.</UserName>
      </UserInfo>
    </UserDetails>
  </div>,

  <div
    class='card  bg-white rounded flex-column justify-content-between'
    style={{ height: "360px" }}
  >
    <CardContainer>
      <QuoteIcon>
        <GoQuote />
      </QuoteIcon>
      <ReviewText>
        This is my first online program and so far, it's been great. The quality
        of the content and UI really stand out. After completing my first
        project I was most impressed with the code review. I was able to ask
        some questions about my code and I received thoughtful and detailed
        answers.
      </ReviewText>
    </CardContainer>
    <UserDetails>
      <UserImg src={"/images/person6.jpg"} />
      <UserInfo>
        <UserName>Lazarevic W.</UserName>
      </UserInfo>
    </UserDetails>
  </div>,
];

const ReviewsSection = function (props) {
  return (
    <section className='py-5' style={{ background: ' rgb(234, 246, 255)'}}>
      <div className='auto-container'>
        <div className='title text-center'>Reviews By Students</div>
        <hr className='block-seperator mt-1 mb-2' />
      <div className="text text-center mb-5">
      Most of our graduates were employed after 6 months upon graduation
      </div>
        <AliceCarousel
          mouseTracking
          responsive={responsive}
          disableDotsControls
          items={items}
        ></AliceCarousel>
      </div>
    </section>
  );
};

export default ReviewsSection;
