import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewsService from "../services/ReviewsService";
import AuthContext from "../context/Authprovider";
import { Button, Row, Col, Card } from "react-bootstrap";

export const UserReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { vehicleId } = useParams(); 

  useEffect(() => {
    console.log("Fetching reviews for vehicleId:", vehicleId);
    if (vehicleId) {
      ReviewsService.getReviewsByVehicleID(vehicleId, auth.accessToken)
        .then((response) => {
          console.log("Response received from API", response.data);
          setReviews(response.data);
        })
        .catch((error) => {
          console.log("Error fetching reviews", error);
        });
    }
  }, [vehicleId, auth.accessToken]);

  return (
    <div style={{ backgroundColor: "#b8c7c7",height: "120vh", padding: "20px" }}>
    <div className="container">
      <h2 className="text-center my-4">Reviews </h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {reviews.map((review, key) => (
          <Col key={key}>
            <Card>
              <Card.Body>
                <Card.Title>
                  <strong>Rating:</strong> {review.rating} ⭐
                </Card.Title>
                <Card.Text>
                  {/*<strong>Review ID:</strong> {review.reviewId}
                  <br />
                  <strong>User ID:</strong> {review.user.userId}
                  <br />
                  <strong>Vehicle ID:</strong> {review.vehicle.vehicleId}
                  <br />*/}
                  <strong>Customer Name:</strong> {review.user.firstName}
                  <br />
                  <strong>Review:</strong> {review.reviewText}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Button variant="dark" className="mt-4" onClick={() => navigate("/vehicleslist")}>
        Back to Cars
      </Button>
    </div>
    </div>
  );
};
