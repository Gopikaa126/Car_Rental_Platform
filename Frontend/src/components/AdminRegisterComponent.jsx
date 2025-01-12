import "./register.css"
import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import AdminService from "../services/AdminService"
import { Button } from "react-bootstrap"

const FIRST_NAME_REGEX=/^[a-zA-Z]{1,25}$/
const LAST_NAME_REGEX=/^[a-zA-Z]{1,25}$/
const PHONE_NUMBER_REGEX=/^[0-9]{10}$/
const ADMIN_REGEX=/^[a-zA-Z0-9_]{3,23}$/
const EMAIL_REGEX=/^[a-z0-9.]+@gmail\.com$/
const PWD_REGEX=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

export const AdminRegisterComponent = () => {
  const navigate = useNavigate();
      //allows to focus on admin input when component loads
      const adminRef=useRef()
      //allows to focus on error
      const errorRef=useRef()
  
      //firstname input 
      const [firstname,setfirstname]=useState('')
      const [validfirstName,setvalidfirstName]=useState(false)
      const [firstnameFocus,setfirstNameFocus]=useState(false)
  
      //lastname input 
      const [lastname,setlastname]=useState('')
      const [validlastName,setvalidlastName]=useState(false)
      const [lastnameFocus,setlastNameFocus]=useState(false)
  
      //adminname input 
      const [adminName,setAdminName]=useState('')
      const [validAdminName,setvalidAdminName]=useState(false)
      const [adminFocus,setAdminFocus]=useState(false)
  
      //email input 
      const [email,setemail]=useState('')
      const [validEmail,setvalidEmail]=useState(false)
      const [emailFocus,setEmailFocus]=useState(false)
  
       //phonenumber input 
       const [phoneNumber,setphoneNumber]=useState('')
       const [validPhonenumber,setvalidPhoneNumber]=useState(false)
       const [phoneNumberFocus,setPhoneNumberFocus]=useState(false)
  
      //pwd
      const [password,setPassword]=useState('')
      const[validPassword,setValidPassword]=useState(false)
      const[passwordFocus,setPasswordFocus]=useState(false)
      //confirm pwd
      const [matchPassword,setmatchPassword]=useState('')
      const [validMatch,setvalidMatch]=useState(false)
      const[matchFocus,setMatchFocus]=useState(false)
      //errors
      const[errMsg,setErrMsg]=useState('')
      const[success,setSuccess]=useState(false)
  
      const saveAdminRegistration=(e)=>{
          e.preventDefault();
          const admindata={"firstName":firstname,"lastName":lastname,"adminName":adminName,"email":email,"password": password,"phoneNumber":phoneNumber}
          AdminService.registerAdmin(admindata).then(response=>{
          console.log("response received from register API",response.data)
          navigate('/adminlogin'); 
          }).catch(error=>{
              console.log("Error received from register API",error)
              if(!error?.response){
                  setErrMsg("No Server response")
              }
              else if(error.response?.status===409){
                  setErrMsg("adminname Taken")
              }
              else{
                  setErrMsg("registration failed")
              }
          })
      }

      
  useEffect(()=>{
      //set focus on admin input
      adminRef.current.focus()
      console.log("First useEffect() invoked. Focus set on admin input")
  },[])
  
  //validates firstname
  useEffect(()=>{
      const result=FIRST_NAME_REGEX.test(firstname)
      console.log("Result of regex on first name",result)
      setvalidfirstName(result)
  },[firstname])
  
  //validates lastname
  useEffect(()=>{
      const result=LAST_NAME_REGEX.test(lastname)
      console.log("Result of regex on last name",result)
      setvalidlastName(result)
  },[lastname])
  
  //validates adminname
  useEffect(()=>{
      const result=ADMIN_REGEX.test(adminName)
      console.log("Result of regex on adminname",result)
      setvalidAdminName(result)
  },[adminName])
  
  //validates email
  useEffect(()=>{
      const result=EMAIL_REGEX.test(email)
      console.log("Result of regex on email",result)
      setvalidEmail(result)
  },[email])
  
  //validates phonenumber
  useEffect(()=>{
      const result=PHONE_NUMBER_REGEX.test(phoneNumber)
      console.log("Result of regex on phonenumber",result)
      setvalidPhoneNumber(result)
  },[phoneNumber])
  
  
  
  useEffect(()=>{
      const result=PWD_REGEX.test(password)
      console.log("Third useEffect invoked.....result of regex test on adminname",result)
      setValidPassword(result)
      console.log("validPassword state variable gets the value of regex test",result)
      const matchResult=password===matchPassword
      setvalidMatch(matchResult)
      console.log("validmatch state variable gets the value of regex test",matchResult)
  },[password,matchPassword])
  
  useEffect(()=>{
      console.log("Second useeffect get invoked....")
      setErrMsg('')
  },[adminName,password,matchPassword])
  
    return (
      <div id="loginbackground" className="register">
          <section>
              <p ref={errorRef}className={errMsg?"errmsg":"offscreen"} aria-live="assertive">{errMsg}</p>
              <form>
                  
                  <form className="leftside">
                  <h1 >Register</h1>
                  <br/><br/>


                  {/*firstname*/}
                  <label htmlFor="firstname">First Name
                      <span className={validfirstName?"valid":"hide"}>
                          <FontAwesomeIcon icon={faCheck}/>
                      </span>
                      <span className={validfirstName||firstname?"hide":"invalid"}>
                           <FontAwesomeIcon icon={faTimes}/>
                      </span>
                  </label>
                  <input type="text" id="firstname" ref={adminRef} autoComplete="off" 
                      onChange={(e)=>{setfirstname(e.target.value)}}
                      required aria-invalid={validfirstName?"false":"true"}
                      aria-describedby="uidnote"
                      onFocus={()=>{setfirstNameFocus(true)}}
                      onBlur={()=>{setfirstNameFocus(false)}}
                  />
                  <p id="uidnote" className={firstnameFocus && firstname && !validfirstName?"instructions":"offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle}/>
                      1 to 25 characters.<br/>
                      Only Letters allowed<br/>
                  </p>
                  
  
                  {/*adminname*/}
                  <label htmlFor="adminName">Admin Name
                      <span className={validAdminName?"valid":"hide"}>
                          <FontAwesomeIcon icon={faCheck}/>
                      </span>
                      <span className={validAdminName||adminName?"hide":"invalid"}>
                           <FontAwesomeIcon icon={faTimes}/>
                      </span>
  
                  </label>
                  <input type="text" id="adminname" ref={adminRef} autoComplete="off" 
                      onChange={(e)=>{setAdminName(e.target.value)}}
                      required aria-invalid={validAdminName?"false":"true"}
                      aria-describedby="uidnote"
                      onFocus={()=>{setAdminFocus(true)}}
                      onBlur={()=>{setAdminFocus(false)}}
                  />
                  <p id="uidnote" className={adminFocus && adminName && !validAdminName?"instructions":"offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle}/>
                      4 to 24 characters.<br/>
                      Must begin with a letter<br/>
                      Letters,Numbers,Underscores allowed.
                  </p>
  
                  {/*password*/}
                  <label htmlFor="password" >Password
                      <FontAwesomeIcon icon={faCheck} className={validPassword?"valid":"hide"}/>
                      <FontAwesomeIcon icon={faTimes} className={validPassword||password?"hide":"invalid"}/>
  
                  </label>
                  <input type="password" id="password" 
                  onChange={(e)=> setPassword(e.target.value)}value={password} required 
                  aria-invalid={validPassword?"false":"true"}
                  aria-describedby="pwdnote"
                   onFocus={()=>{setPasswordFocus(true)}} 
                   onBlur={()=>{setPasswordFocus(false)}}
                  />
                  <p id="pwdnote" className={passwordFocus&&password&&!validPassword?"instructions":"offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle}/>
                  8 to 24 characters<br/>
                  Must include uppercase & lowercase letters, a number and a special symbol<br/>
                  Allowed special characters :!@#$%
                  </p>
  
                  {/*confirm password*/}
                  <label htmlFor="confirm-pwd" >Confirm Password
                      {/*gives tick mark*/}
                      <FontAwesomeIcon icon={faCheck} className={validMatch&& matchPassword?"valid":"hide"}/>
                      <FontAwesomeIcon icon={faTimes} className={validMatch||matchPassword?"hide":"invalid"}/>
                  </label>
                  <input type="password" id="conform-pwd"
                  onChange={(e)=>{setmatchPassword(e.target.value)}}
                  value={matchPassword} required
                  aria-invalid={validMatch?"false":"true"}
                  aria-describedby="confirmed"
                  onFocus={()=>{setMatchFocus(true)}}
                  onBlur={()=>{setMatchFocus(false)}}/>
  
                  <p id="confirmnote" className={matchFocus&&!validMatch?"instructions":"offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle}/>
                      Must match the first password input field
                  </p>
                  <br/>
                  <Button variant="success" type="submit" className="mt-3 w-10" id="sign-up"  disabled={!validAdminName||!validPassword||!validMatch?true:false} onClick={(e)=>{saveAdminRegistration(e)}}>Sign Up</Button>
                  </form>
  
                 
                  <form className="rightside">
                  {/*lastname*/}
                  <label htmlFor="lastname">Last Name
                      <span className={validlastName?"valid":"hide"}>
                          <FontAwesomeIcon icon={faCheck}/>
                      </span>
                      <span className={validlastName||lastname?"hide":"invalid"}>
                           <FontAwesomeIcon icon={faTimes}/>
                      </span>
  
                  </label>
                  <input type="text" id="lastname" ref={adminRef} autoComplete="off" 
                      onChange={(e)=>{setlastname(e.target.value)}}
                      required aria-invalid={validlastName?"false":"true"}
                      aria-describedby="uidnote"
                      onFocus={()=>{setlastNameFocus(true)}}
                      onBlur={()=>{setlastNameFocus(false)}}
                  />
                  <p id="uidnote" className={lastnameFocus && lastname && !validlastName?"instructions1":"offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle}/>
                      1 to 25 characters.<br/>
                      Only Letters allowed<br/>
                  </p>
  
                  
                  {/*email*/}
                  <label htmlFor="email">Email
                      <span className={validEmail?"valid":"hide"}>
                          <FontAwesomeIcon icon={faCheck}/>
                      </span>
                      <span className={validEmail||email?"hide":"invalid"}>
                           <FontAwesomeIcon icon={faTimes}/>
                      </span>
  
                  </label>
                  <input type="text" id="email" ref={adminRef} autoComplete="off" 
                      onChange={(e)=>{setemail(e.target.value)}}
                      required aria-invalid={validEmail?"false":"true"}
                      aria-describedby="uidnote"
                      onFocus={()=>{setEmailFocus(true)}}
                      onBlur={()=>{setEmailFocus(false)}}
                  />
                  <p id="uidnote" className={emailFocus && email && !validEmail?"instructions1":"offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle}/>
                      should be in email format Eg:abc@gmail.com<br/>
                  </p>
  
                  {/*phonenumber*/}
                  <label htmlFor="phonenumber">Phone Number
                      <span className={validPhonenumber?"valid":"hide"}>
                          <FontAwesomeIcon icon={faCheck}/>
                      </span>
                      <span className={validPhonenumber||phoneNumber?"hide":"invalid"}>
                           <FontAwesomeIcon icon={faTimes}/>
                      </span>
  
                  </label>
                  <input type="text" id="phonenumber" ref={adminRef} autoComplete="off" 
                      onChange={(e)=>{setphoneNumber(e.target.value)}}
                      required aria-invalid={validPhonenumber?"false":"true"}
                      aria-describedby="uidnote"
                      onFocus={()=>{setPhoneNumberFocus(true)}}
                      onBlur={()=>{setPhoneNumberFocus(false)}}
                  />
                  <p id="uidnote" className={phoneNumberFocus && phoneNumber && !validPhonenumber?"instructions1":"offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle}/>
                      Must be 10 digits<br/>
                      Numbers only allowed<br/>
                  </p>
                  </form>
                  <div className="already text-center mt-3">
              <p style={{position:"absolute",left:"28%",top:"85%"}}>Already Registered? <Link to="/adminlogin">Sign In</Link>
              </p>
          </div>
  
              </form>
              
          </section>
          
          
      </div>
  )
}
