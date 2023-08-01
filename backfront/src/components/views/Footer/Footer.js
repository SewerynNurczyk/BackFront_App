import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';

const Footer = () => {
  return (
    <Container>
      <Row className="justify-content-center text-muted">
        <Col>
        <p className="text-center text-muted mt-4 mb-4">Copyright &copy; Sewi Nurczyk 2023</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;