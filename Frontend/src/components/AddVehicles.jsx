import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import VehiclesService from '../services/VehiclesService'
import AuthContext from '../context/Authprovider'
import { Button } from 'react-bootstrap'

export const AddVehicles = () => {

    const[make,setmake]=useState("")
    const[model,setmodel]=useState("")
    const[imageURL,setimageURL]=useState("")
    const[location,setlocation]=useState("")
    const[year,setyear]=useState("")
    const[capacity,setcapacity]=useState("")
    const[pricePerDay,setpricePerDay]=useState("")
    const [availabilityStatus, setavailabilityStatus] = useState("");

    const navigate=useNavigate()
    const {vehicleId}=useParams()
    const{auth}=useContext(AuthContext)


    const changeTitle=()=>{
        if(vehicleId){
            return <h2 className='text-center'>Update Car</h2>
        }
        else{
            return <h2 className='text-center'>Add New Car</h2>
        }
    }
    useEffect(()=>{
        console.log("useEffect() fired.....")
        if(vehicleId){
            console.log("id received from url using useParams()",vehicleId)
            VehiclesService.getVehicldById(vehicleId,auth.accessToken).then(
                (response)=>{
                            console.log("Response from getvehicleByid",response.data)
                            setmake(response.data.make)
                            setmodel(response.data.model)
                            setimageURL(response.data.imageURL)
                            setlocation(response.data.location)
                            setyear(response.data.year)
                            setcapacity(response.data.capacity)
                            setpricePerDay(response.data.pricePerDay)
                            setavailabilityStatus(response.data.availabilityStatus)
                }
            ).catch((error)=>{console.log("Error from getvehicleByid() api",error)})}
    },[])

    const savevehicle=(e)=>{
        e.preventDefault();
        const obj2={make,model,imageURL,location,year,capacity,pricePerDay,availabilityStatus}
        console.log("Data received from the form....",obj2)
        if(vehicleId){
            VehiclesService.updatevehicle(vehicleId,obj2,auth.accessToken).then(response=>{
                console.log("Response received from updatevehicle API...",response.data)
                navigate("/adminvehicleslist")
            }).catch(error=>{
                console.log("Error from updatevehicle api",error)
            })
        }
        else{
        VehiclesService.createvehicle(obj2,auth.accessToken).then(response=>{
            console.log("Response received from createvehicle API...",response.data)
            navigate("/adminvehicleslist")
        }).catch(error=>{
            console.log("Error from createvehicle api",error)
        })
    }
    }



  return (
    <div style={{ backgroundColor: "#b8c7c7",height: "150vh", padding: "20px" }}>
        <div className='container'>
            <div className='card col-md-6 offset-md-3'>
                {changeTitle()}
                <div className='card-body'>
                <form>
                        {/*Read firstNmae*/}
                        <div className='form-group mb-2'>
                            <label className='form-label'> Car Brand</label>
                            <input type='text' placeholder='Enter the car Brand' name='make' className='form-control' value={make} onChange={(e)=>setmake(e.target.value)}/>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Model</label>
                            <input type='text' placeholder='Enter the model' name='model' className='form-control' value={model} onChange={(e)=>setmodel(e.target.value)}/>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>ImageURL</label>
                            <input type='text' placeholder='Enter the imageURL' name='imageURL' className='form-control' value={imageURL} onChange={(e)=>setimageURL(e.target.value)}/>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Location</label>
                            <input type='text' placeholder='Enter the location' name='location' className='form-control' value={location} onChange={(e)=>setlocation(e.target.value)}/>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Model Year</label>
                            <input type='text' placeholder='Enter the year' name='year' className='form-control' value={year} onChange={(e)=>setyear(e.target.value)}/>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Capacity</label>
                            <input type='text' placeholder='Enter the capacity' name='capacity' className='form-control' value={capacity} onChange={(e)=>setcapacity(e.target.value)}/>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Price Per Day</label>
                            <input type='text' placeholder='Enter the Price Per Day' name='pricePerDay' className='form-control' value={pricePerDay} onChange={(e)=>setpricePerDay(e.target.value)}/>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Availability Status</label>
                            <input type='text' placeholder='Enter the Status' name='availabilityStatus' className='form-control' value={availabilityStatus} onChange={(e)=>setavailabilityStatus(e.target.value)}/>
                        </div>

                        <button className='btn btn-success' onClick={(e)=>savevehicle(e)}>Save</button>
                        <Button style={{ position:"absolute",left:"20%",top:"93%" }}className="btn btn-danger" onClick={() => navigate('/adminvehicleslist')}> Cancel</Button>                    
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
