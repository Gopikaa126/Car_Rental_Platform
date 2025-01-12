import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";

export const HeaderComponent = () => {
  const [showContent, setShowContent] = useState("");

  // Function to display specific content
  const handleShowContent = (type) => {
    setShowContent(type);
  };

  return (
    <>
      {/* Header Buttons Top-Right */}
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
        <Button
          variant="success"
          onClick={() => handleShowContent("contact")}
        >
          Contact
        </Button>
      </div>


      {showContent && (
        <Container
          className="mt-5 bg-light p-4 rounded"
          style={{ marginTop: "3rem" }}
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
              <p>
                Address: 123, Car Rent Plaza, Erode, Tamil Nadu, India.
              </p>
            </>
          )}
        </Container>
      )}
    </>
  );
};
