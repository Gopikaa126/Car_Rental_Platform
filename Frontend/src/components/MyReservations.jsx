import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/Authprovider";
import PaymentService from "../services/PaymentService";
import { Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export const MyReservations = () => {
  const { userId } = useParams();
  const [payments, setPayments] = useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      PaymentService.findpaymentsByUserId(userId, auth.accessToken)
        .then((response) => {
          setPayments(response.data);
        })
        .catch((error) => {
          console.log("Error fetching user details: ", error);
        });
    }
  }, [userId, auth.accessToken]);

  return (
    <div style={{ backgroundColor: "#b8c7c7",height: "150vh", padding: "20px" }}>
    <div className="container" >
      <h2 className="text-center my-4">Reservation List</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {payments.map((payment, key) => (
          <Col key={key}>
            <Card>
              <Card.Body>
                <Card.Title>
                  {payment.vehicle.make} {payment.vehicle.model}
                </Card.Title>
                <Card.Text>
                  <strong>Reservation ID:</strong> {payment.reservation.reservationId}
                  <br />
                  <strong>Car ID:</strong> {payment.vehicle.vehicleId}
                  <br />
                  <strong>Pickup:</strong> {payment.reservation.pickupDateTime}
                  <br />
                  <strong>Drop-Off:</strong> {payment.reservation.dropOffDateTime}
                  <br />
                  
                  <strong>Boarding Location:</strong> {payment.vehicle.location}
                  <br />
                  <strong>Price/Day:</strong> ₹{payment.vehicle.pricePerDay}
                  <br />
                  <strong>Total Cost:</strong> ₹{payment.reservation.totalCost}
                  <br />
                  <strong>Total Cost + GST:</strong> ₹{payment.amount}
                  <br />
                  
                  <strong>Payment Method:</strong> {payment.paymentMethod}
                </Card.Text>
                <Button
                  variant="dark"
                  className="mb-2"
                  onClick={() =>
                    navigate("/AddReview/" + userId + "/" + payment.vehicle.vehicleId)
                  }
                >
                  Add Review
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Button variant="dark" className="mt-4" onClick={() => navigate("/userdata/" + auth.userId)}>
        Back
      </Button>
    </div>
    </div>
  );
};
