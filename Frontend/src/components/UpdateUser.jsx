import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../context/Authprovider'
import UsersService from '../services/UsersService'
import { Button } from 'react-bootstrap'

export const UpdateUser = () => {

    const[firstName,setFirstName]=useState("")
    const[lastName,setLastName]=useState("")
    const[username,setUsername]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[phoneNumber,setPhoneNumber]=useState("")
    const {userId}=useParams()

    const navigate=useNavigate()
    const{auth}=useContext(AuthContext)


    useEffect(()=>{
        console.log("useEffect() fired.....")
        if(userId){
            console.log("id received from url using useParams()",userId)
            UsersService.getUserById(userId,auth.accessToken).then(
                (response)=>{
                            console.log("Response from getuserByid",response.data)
                            setFirstName(response.data.firstName)
                            setLastName(response.data.lastName)
                            setUsername(response.data.username)
                            setPassword(response.data.password)
                            setPhoneNumber(response.data.phoneNumber)
                }
            ).catch((error)=>{console.log("Error from getuserByid() api",error)})}
    },[])

    const saveuser=(e)=>{
        e.preventDefault();
        const obj2={firstName,lastName,username,email,password,phoneNumber}
        console.log("Data received from the form....",obj2)
        if(userId){
            UsersService.updateUser(userId,obj2,auth.accessToken).then(response=>{
                console.log("Response received from updatevehicle API...",response.data)
                navigate("/userdata/"+auth.userId)
            }).catch(error=>{
                console.log("Error from updatevehicle api",error)
            })
        }
    }

    return (
        <div style={{ backgroundColor: "#b8c7c7",height: "120vh", padding: "20px" }}>
            <div className='container'>
                <div className='card col-md-6 offset-md-3'>
                    <div className='card-body'>
                    <form>
                            <h2 style={{ position:"absolute",left:"25%" }}>Update Details</h2>
                            <br/>
                            <br/>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name </label>
                                <input type='text' placeholder='Enter the firstname' name='firstname' className='form-control' value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                            </div>
    
                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name</label>
                                <input type='text' placeholder='Enter the lastname' name='model' className='form-control' value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                            </div>
    
                            <div className='form-group mb-2'>
                                <label className='form-label'>User Name</label>
                                <input type='text' placeholder='Enter the username' name='username' className='form-control' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                            </div>
    
                            

                            <div className='form-group mb-2'>
                                <label className='form-label'>Phone Number</label>
                                <input type='text' placeholder='Enter the phonenumber' name='phonenumber' className='form-control' value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
                            </div>
    
                            <div className='form-group mb-2'>
                                <label className='form-label'>Password</label>
                                <input type='text' placeholder='Enter the password' name='password' className='form-control' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
    
                            <button className='btn btn-success' onClick={(e)=>saveuser(e)}>Save</button>
                            <Button style={{ position:"absolute",left:"20%",top:"89.5%" }}className="btn btn-danger" onClick={() => navigate("/userdata/"+auth.userId)}> Cancel</Button>                    
                        </form>
                    </div>
                </div>
            </div>
        </div>
      )
    }
    
/*<div className='form-group mb-2'>
                                <label className='form-label'>Email</label>
                                <input type='text' placeholder='Enter the email' name='email' className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            </div>*/
