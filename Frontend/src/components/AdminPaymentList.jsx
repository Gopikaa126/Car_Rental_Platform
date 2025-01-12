import React, { useContext, useEffect, useState } from 'react'
import PaymentService from '../services/PaymentService'
import AuthContext from '../context/Authprovider'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const AdminPaymentList = () => {
    const[payments,setpayments]=useState([])
    const{auth}=useContext(AuthContext)
    const navigate = useNavigate();


    useEffect(()=>{
        console.log("useEffect invoked....")
        console.log("auth.accessToken")
        PaymentService.getallpayments(auth.accessToken).then((response)=>{
            console.log("response from getallpayments API.....",response.data)
            setpayments(response.data)
        }).catch((error)=>{console.log("error from API ",error)})
    },[])


  return (
    <div style={{ backgroundColor: "#b8c7c7",height: "300vh",padding: "20px" }}>

    <div className='container'>
      {console.log("App rendered")}
      <h2 className='text-center'>Payment List</h2>
      <table className='table table-bordered table-striped table-hover'>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>User ID</th>
            <th>Reservation ID</th>
            <th>Vehicle ID</th>
            <th>Payment Method</th>
            <th>Amount</th>
            <th>Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, key) => (
            <tr key={key}>
              <td>{payment.paymentId}</td>
              <td>{payment.user.userId}</td>
              <td>{payment.reservation.reservationId}</td>
              <td>{payment.vehicle.vehicleId}</td>
              <td>{payment.paymentMethod}</td>
              <td>{payment.amount}</td>   
              <td>{payment.paymentDate}</td>

            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="dark" onClick={() => navigate("/adminuse")}>
        Back
      </Button>
    </div>
    </div>
  )
}
