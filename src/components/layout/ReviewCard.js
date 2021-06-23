import React from 'react'
import styled from 'styled-components'
import { GoQuote } from 'react-icons/go'

// import userImgUrl from '../../images/profile1.jpeg'

const Card = styled.div`
  display: flex;
  flex-direction: column;
`

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
  margin-right: 10px;
`

const CardContainer = styled.div`
  height: 100px;
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
  font-weight: bold;
`

export function ReviewCard(props) {
  return (
    <Card>
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
        <UserImg src={''} />
        <UserInfo>
          <UserName>Allen John</UserName>
          <UserCity>California</UserCity>
        </UserInfo>
      </UserDetails>
    </Card>
  )
}