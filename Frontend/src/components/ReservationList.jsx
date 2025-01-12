import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/Authprovider';
import { useNavigate, useParams } from 'react-router-dom';
import ReservationService from '../services/ReservationService';
import DateTimePicker from 'react-datetime-picker';
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import VehiclesService from '../services/VehiclesService';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export const ReservationList = () => {
  const [pickupDateTime, setPickupDateTime] = useState(new Date());
  const [dropOffDateTime, setDropOffDateTime] = useState(new Date());
  const [totalCost, setTotalCost] = useState(0);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { vehicleId, userId } = useParams();
  const [pricePerDay, setPricePerDay] = useState(0);

  useEffect(() => {
    VehiclesService.getVehicldById(vehicleId, auth.accessToken)
      .then((response) => {
        setPricePerDay(response.data.pricePerDay);
      })
      .catch((error) => console.error('Error fetching vehicle details:', error));
  }, [vehicleId, auth.accessToken]);

  const handleCalculateCost = () => {
    if (pickupDateTime && dropOffDateTime) {
      const diffInMillis = dropOffDateTime - pickupDateTime;
      const diffInHours = diffInMillis / (1000 * 60 * 60);

      if (diffInHours > 0) {
        const diffInDays = Math.ceil(diffInHours / 24);
        const cost = Math.round(diffInDays * pricePerDay);
        setTotalCost(cost);
      } else {
        alert("Drop-off time must be after the pickup time!");
        setTotalCost(0);
      }
    }
  };

  useEffect(() => {
    handleCalculateCost();
  }, [pickupDateTime, dropOffDateTime]);

  const saveReservation = (e) => {
    e.preventDefault();

    if (!pickupDateTime || !dropOffDateTime || totalCost <= 0) {
      alert('Please enter valid dates and ensure cost is calculated.');
      return;
    }

    const formatDateTime = (date) => {
      const isoString = date.toISOString();
      return isoString.split('.')[0];
    };

    const reservationData = {
      userId,
      vehicleId,
      pickupDateTime: formatDateTime(pickupDateTime),
      dropOffDateTime: formatDateTime(dropOffDateTime),
      totalCost,
    };

    ReservationService.createreservations(userId, vehicleId, reservationData, auth.accessToken)
      .then((response) => {
        const reservationId = response.data?.reservationId;
        navigate("/createpayments/"+reservationId+"/"+vehicleId+"/"+userId, { state: { baseAmount: totalCost } });
      })
      .catch((error) => {
        console.error('Error from createReservation API:', error);
      });
  };

  return (
    <div style={{ backgroundColor: "#b8c7c7",height: "100vh", padding: "20px" }}>

    <Container className="mt-5">
      <h2 className="text-center mb-4">Create Reservation</h2>

      <Form className="ms-5" style={{position:"absolute", left:"25%" }}>

      <Form onSubmit={saveReservation} >
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={5}>
            Vehicle ID:
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="text" value={vehicleId} readOnly />
          </Col>
        </Form.Group>

        {/*form-group spacing and alignment.*/}{/*Adds a bottom margin (mb-3) spacing between form elements.*/}
        {/*Col sm={5} width of input field*/}
        <Form.Group as={Row} className="mb-3">
          {/* form-label input field.sm is the label sizing*/}
          <Form.Label column sm={5}>
            Pickup Date and Time:
          </Form.Label>
          <Col sm={7}>
            <DateTimePicker
              onChange={(date) => setPickupDateTime(date)}
              value={pickupDateTime}
              format="y-MM-dd h:mm a"
              className="w-100"
              minDate={new Date()}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={5}>
            Drop-Off Date and Time:
          </Form.Label>
          <Col sm={7}>
            <DateTimePicker
              onChange={(date) => setDropOffDateTime(date)}
              value={dropOffDateTime}
              format="y-MM-dd h:mm a"
              className="w-100"
              minDate={pickupDateTime}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={5}>
            Total Cost (₹):
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="text" value={totalCost} readOnly />
          </Col>
        </Form.Group>

        <div className="d-flex justify-content-center">
          <br/>
          <Button style={{ position:"absolute",left:"50%",top:"95%" }} variant="dark" type="submit" onClick={saveReservation}>
            Submit Reservation
          </Button>
          <Button style={{ position:"absolute",left:"30%",top:"95%" }}variant="dark" onClick={() => navigate("/vehicleslist")}>Back </Button>

        </div>
        </Form>
      </Form>
    </Container>
    </div>
  );
};
