import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/Authprovider";
import VehiclesService from "../services/VehiclesService";
import { useNavigate } from "react-router-dom";
import { Table, Button, Form, Container, Row, Col } from "react-bootstrap";

export const AdminVehiclesList = () => {
  const [vehicles, setVehicles] = useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    VehiclesService.getallVehicles(auth.accessToken)
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.log("Error fetching vehicles:", error);
      });
  }, [auth.accessToken]);

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
    <div style={{ backgroundColor: "#b8c7c7",minHeight: "300vh",overflowX: "hidden" }}>

    <Container style={{ position:"absolute",left:"5%"}}>

      <Row className="mb-3">
        <Col>
          <Button style={{position:"absolute",left:"2%",top:"1.5%"}} variant="dark" onClick={() => navigate("/addvehicle")}>
            Add Cars
          </Button>
        </Col>
      </Row>
      <div style={{position:"absolute",left:"50%",top:"1%"}}>

      <Row className="mb-3">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Search by ID, Make, Model, Location, Capacity, Price per Day, or Status"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col>
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </Col>
        <Col>
          <Button style={{position:"absolute",left:"100%",top:"1%",width:"40%"}}variant="dark" onClick={handleShowAllVehicles}>
            List All Cars
          </Button>
        </Col>
      </Row>
      </div>
      <h2 style={{marginTop:"9%"}}className="text-center">Cars Data</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Car Brand</th>
            <th>Model</th>
            <th>Image URL</th>
            <th>Location</th>
            <th>Year</th>
            <th>Capacity</th>
            <th>Price Per Day</th>
            <th>Availability Status</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Reservation</th>
            <th>Update Vehicle</th>
          </tr>
        </thead>
        <tbody>
          {(isSearchActive ? filteredVehicles : vehicles).map((vehicle, index) => (
            <tr key={index}>
              <td>{vehicle.vehicleId}</td>
              <td>{vehicle.make}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.imageURL}</td>
              <td>{vehicle.location}</td>
              <td>{vehicle.year}</td>
              <td>{vehicle.capacity}</td>
              <td>{vehicle.pricePerDay}</td>
              <td>{vehicle.availabilityStatus}</td>
              <td>{vehicle.createdAt}</td>
              <td>{vehicle.updatedAt}</td>
              <td>
                <Button
                  variant="success"
                  disabled={vehicle.availabilityStatus !== "Available"}
                >
                  Reserve
                </Button>
              </td>
              <td>
                <Button
                  variant="info"
                  onClick={() => navigate("/addvehicle/" + vehicle.vehicleId)}
                >
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="dark" onClick={() => navigate("/adminuse")}>
        Back
      </Button>
    </Container>
    </div>
  );
};
