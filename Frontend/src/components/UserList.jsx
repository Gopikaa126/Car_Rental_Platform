import "../App.css"
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/Authprovider";
import UsersService from "../services/UsersService";
import { HeaderComponent } from "./HeaderComponent";
import { FooterComponent } from "./FooterComponent";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export const UserList = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([])
  const{auth}=useContext(AuthContext)

  useEffect(()=>{
    console.log("useEffect invoked....")
    console.log("auth.accessToken")
    UsersService.getallUsers(auth.accessToken).then((response)=>{
        console.log("response from getallusers API.....",response.data)
        setUsers(response.data)
    }).catch((error)=>{console.log("error from API ",error)})
  },[])

  return (<>

<div style={{ backgroundColor: "#b8c7c7",height: "300vh", padding: "20px" }}>

    <div className="container">
        {console.log("App rendered")}
      <h2 className="text-center">Users Data</h2>
      <table className='table table-bordered table-striped table-hover'>
      <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
          </thead>

        <tbody>
          {users.map((user,key) => (<tr key={key}>
              <td>{user.userId}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.createdAt}</td>
              <td>{user.updatedAt}</td>
            </tr>))}
        </tbody>
      </table>
      <Button variant="dark" onClick={() => navigate("/adminuse")}>
        Back
      </Button>     
       </div>
       </div>
    </>

  )
}

