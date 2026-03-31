import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaLeaf, FaHandsHelping, FaSeedling, FaGlobe } from 'react-icons/fa';

const About = () => {
  return (
    <>
      <section className="bg-success bg-opacity-10 py-5">
        <Container>
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-3">About Us</h1>
            <p className="lead">Connecting you with nature's best, directly from farm to table</p>
          </div>
        </Container>
      </section>
      
      <Container className="py-5">
        <Row className="align-items-center mb-5">
          <Col lg={6} className="mb-4 mb-lg-0">
            <img 
              src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Organic Farming" 
              className="img-fluid rounded-4 shadow"
            />
          </Col>
          <Col lg={6}>
            <h2 className="fw-bold mb-4">Our Story</h2>
            <p className="lead mb-3">
              Founded in 2024, Organic & Seasonal was born from a simple idea: everyone deserves access to fresh, organic, and seasonal produce directly from farmers who care about sustainable agriculture.
            </p>
            <p className="text-muted">
              We believe that food should be transparent, traceable, and trustworthy. Our platform connects you with local farmers who grow food using traditional, sustainable methods without harmful chemicals or pesticides.
            </p>
            <p className="text-muted">
              By eliminating middlemen, we ensure farmers get fair prices for their hard work while you get the freshest produce at the best possible prices.
            </p>
          </Col>
        </Row>
        
        <h2 className="text-center fw-bold mb-5">Our Mission & Values</h2>
        <Row className="g-4 mb-5">
          <Col md={3}>
            <div className="text-center p-4 bg-white rounded-4 shadow-sm h-100">
              <FaLeaf size={48} className="text-success mb-3" />
              <h5 className="fw-bold">100% Organic</h5>
              <p className="text-muted small">Certified organic produce grown without synthetic inputs</p>
            </div>
          </Col>
          <Col md={3}>
            <div className="text-center p-4 bg-white rounded-4 shadow-sm h-100">
              <FaHandsHelping size={48} className="text-success mb-3" />
              <h5 className="fw-bold">Fair Trade</h5>
              <p className="text-muted small">Fair prices for farmers, transparency for consumers</p>
            </div>
          </Col>
          <Col md={3}>
            <div className="text-center p-4 bg-white rounded-4 shadow-sm h-100">
              <FaSeedling size={48} className="text-success mb-3" />
              <h5 className="fw-bold">Seasonal Eating</h5>
              <p className="text-muted small">Promoting seasonal produce for better nutrition and taste</p>
            </div>
          </Col>
          <Col md={3}>
            <div className="text-center p-4 bg-white rounded-4 shadow-sm h-100">
              <FaGlobe size={48} className="text-success mb-3" />
              <h5 className="fw-bold">Sustainability</h5>
              <p className="text-muted small">Reducing food miles and supporting eco-friendly practices</p>
            </div>
          </Col>
        </Row>
        
        <h2 className="text-center fw-bold mb-5">Why Choose Us?</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3">🌱 Direct from Farmers</h5>
                <p className="text-muted">No middlemen means fresher produce and better prices for both farmers and consumers.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3">📦 24-Hour Harvest</h5>
                <p className="text-muted">Products are harvested and delivered within 24 hours to ensure maximum freshness.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3">✅ Certified Quality</h5>
                <p className="text-muted">All products are certified organic and undergo strict quality checks.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;