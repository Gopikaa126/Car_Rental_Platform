import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Row, Col, Card, Form } from "react-bootstrap";
import AuthContext from "../context/Authprovider";
import AdminService from "../services/AdminService";

export const AdminData = () => {
  const { adminId } = useParams(); 
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (adminId) {
      AdminService.getAdminById(adminId, auth.accessToken) 
        .then((response) => {
            setAdmin(response.data);
        })
        .catch((error) => {
          console.log("Error fetching admin details: ", error);
        });
    }
  }, [adminId, auth.accessToken]);

  return (
    <div style={{ backgroundColor: "#b8c7c7",height: "100vh", padding: "20px" }}>
    <Container>
      <Row className="mb-4">
        <Col>
          <h2>Admin Details</h2>
          <br/>
          {admin && (
            <Form>
              
              <Form.Group as={Row} className="mb-3" controlId="formFirstName">
                <Form.Label column sm={2}>
                  First Name
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    value={admin.firstName}
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
                    value={admin.lastName}
                    readOnly
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formadminNname">
                <Form.Label column sm={2}>
                  Admin Name
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    value={admin.adminName}
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
                    value={admin.email}
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
                    value={admin.phoneNumber}
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
                    value={admin.updatedAt}
                    readOnly
                  />
                </Col>
              </Form.Group>

              <Button style={{ position:"absolute",left:"43%" }}variant="dark" onClick={() => navigate("/adminuse")}>
                Back
              </Button>
              <Button style={{ position:"absolute",left:"50%" }}variant="dark" onClick={() => navigate("/updateadmin/"+auth.adminId)}>
                Update
              </Button>
              
            </Form>
          )}
        </Col>
      </Row>
    </Container>
    </div>
  );
};
