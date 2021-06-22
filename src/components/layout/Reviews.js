import { CarouselProvider, Slide, Slider, DotGroup,ButtonBack,ButtonNext } from 'pure-react-carousel'
import React,{useState,useEffect} from 'react'
import { Element } from 'react-scroll'
import styled from 'styled-components'
import { GoQuote } from 'react-icons/go'
import { Carousel,Card ,CardGroup } from 'react-bootstrap'
// import reviewHeroImg from '../../images/review-hero.png' 

//import userImgUrl from '/images/person1.jpeg'


import 'pure-react-carousel/dist/react-carousel.es.css'

import { ReviewCard } from './ReviewCard'


const SectionContainer = styled.div`
 
  width: 100%;
  background-color: #fff;

`

const ReviewsContainer = styled(Element)`
 
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-top:70px ;
`

const StyledCarouselProvider = styled(CarouselProvider)`
  width:80%;
  margin: 0 auto ;
 
`

const StyledDotGroup = styled(DotGroup)`
  display: flex;
  justify-content: flex-end;
  button {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: white;
    border: none;
    outline: none;
    &:not(:last-of-type) {
      margin-right: 3px;
    }
  }
  & .carousel__dot--selected {
    background-color: black;
  }
`

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 50px;
  }
`

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  width:85%;
  padding :20px;
  margin:0 auto;
 
`


// const Card = styled.div`
//   display: flex;
//   flex-direction: column;
  
// `

const QuoteIcon = styled.div`
  position: absolute;
  top: 1px;
  left: 1px;
  color:  #f8a555;
  font-size: 20px;
`

const ReviewText = styled.p`
  font-size: 14px;
  color: #585858;
  font-weight: normal;
  margin: 20px;
  overflow: hidden;
`

const UserImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin: 0px 10px 20px 10px;

`

const CardContainer = styled.div`
 
  background-color: #fff;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: sp;
`

const UserDetails = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const UserName = styled.span`
  font-size: 15px;
  color: #000;
`

const UserCity = styled.span`
  font-size: 10px;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;`

const NextButotn = styled(ButtonNext)`

`


const ReviewsSection = function (props) {



  return (
    <SectionContainer >
      <ReviewsContainer>


        <RightSection>

        <Carousel 
        prevIcon={<i class="fas fa-chevron-left text-dark fs-1"></i>}
        nextIcon={<i className="fas fa-chevron-right text-dark"></i>}>


        <Carousel.Item>
              <div className="row">
                <div className="col-md-4">
                    <Card >
                      <CardContainer>
                        <QuoteIcon>
                          <GoQuote />
                        </QuoteIcon>
                        <ReviewText>
                          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
                          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                          dolorem ipsum quia dolor
                        </ReviewText>
                      </CardContainer>
                      <UserDetails>
                        <UserImg src={'/images/person1.jpg'} />
                        <UserInfo>
                          <UserName>Allen John</UserName>
                          <UserCity>California</UserCity>
                        </UserInfo>
                      </UserDetails>
                    </Card>
                  </div>
                  
                  <div className="col-md-4">
                    <Card >
                      <CardContainer>
                        <QuoteIcon>
                          <GoQuote />
                        </QuoteIcon>
                        <ReviewText>
                          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
                          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                          dolorem ipsum quia dolor
                        </ReviewText>
                      </CardContainer>
                      <UserDetails>
                        <UserImg src={'/images/person2.jpg'} />
                        <UserInfo>
                          <UserName>Allen John</UserName>
                          <UserCity>California</UserCity>
                        </UserInfo>
                      </UserDetails>
                    </Card>
                  </div>

                  <div className="col-md-4">
                    <Card >
                      <CardContainer>
                        <QuoteIcon>
                          <GoQuote />
                        </QuoteIcon>
                        <ReviewText>
                          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
                          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                          dolorem ipsum quia dolor
                        </ReviewText>
                      </CardContainer>
                      <UserDetails>
                        <UserImg src={'/images/person3.jpg'} />
                        <UserInfo>
                          <UserName>Allen John</UserName>
                          <UserCity>California</UserCity>
                        </UserInfo>
                      </UserDetails>
                    </Card>
                  </div>

                </div>

              </Carousel.Item>




              <Carousel.Item>
              <div className="row">
                <div className="col-md-4">
                    <Card >
                      <CardContainer>
                        <QuoteIcon>
                          <GoQuote />
                        </QuoteIcon>
                        <ReviewText>
                          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
                          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                          dolorem ipsum quia dolor
                        </ReviewText>
                      </CardContainer>
                      <UserDetails>
                        <UserImg src={'/images/person4.jpg'} />
                        <UserInfo>
                          <UserName>Allen John</UserName>
                          <UserCity>California</UserCity>
                        </UserInfo>
                      </UserDetails>
                    </Card>
                  </div>

                  <div className="col-md-4">
                    <Card >
                      <CardContainer>
                        <QuoteIcon>
                          <GoQuote />
                        </QuoteIcon>
                        <ReviewText>
                          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
                          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                          dolorem ipsum quia dolor
                        </ReviewText>
                      </CardContainer>
                      <UserDetails>
                        <UserImg src={'/images/person5.jpg'} />
                        <UserInfo>
                          <UserName>Allen John</UserName>
                          <UserCity>California</UserCity>
                        </UserInfo>
                      </UserDetails>
                    </Card>
                  </div>

                  <div className="col-md-4">
                    <Card >
                      <CardContainer>
                        <QuoteIcon>
                          <GoQuote />
                        </QuoteIcon>
                        <ReviewText>
                          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
                          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                          dolorem ipsum quia dolor
                        </ReviewText>
                      </CardContainer>
                      <UserDetails>
                        <UserImg src={'/images/person6.jpg'} />
                        <UserInfo>
                          <UserName>Allen John</UserName>
                          <UserCity>California</UserCity>
                        </UserInfo>
                      </UserDetails>
                    </Card>
                  </div>
                </div>

              </Carousel.Item>



              <Carousel.Item>
              <div className="row">
                <div className="col-md-4">
                    <Card >
                      <CardContainer>
                        <QuoteIcon>
                          <GoQuote />
                        </QuoteIcon>
                        <ReviewText>
                          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
                          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                          dolorem ipsum quia dolor
                        </ReviewText>
                      </CardContainer>
                      <UserDetails>
                        <UserImg src={'/images/person7.jpg'} />
                        <UserInfo>
                          <UserName>Allen John</UserName>
                          <UserCity>California</UserCity>
                        </UserInfo>
                      </UserDetails>
                    </Card>
                  </div>
                  
                  <div className="col-md-4">
                    <Card >
                      <CardContainer>
                        <QuoteIcon>
                          <GoQuote />
                        </QuoteIcon>
                        <ReviewText>
                          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
                          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                          dolorem ipsum quia dolor
                        </ReviewText>
                      </CardContainer>
                      <UserDetails>
                        <UserImg src={'/images/person2.jpg'} />
                        <UserInfo>
                          <UserName>Allen John</UserName>
                          <UserCity>California</UserCity>
                        </UserInfo>
                      </UserDetails>
                    </Card>
                  </div>

                  <div className="col-md-4">
                    <Card >
                      <CardContainer>
                        <QuoteIcon>
                          <GoQuote />
                        </QuoteIcon>
                        <ReviewText>
                          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
                          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                          dolorem ipsum quia dolor
                        </ReviewText>
                      </CardContainer>
                      <UserDetails>
                        <UserImg src={'/images/person5.jpg'} />
                        <UserInfo>
                          <UserName>Allen John</UserName>
                          <UserCity>California</UserCity>
                        </UserInfo>
                      </UserDetails>
                    </Card>
                  </div>
                </div>

              </Carousel.Item>



            </Carousel>

    

     
        </RightSection>
      </ReviewsContainer>
    </SectionContainer>
  )
}

export default ReviewsSection