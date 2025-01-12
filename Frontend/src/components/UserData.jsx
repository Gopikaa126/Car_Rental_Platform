import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Row, Col, Card, Form } from "react-bootstrap";
import AuthContext from "../context/Authprovider";
import UsersService from "../services/UsersService";

export const UserData = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (userId) {
      UsersService.getUserById(userId, auth.accessToken) 
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log("Error fetching user details: ", error);
        });
    }
  }, [userId, auth.accessToken]);

  return (
    <div style={{ backgroundColor: "#b8c7c7",height: "100vh", padding: "20px" }}>
    <Container>
      <Row className="mb-4">
        <Col>
          <h2>User Details</h2>
          <br/>
          {user && (
            <Form>
              
              <Form.Group as={Row} className="mb-3" controlId="formFirstName">
                <Form.Label column sm={2}>
                  First Name
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    value={user.firstName}
                    readOnly
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formLastName">
                <Form.Label column sm={2}>
                  Last Name
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    value={user.lastName}
                    readOnly
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formUsername">
                <Form.Label column sm={2}>
                  Username
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    value={user.username}
                    readOnly
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formEmail">
                <Form.Label column sm={2}>
                  Email
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="email"
                    value={user.email}
                    readOnly
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formPhoneNumber">
                <Form.Label column sm={2}>
                  Phone Number
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    value={user.phoneNumber}
                    readOnly
                  />
                </Col>
              </Form.Group>

              

              <Form.Group as={Row} className="mb-3" controlId="formUpdatedAt">
                <Form.Label column sm={2}>
                  Updated At
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    value={user.updatedAt}
                    readOnly
                  />
                </Col>
              </Form.Group>

              <Button style={{ position:"absolute",left:"43%" }}variant="dark" onClick={() => navigate("/vehicleslist")}>
                Back
              </Button>
              <Button style={{ position:"absolute",left:"50%" }}variant="dark" onClick={() => navigate("/updateuser/"+auth.userId)}>
                Update
              </Button>
              <Button style={{ position:"absolute",left:"80%",top:"5%" }}variant="dark" onClick={() => navigate("/myreservations/"+auth.userId)}>
                My Reservations
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
    </div>
  );
};
