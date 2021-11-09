

import React ,{useContext , useState, useEffect } from 'react';

// import Context from './../context/Context';

import Loader from './Loader'
import axios from 'axios'
import Message from "../layout/Message";


export default function Contact() {
  const [name , setName ] = useState('');
  const [email, setEmail] = useState("");
  const [industry, setIndustry] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [countryCode, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [response, setResponse] = useState("");
  const [subject , setSubject] = useState(''); 
  const [loading , setLoading ] = useState(false);

  const phoneNumber = "00-" + countryCode + "-" + phone;


  useEffect(() => {
    const timer = setTimeout(() => {
      setResponse("");
      setName("");
      
      setEmail("");
      setPhone("");
      setCategory("");
      setIndustry("");
      setMessage("");
      setCode("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [response]);



  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      if ( !name || !email || !message || !phone || !countryCode ){
          throw new Error('Please fill in all the fields')
          setLoading(false)
      }
      const res = await axios.post("https://server.ccab.tech/contact", {
        name,
        email,
        subject,
        phoneNumber,
        industry,
        category,
        message,
      });
      setLoading(false)
      setResponse(res.data);
    } catch (error) {
      setLoading(false)
      setErr(error);
    }
  };

    // const { SendMessage ,ClearError, MessageError,success,loading } = useContext(Context)

    
    // const [email , setEmail ] = useState('');
 
    // const [message, setMessage ] = useState('')
   
    const[err, setErr]= useState('');


    
    // const _handelSubmit = (e)=>{
    //     e.preventDefault(); 
    //     console.log(tel.slice(1));
    //     if ( name && email && subject && message  ){
    //        const NewMessage = { name : name, email : email, subject :subject,message:message}
    //         SendMessage(NewMessage);
    //         console.log(NewMessage); 
    //         _clearFrom()
    //        console.log('sumbitted :', NewMessage); 
    //     }else{
    //         setErr('Please fill in all the fields')
    //     }
        
    // }

    const _clearFrom = ()=>{
      setResponse("");
      setName("");
    
      setEmail("");
      setPhone("");
      setCategory("");
      setIndustry("");
      setMessage("");
      setCode("");
      
        setMessage('');
    }

    return (


        
        <form   name="contact-form" id="contact-form" onSubmit={submitHandler}>
         { err ? <p className="border text-danger py-2 px-4 ">{err}</p>:null}
            {/*{success ? <p className="border text-success py-2 px-4">Thank You Your Message Has Been Sent!</p>:null} */}
            {response ? (
            <Message>{response}</Message>
                ) : (
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group app-label">
                    <label htmlFor="name">Name</label>
                    <input name="name" id="name" type="text" className="form-control" placeholder="Enter your name.." value={name}
                      onChange={(e)=>{  setErr(''); setName(e.target.value)}} />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group app-label">
                    <label htmlFor="email">Email address</label>
                    <input name="email" id="email" type="email" className="form-control" placeholder="Enter your email.."value={email}
                      onChange={(e)=>{  setErr(''); setEmail(e.target.value)}} />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group app-label">
                    <label htmlFor="subject">Subject</label>
                    <input type="text" className="form-control" id="subject" placeholder="Enter Subject.." value={subject}
                      onChange={(e)=>{  setErr(''); setSubject(e.target.value)}} />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group app-label">
                    <label htmlFor="comments">Message</label>
                    <textarea name="comments" id="comments" rows={3} className="form-control" placeholder="Enter message.." defaultValue={""} value={message}
                      onChange={(e)=>{  setErr(''); setMessage(e.target.value)}}/>
                  </div>
                </div>
              </div>
                )}
        <div className="row">
          <div className="col-sm-12">
            <button type="submit" id="submit" name="send" className="btn btn-warning">{loading?<Loader/>:<>Send Message <i className="mdi mdi-telegram ml-2" /></>}</button>
            <div id="simple-msg" />
          </div>
        </div>
      </form>
    )
}
