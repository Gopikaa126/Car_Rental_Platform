import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import AuthContext from '../context/Authprovider';
import PaymentService from '../services/PaymentService';
import VehiclesService from '../services/VehiclesService';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export const PaymentForm = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { reservationId } = useParams();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [netBankingDetails, setNetBankingDetails] = useState('');
  const [amount, setAmount] = useState(0);
  const [baseAmount, setBaseAmount] = useState(0);
  const gst = 0.18; // GST rate
  const { vehicleId,userId } = useParams();

  const paymentMethods = ['CREDIT_CARD', 'DEBIT_CARD', 'NET_BANKING', 'UPI'];

  useEffect(() => {
    if (location.state?.baseAmount) {
      setBaseAmount(location.state.baseAmount);
      setAmount(parseFloat(location.state.baseAmount) * (1 + gst)); // Calculate total
    } else {
      console.error('Base amount not provided. Please go back and create a reservation.');
    }
  }, [location.state]);

  const savePayment = (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    const paymentData = {
      reservationId,
      vehicleId,
      userId,
      paymentMethod,
      amount,
      ...(paymentMethod === 'UPI' && { upiId }),
      ...(paymentMethod === 'CREDIT_CARD' || paymentMethod === 'DEBIT_CARD') && { cardNumber },
      ...(paymentMethod === 'NET_BANKING' && { netBankingDetails }),
    };

    console.log('Payment Data:', paymentData);

    PaymentService.createpayments(reservationId, vehicleId,userId, paymentData, auth.accessToken)
      .then((response) => {
        console.log('Response from createPayments API:', response.data);
        updateVehicleStatusToReserved();
        navigate('/congratulations'); // Redirect to login or another desired page
      })
      .catch((error) => {
        console.error('Error from createPayments API:', error);
      });
  };

  const updateVehicleStatusToReserved = () => {
    VehiclesService.updateVehicleStatus(vehicleId, 'Reserved', auth.accessToken)
      .then((response) => {
        console.log('Vehicle status updated to Reserved:', response.data);
      })
      .catch((error) => {
        console.error('Error updating vehicle status:', error);
      });
  };

  return (
    <div style={{ backgroundColor: "#b8c7c7",height: "100vh", padding: "20px" }}>

    <Container>
      <h1 className="text-center my-4">Payment Form</h1>
      <Form onSubmit={savePayment} style={{position:"absolute", left:"33%",top:"25%" }}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={5}>
            Payment Method
          </Form.Label>
          <Col sm={7}>
            <Form.Select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="">Select Payment Method</option>
              {paymentMethods.map((method, index) => (
                <option key={index} value={method}>
                  {method}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Conditional fields based on payment method */}
        {paymentMethod === 'UPI' && (
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={5}>
              UPI ID
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="Enter your UPI ID"
                required
              />
            </Col>
          </Form.Group>
        )}

        {(paymentMethod === 'CREDIT_CARD' || paymentMethod === 'DEBIT_CARD') && (
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={5}>
              Card Number
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Enter your card number"
                required
              />
            </Col>
          </Form.Group>
        )}

        {paymentMethod === 'NET_BANKING' && (
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={5}>
              Net Banking Details
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                value={netBankingDetails}
                onChange={(e) => setNetBankingDetails(e.target.value)}
                placeholder="Enter net banking details"
                required
              />
            </Col>
          </Form.Group>
        )}

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={5}>
            Base Amount (₹)
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="text" value={baseAmount.toFixed(2)} readOnly />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={5}>
            GST (₹)
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="text" value={(gst * baseAmount).toFixed(2)} readOnly />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={5}>
            Total Amount (₹)
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="text" value={amount.toFixed(2)} readOnly />
          </Col>
        </Form.Group>

        <Row className="justify-content-center">
          <Col xs="auto">
            <Button style={{ position:"absolute",left:"45%",top:"105%" }}type="submit" variant="dark">
              Make Payment
            </Button>

            <Button style={{ position:"absolute",left:"25%",top:"105%" }}variant="dark" onClick={() => navigate("/createreservation/" + auth.userId + "/" + vehicleId)}>Back </Button>

          </Col>
        </Row>
      </Form>
    </Container>
    </div>
  );
};
