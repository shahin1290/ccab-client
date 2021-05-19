import React,{useEffect, useState,useRef  } from 'react';
import {
    getCourseDetails,

  } from '../../redux/actions/courseAction'
  import { useSelector, useDispatch } from 'react-redux'
  import { createOrder,createKlarnaOrder } from '../../redux/actions/orderAction'
  import Loader from '../layout/Loader'
import axios from 'axios';
import parse from 'html-react-parser';

const CheckoutKlarna = ({match}) => {
  const ID = match.params.bootcampId
  const dispatch = useDispatch()
  const  paymentContainerRef = useRef();

  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin

  const { course, loading, error } = useSelector((state) => state.courseDetails)

  const {order, loading:CreateOrderLoading, success, error:CreateOrderError } = useSelector((state) => state.KlarnaOrderCreate)
  const [html , setHTML] = useState( '')
  const [ orderId , setOrderId ]= useState('')

    useEffect(() => {
      getGeoInfo()
        dispatch(getCourseDetails(ID))
        
        
        console.log(course);
      }, [dispatch, ID])

      useEffect(()=>{
        if (course._id )
        _handelcreateKlarnaOrder()
      },[course])
      useEffect(()=>{
        if ( order && order.html_snippet ){
          setHTML(order.html_snippet)
          setOrderId(order.order_id)
          getSnippet()
		}
      },[order,html])

      const [country , setCountry ] = useState('')
      const [ currency, setCurrency] = useState('')
      const [ lang  , setLang ] = useState('')
        // get the user ip info 
  const getGeoInfo = () => {
    axios.get('https://ipapi.co/json/').then((response) => {
       let data = response.data;
      console.log(data);
        setCountry(data.country)
        setCurrency(data.currency)
        setLang(data.languages.slice(0,2))
         //validateCounrty(data.country_name,data.languages)
   }).catch((error) => {
       console.log(error);
   });
};

console.log(lang);
const getSnippet = ()=>{
  var checkoutContainer = paymentContainerRef.current;
              
  checkoutContainer.innerHTML = html;
  //console.log(checkoutContainer.innerHTML);
  var scriptsTags = checkoutContainer.getElementsByTagName('script')
  console.log(scriptsTags);
  for (var i = 0; i < scriptsTags.length; i++) {
    var parentNode = scriptsTags[i].parentNode
    var newScriptTag = document.createElement('script')
    newScriptTag.type = 'text/javascript'
    newScriptTag.text = scriptsTags[i].text
    console.log(newScriptTag.text);
    parentNode.removeChild(scriptsTags[i])
    parentNode.appendChild(newScriptTag)
      }
}
//console.log(order&& order.html_snippet);

const _handelcreateKlarnaOrder = async()=>{
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
                  }
  }
  const resp = await axios.get('https://free.currconv.com/api/v7/convert?q=USD_'+currency+'&compact=ultra&apiKey=077ab08d433eb54aab69',{},config)

  console.log(Math.round(resp.data['USD_'+currency]* course.price) );
  let price= Math.round(resp.data['USD_'+currency]* course.price)
  let amount = price*100;
  let taxrate = 1000;
  let totalTaxRate = amount - (amount*10000)/(10000+taxrate)
  console.log(Math.round(totalTaxRate));
    const data = {
        "purchase_country": "SE",
        "purchase_currency": currency,
        "locale": "sv-SE",
        "order_amount": amount ,
        "order_tax_amount": totalTaxRate,
        "order_lines": [
            {
                "type": "Digital",
                "reference": "19-402-USA",
                "name": course.name,
                "quantity": 1,
                "quantity_unit": "pcs",
                "unit_price": amount,
                "tax_rate": taxrate,
                "total_amount": amount,
                "total_discount_amount": 0,
                "total_tax_amount": totalTaxRate
            }
            ],
            "merchant_urls": {
              "terms":process.env.REACT_APP_HOST + "/privacy",
              "checkout": process.env.REACT_APP_HOST +"/checkout-klarna/"+ID,
              "confirmation": process.env.REACT_APP_HOST +"/confirmation-klarna/"+ID,
              "push":  "https://server.ccab.tech/api/order/push/"+ID+"/"+userDetail._id
            },
    }
   dispatch(createKlarnaOrder({data:data},ID)) 


  console.log(process.env.REACT_APP_HOST );

}

const submitHandler = async (e) => {
    e.preventDefault()
   

    if (error) {
      return
    } else {
      dispatch(
        createOrder(ID, {
          //token: paymentMethod.id,
          amount: course && course.price * 1.25
        })
      )
    }
  }
  function createMarkup() {
    return {__html: html};
  }
//console.log(html&&html);
    return (
        <div className="container " 
        style={{'padding':'60px 0px'}}>
          { CreateOrderLoading && <Loader/>}
          
          <div ref={paymentContainerRef}></div>

           <div />
         
        </div>
    );
}

export default CheckoutKlarna;
