import React, { useContext, useRef, useState } from 'react'
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import AuthContext from '../context/Authprovider';
import { Link, useNavigate } from 'react-router-dom';
import AdminService from "../services/AdminService";
import 'bootstrap/dist/css/bootstrap.min.css';


export const AdminLoginComponent = () => {
    const {setAuth}=useContext(AuthContext)
    const navigate=useNavigate()
    const adminRef=useRef()
    const errorRef=useRef()
    const[adminName,setAdminName]=useState('')
    const[password,setPassword]=useState('')
    const[errMsg,setErrMsg]=useState('')

  const handleSubmit=(e)=>{
          e.preventDefault()
          console.log("Adminname received from form",adminName+password)
          const obj={"adminName":adminName,"password":password}
          setAdminName("")
          setPassword("")
          AdminService.loginAdmin(obj).then(response=>{
              console.log("response received from login API",response.data)
              const accessToken=response.data.accessToken
              console.log("accessTiken",accessToken)

              const adminName=response.data.adminDto.adminName
              const role=response.data.adminDto.role
              const adminId = response.data.adminDto.adminId;  
              console.log("Admin ID from login response:", adminId);
              setAuth({adminName,role,adminId,accessToken})
              navigate('/adminuse');
          }).catch(error=>{
              console.log("Error from login API",error)
              setErrMsg("Login failed. Please check your credentials.");
          })
      }
  
    return (
        <div id="loginbackground">

        <Container className="login custom-margin-top">
            <Row className="justify-content-center">
                <Col md={3}>         
                <section style={{position:"absolute",top:"10%",backgroundColor:"rgb(170, 203, 219)",borderRadius:"10px",width:"30%",left:"35%"}}>
                        {errMsg && <Alert variant="danger" ref={errorRef}>{errMsg}</Alert>}
                        <h1 className="text-center">Sign In</h1>
                        <Form  style={{marginLeft:"5%",marginRight:"5%"}} onSubmit={handleSubmit}>  
                            <Form.Group controlId="adminName">
                                <Form.Label>Admin Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your adminname"
                                    ref={adminRef}
                                    autoComplete="off"
                                    onChange={(e) => setAdminName(e.target.value)}
                                    value={adminName}
                                    required
                                />
                            </Form.Group>

                        <Form.Group controlId="password" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </Form.Group>
                        
                        
                            <Button variant="success" type="submit" className="mt-3 w-100">Sign In</Button>
                            <div className="already text-center mt-3">
                            <p>Need an account? <Link to="/adminregister">Register</Link></p>
                        </div>
                            </Form>
                        </section>
                        
                    </Col>
                </Row>
            </Container>
            </div>
         
  )
}
