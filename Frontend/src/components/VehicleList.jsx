import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/Authprovider";
import VehiclesService from "../services/VehiclesService";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    console.log("useEffect invoked....");
    VehiclesService.getallVehicles(auth.accessToken)
      .then((response) => {
        console.log("response from getallvehicles API.....", response.data);
        setVehicles(response.data);
      })
      .catch((error) => {
        console.log("error from API ", error);
      });
  }, [auth.accessToken]);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev); // Toggle visibility of menu on image click
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      alert("Please enter a valid search term.");
      return;
    }

    const filtered = vehicles.filter((vehicle) => {
      return (
        vehicle.vehicleId.toString().includes(searchTerm) ||
        (vehicle.make && vehicle.make.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (vehicle.model && vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (vehicle.location && vehicle.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (vehicle.capacity && vehicle.capacity.toString().includes(searchTerm)) ||
        (vehicle.pricePerDay && vehicle.pricePerDay.toString().includes(searchTerm)) ||
        (vehicle.availabilityStatus && vehicle.availabilityStatus.toLowerCase() === searchTerm.toLowerCase())
      );
    });

    setFilteredVehicles(filtered);
    setIsSearchActive(true);
  };

  const handleShowAllVehicles = () => {
    setSearchTerm("");
    setFilteredVehicles([]);
    setIsSearchActive(false);
  };

  return (
    <div style={{ backgroundColor: "#b8c7c7", minHeight: "100vh", overflowX: "hidden" }}>
      <Container>
      <h2 className="text-center my-4">Cars Data</h2>

        
        {/* Search Section */}
        <Row className="my-3 justify-content-center">
          <Col md={5}>
            <Form.Control
              type="text"
              placeholder="Search by ID, Make, Model, Location, Capacity, Price per Day, or Status"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Col>
          <Col xs="auto">
            <Button variant="secondary" onClick={handleShowAllVehicles}>
              List All Cars
            </Button>
          </Col>
        </Row>

        <div className="logo"  style={{ cursor: "pointer" }}onClick={toggleMenu}>
                <h6 style={{ position:"absolute",left:"13%",top:"90%"}}>Profile</h6>
              </div>
        
              <div className="listingmenu">
        
              {menuVisible && (
                    <Dropdown.Menu show style={{  transform: 'translateX(-15%)' }}>
                      <Dropdown.Item onClick={() => navigate("/userdata/"+ auth.userId) }>View Profile</Dropdown.Item>
                      <Dropdown.Item onClick={() => navigate("/welcome") }>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  )}
        </div> 

        {/* Vehicles Section */}
        <Row xs={1} md={3} className="g-4">
          {(isSearchActive ? filteredVehicles : vehicles).map((vehicle, key) => (
            <Col key={key}>
              <Card>
                <Card.Img variant="top" src={vehicle.imageURL} alt={vehicle.make} />
                <Card.Body>
                  <Card.Title>
                    {vehicle.make} {vehicle.model}
                  </Card.Title>
                  <Card.Text>
                    <strong>ID:</strong> {vehicle.vehicleId}
                    <br />
                    <strong>Location:</strong> {vehicle.location}
                    <br />
                    <strong>Year:</strong> {vehicle.year}
                    <br />
                    <strong>Capacity:</strong> {vehicle.capacity}
                    <br />
                    <strong>Price/Day:</strong> ₹{vehicle.pricePerDay}
                    <br />
                    <strong>Status:</strong> {vehicle.availabilityStatus}
                  </Card.Text>
                  <Button
                    variant="success"
                    disabled={vehicle.availabilityStatus !== "Available"}
                    onClick={() =>
                      navigate("/createreservation/" + auth.userId + "/" + vehicle.vehicleId)
                    }
                  >
                    Reserve
                  </Button>
                  <Button style={{ position:"absolute",marginLeft:"2%" }}variant="success" onClick={() => navigate("/viewreview/" + vehicle.vehicleId)}>
                    Reviews
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
