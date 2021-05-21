import React,{useEffect, useState,useRef  } from 'react';
import {
    getCourseDetails,

  } from '../../redux/actions/courseAction'
  import { useSelector, useDispatch } from 'react-redux'
  import { readKlarnaOrder ,captureOrder  } from '../../redux/actions/orderAction'
  import Loader from '../layout/Loader'
import axios from 'axios';
import parse from 'html-react-parser';

const ConfirmationKlarna = ({match}) => {
  const ID = match.params.bootcampId
  const dispatch = useDispatch()
  const  paymentContainerRef = useRef();

  const { course, loading, error } = useSelector((state) => state.courseDetails)

  const {order, loading:ReadOrderLoading, success, error:ReadOrderError } = useSelector((state) => state.KlarnaOrderRead)
  const [html , setHTML] = useState( '')
  const [ orderId , setOrderId ]= useState('')

    useEffect(() => {
        dispatch(getCourseDetails(ID))
        dispatch(readKlarnaOrder(ID)) 
        console.log(course);
      }, [dispatch, ID])


      useEffect(()=>{
        if ( order && order.html_snippet ){
          setHTML(order.html_snippet)
          setOrderId(order.order_id)
          getSnippet()
        
         //status: "checkout_complete"
		}
      },[order,html])



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

//console.log(html&&html);
    return (
        <div className="container " 
        style={{'padding':'60px 0px'}}>
          { ReadOrderLoading && <Loader/>}
          
          <div ref={paymentContainerRef}></div>

           <div />
         {order&&order.status=== "checkout_complete"?
         <div className="row">
            <div className="col offset-5"><a href={"/course-content/"+course._id} className="btn btn-danger rounded-pill">Start Learning !</a></div>
         </div>:null}
        </div>
    );
}

export default ConfirmationKlarna;
