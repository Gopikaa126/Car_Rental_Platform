import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/Authprovider'
import ReservationService from '../services/ReservationService'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const AdminReservationList = () => {

    const[reservations,setreservations]=useState([])
    const{auth}=useContext(AuthContext)
    const navigate = useNavigate();



    useEffect(()=>{
        console.log("useEffect invoked....")
        console.log("auth.accessToken")
        ReservationService.getallreservations(auth.accessToken).then((response)=>{
            console.log("response from getallemployees API.....",response.data)
            setreservations(response.data)
        }).catch((error)=>{console.log("error from API ",error)})
    },[])

  return (
    <div style={{ backgroundColor: "#b8c7c7",minHeight: "150vh", overflowX: "hidden"  }}>

    <div className='container'>
      {console.log("App rendered")}
      <h2 className='text-center'>Reservation List</h2>
      <table className='table table-bordered table-striped table-hover'>
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>User ID</th>
            <th>Vehicle ID</th>
           
            <th>Booking Time</th>
            <th>Total Cost</th>

            <th>PickupDateTime</th>
            <th>DropOffDateTime</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, key) => (
            <tr key={key}>
              <td>{reservation.reservationId}</td>
              <td>{reservation.user.userId}</td>
              <td>{reservation.vehicle.vehicleId}</td>
                
              <td>{reservation.createdAt}</td>
              <td>{reservation.totalCost}</td>           

              <td>{reservation.pickupDateTime}</td>
              <td>{reservation.dropOffDateTime}</td> 
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
