import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

export const WelcomePage = () => {
  const [showContent, setShowContent] = useState(""); // State to track displayed content
  const navigate = useNavigate();

  // Function to handle content toggle
  const handleShowContent = (type) => {
    setShowContent(type);
  };

  return (
    <div className="d-flex flex-column min-vh-100" id="background1">
      {/* Header Buttons Positioned Top-Right */}
      <div
        className="d-flex justify-content-end p-3"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100%",
          zIndex: 10,
        }}
      >
        <Button
          variant="primary"
          className="me-2"
          onClick={() => handleShowContent("about")}
        >
          About Us
        </Button>
        <Button variant="success" onClick={() => handleShowContent("contact")}>
          Contact
        </Button>
      </div>

      <div className="content text-center text-white mt-5">
        <h1
          style={{ position: "absolute", top: "23%", left: "12%" }}
          className="display-4 fw-bold mb-3"
        >
          Drive Your Journey, Your Way.
        </h1>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <p className="fs-5">
          Choose from a wide range of cars, book in seconds, and hit the road
          with confidence. Affordable, fast, and reliable car rentals at your
          fingertips.
        </p>

        {/* Admin and User Buttons */}
        <div className="mt-5">
          <button
            className="btn btn-primary mx-2"
            style={{ width: "150px" }}
            onClick={() => navigate("/userlogin")}
          >
            User
          </button>
          <button
            className="btn btn-success mx-2"
            style={{ width: "150px" }}
            onClick={() => navigate("/adminlogin")}
          >
            Admin
          </button>
        </div>
      </div>

      {/* Dynamic Content Display */}
      {showContent && (
        <Container
          style={{
            marginTop: "6%",
            marginBottom: "20px",
            maxWidth: "90%",
            alignSelf: "center",
            color:"white",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            
          }}
        >
          {showContent === "about" && (
            <>
              <h2>About Us</h2>
              <p>
                Welcome to Car Rent Service. We pride ourselves on offering a
                seamless car rental experience. Our mission is to make your
                journey enjoyable and hassle-free, offering a wide range of
                vehicles tailored to your needs.
              </p>
              <p>
                Established in 2024, we have quickly become a trusted provider
                for affordable, fast, and reliable car rental services. Whether
                you're exploring new places or simply need a car for your daily
                errands, we've got you covered.
              </p>
            </>
          )}
          {showContent === "contact" && (
            <>
              <h2>Contact</h2>
              <p>Email: support@carrentservice.com</p>
              <p>Phone: +91 123-456-7890</p>
              <p>Address: 123, Car Rent Plaza, Erode, Tamil Nadu, India.</p>
            </>
          )}
        </Container>
      )}
    </div>
  );
};



/*import React from 'react'
import { useNavigate } from 'react-router-dom';
import { HeaderComponent } from './HeaderComponent';
import { FooterComponent } from './FooterComponent';
import "./register.css"

export const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div id="background1">
        <HeaderComponent className='header'></HeaderComponent>

        <br></br>
        <FooterComponent className='footer'/>


    </div>
  )
}*/
