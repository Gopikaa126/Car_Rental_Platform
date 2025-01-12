import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Congratulations = () => {
    const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-center">
        
        <Col xs="auto">
        <div className="success-image"></div>
          <h1 className="mt-3">Congratulations!</h1>
          <p className="lead">Your car has been reserved successfully.</p>
        </Col>
      </Row>
      <Button variant="dark" onClick={() => navigate("/vehicleslist")}>
        Back to Vehicles
      </Button>
    </Container>
  );
};
