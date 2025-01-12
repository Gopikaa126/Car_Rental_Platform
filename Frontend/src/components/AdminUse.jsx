import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Admin.css"
import { Button, Dropdown } from "react-bootstrap";
import AuthContext from '../context/Authprovider';


export const AdminUse = () => {

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev); // Toggle visibility of menu on image click
  };

  return (

    <div style={{ backgroundColor: "#b8c7c7",height: "100vh", padding: "20px" }}>

    <div className='adminmanage' id="back">
        <Button style={{ position:"absolute",left:"15%",height:"70%",width:"12%",top:"20%" }} className="userlist" onClick={() => navigate("/userslist")}>Users Data</Button>
        <Button style={{ position:"absolute",left:"30%",height:"70%",width:"12%",top:"20%"  }}className="vehiclelist" onClick={() => navigate("/adminvehicleslist")}>Vehicles Data</Button>                
        <Button style={{ position:"absolute",left:"45%",height:"70%",width:"12%" ,top:"20%" }}className="reviewlist" onClick={() => navigate("/reviewlist")}>Reviews Data</Button>                
        <Button style={{ position:"absolute",left:"60%",height:"70%",width:"12%",top:"20%"  }}className="adminreservationlist" onClick={() => navigate("/adminreservationlist")}>Reservations Data</Button>                
        <Button style={{ position:"absolute",left:"75%",height:"70%",width:"12%",top:"20%"  }}className="adminpaymentlist" onClick={() => navigate("/adminpaymentlist")}>Payments Data</Button>

        <div className="logo"  style={{ cursor: "pointer" }}onClick={toggleMenu}>
        <h6 style={{ position:"absolute",left:"13%",top:"90%"}}>Profile</h6>
      </div>

      <div className="listingmenu">

      {menuVisible && (
            <Dropdown.Menu show style={{  transform: 'translateX(-15%)' }}>
              <Dropdown.Item onClick={() => navigate("/admindata/"+ auth.adminId) }>View Profile</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/welcome") }>Logout</Dropdown.Item>
            </Dropdown.Menu>
          )}
          </div>                

    </div>
    </div>
  )
}
