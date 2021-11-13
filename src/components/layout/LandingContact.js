

import React ,{useContext , useState, useEffect } from 'react';

// import Context from './../context/Context';

import Loader from './Loader'
import axios from 'axios'
import Message from "../layout/Message";

// email and phone validation 
import 'react-phone-number-input/style.css'
import EmailValidator from 'email-validator'
import PhoneInput,{ isValidPhoneNumber }  from 'react-phone-number-input'





export default function Contact() {
 
  const [Country, setCountry ] = useState(localStorage.getItem('C_code') )
  const [loading , setLoading ] = useState(false);
  
  // form data
  const [FormData , setFormData ] = useState({
    Name : '', 
    Subject:'',
    Message:'',
    Email:'',
    Phone:'',

  })

  // validation state 
  const [ValidationError , setValidationError ] = useState({
    NameErr : false, 
    SubjectErr:false,
    MessageErr:false,
    EmailErr:false,
    PhoneErr:false,

})

  const[showButton , setShowButton ]= useState (false); 
  const [Hide , setHide ]= useState(true);
  const[err ,setErr ] = useState('');




    // handel Phone number  chainging 
  const _handelPhoneChange =(e)=>{ 
             // validate Phone number !
      if (e && !isValidPhoneNumber(e)){
        setValidationError({...ValidationError,  PhoneErr: true })
      }else if (e && isValidPhoneNumber(e)){
        setValidationError({...ValidationError,  PhoneErr: false })
          console.log('Correct!');
      }
      //console.log(e);
     setFormData({...FormData, Phone : e})
  }

  

  // handel Name nad subject and Message chainging 
  const _handelFieldChange =(e)=>{
      // update the state variable
      setFormData({ ...FormData , [e.target.id] : e.target.value })

      if( !e.target.value ){
         setValidationError({ ...ValidationError, [e.target.id+'Err'] : true })

      }else{
        setValidationError({...ValidationError, [e.target.id+'Err'] : false })
      }
      
  }

  // handel Email chainging 
  const _handelEmailChange =(e)=>{
     setFormData({ ...FormData, Email: e.target.value})

      if ((e.target.value && !EmailValidator.validate(e.target.value)) 
          || !e.target.value){

          setValidationError({ ...ValidationError, EmailErr: true})
      }else if (e.target.value ){
        setValidationError({...ValidationError,  EmailErr: false })
      }
  }

  useEffect(() => {
    
      let NoError = !ValidationError.NameErr&&!ValidationError.EmailErr &&!ValidationError.PhoneErr&&!ValidationError.SubjectErr&&!ValidationError.MessageErr ; 

      let DataExisit =FormData.Name&&FormData.Email&&FormData.Phone&&
                      FormData.Subject&&FormData.Message ; 

      console.log(FormData.Email );
      if(NoError && DataExisit ){
          console.log('open button');
          setShowButton(true);
      }else{
          setShowButton(false);
      }
  }, [ValidationError, FormData ]);

  useEffect(()=>{
     
      console.log(window.location);
      if(window.location.origin !== 'http://localhost:3000'){
          setHide(true);
      }
  },[])


  const _handelSubmit =async (e)=>{
      e.preventDefault(); 
      _clearFrom();
      setLoading(true)
      console.log({...FormData} );
      showThanksMessage();
      const config={headers:{'Content-Type' : 'application/json'}}
      try {
        const res = await axios.post("https://server.ccab.tech/contact", {
            ...FormData          
        },config);

        setLoading(false)
    


      } catch (error) {
        setLoading(false)
        setErr(error.message)
      }
      
  }

  const showThanksMessage=()=>{
      if ( Hide && !err ){
          setHide(false); 
          setTimeout(()=>{
            setHide(true); 
          },3000)
      }
  }
  const _clearFrom = ()=>{
     setFormData({
      Name : '', 
      Subject:'',
      Message:'',
      Email:'',
      Phone:'',
  
    })
    setErr('');
  }



    return (


        
      <form className="registration-form  needs-validation p-3" onSubmit={_handelSubmit}>
        {Hide?(

            <>
            <div className="form-row">
                
            <div className="form-group  col-10" style={{position:'relative'}}>
                {err ? <p className="text-danger error-attention">{err}</p> : null}
            </div>

            <div className="form-group mb-4 col-10" style={{position:'relative'}}>

                <input type="text" className="form-control" id="Name" 
                placeholder="Your Name*"  required value={FormData.Name} 
                onChange={_handelFieldChange}/>

                {ValidationError.NameErr ? <p className="text-danger">Enter Your Name Please!</p> : null}
            </div>

            <div className="form-group mb-4 col-10 ">

            <input type="email" className="form-control" id="exampleFormControlInput2" 
            placeholder="Your email*" 
            required value={FormData.Email} 
            onChange={_handelEmailChange}/>

            {ValidationError.EmailErr ? <p className="text-danger">Enter A Valid Email Please!</p> : null}
            </div>
            </div>
            <div className="form-row">
            <div className="form-group mb-4 col-10 sm-12">
                <PhoneInput
                
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry={atob(Country)}
                
                    value={FormData.Phone}
                    onChange={_handelPhoneChange} />
            {ValidationError.PhoneErr ? <p className="text-danger">Enter A Valid Phone Number Please!</p> : null}
            </div>


            </div>
            <div className="form-group mb-4 col-10" style={{position:'relative'}}>

            <input type="text" className="form-control" id="Subject" 
            placeholder="Subject*"  required value={FormData.Subject} 
            onChange={_handelFieldChange}/>

            {ValidationError.SubjectErr ? <p className="text-danger">Enter Subject Please!</p> : null}
            </div>

            <div className="form-group mb-4 col-10" style={{position:'relative'}}>
            <textarea name="comments" id="Message" rows={3} className="form-control" placeholder="Enter message.." value={FormData.Message}
                    onChange={_handelFieldChange}/>

            {ValidationError.MessageErr ? <p className="text-danger">Enter a message Please!</p> : null}
            </div>


            <div className="form-row">
            <div className="form-group mb-4 col-10 sm-12">
                <button type="submit" disabled={!showButton} 
                className="btn btn-warning btn-block btn-sm formButton py-1">
                    {loading?<Loader/>:<>Send <i className="mdi mdi-telegram ml-2" /></>} 
                </button>
            </div>
            </div>
        </>

        ):(

          <div className="form-group mb-4 col-10 " style={{position:'relative'}}>
            <h4>Thank you, Your email has been sent!</h4>
            <div  className="sentEmail">
              
            </div>
          </div>
        )}

      

      </form>
    )
}
