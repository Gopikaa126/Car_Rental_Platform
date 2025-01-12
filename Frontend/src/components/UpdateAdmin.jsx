import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../context/Authprovider'
import { Button } from 'react-bootstrap'
import AdminService from '../services/AdminService'

export const UpdateAdmin = () => {

    const[firstName,setFirstName]=useState("")
    const[lastName,setLastName]=useState("")
    const[adminName,setAdminName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[phoneNumber,setPhoneNumber]=useState("")
    const {adminId}=useParams()

    const navigate=useNavigate()
    const{auth}=useContext(AuthContext)


    useEffect(()=>{
        console.log("useEffect() fired.....")
        if(adminId){
            console.log("id received from url using useParams()",adminId)
            AdminService.getAdminById(adminId,auth.accessToken).then(
                (response)=>{
                            console.log("Response from getAdminById",response.data)
                            setFirstName(response.data.firstName)
                            setLastName(response.data.lastName)
                            setAdminName(response.data.adminName)
                            setPassword(response.data.password)
                            setPhoneNumber(response.data.phoneNumber)
                }
            ).catch((error)=>{console.log("Error from getAdminById() api",error)})}
    },[])

    const saveadmin=(e)=>{
        e.preventDefault();
        const obj2={firstName,lastName,adminName,email,password,phoneNumber}
        console.log("Data received from the form....",obj2)
        if(adminId){
            AdminService.updateadmin(adminId,obj2,auth.accessToken).then(response=>{
                console.log("Response received from updatevehicle API...",response.data)
                navigate("/admindata/"+auth.adminId)
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
                                <label className='form-label'>Admin Name</label>
                                <input type='text' placeholder='Enter the adminName' name='adminName' className='form-control' value={adminName} onChange={(e)=>setAdminName(e.target.value)}/>
                            </div>
    
                            

                            <div className='form-group mb-2'>
                                <label className='form-label'>Phone Number</label>
                                <input type='text' placeholder='Enter the phonenumber' name='phonenumber' className='form-control' value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
                            </div>
    
                            <div className='form-group mb-2'>
                                <label className='form-label'>Password</label>
                                <input type='text' placeholder='Enter the password' name='password' className='form-control' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
    
                            <button className='btn btn-success' onClick={(e)=>saveadmin(e)}>Save</button>
                            <Button style={{ position:"absolute",left:"20%",top:"89.5%" }}className="btn btn-danger" onClick={() => navigate("/admindata/"+auth.adminId)}> Cancel</Button>                    
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