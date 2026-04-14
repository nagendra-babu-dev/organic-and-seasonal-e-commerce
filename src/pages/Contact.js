import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 1000);
  };
  
  return (
    <>
      <section className="bg-success bg-opacity-10 py-5">
        <Container>
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-3">Contact Us</h1>
            <p className="lead">We'd love to hear from you! Get in touch with our team</p>
          </div>
        </Container>
      </section>
      
      <Container className="py-5">
        <Row className="g-5">
          <Col lg={5}>
            <h2 className="fw-bold mb-4">Get In Touch</h2>
            <p className="text-muted mb-4">
              Have questions about our products, want to become a farmer partner, or just want to say hello? We're here to help!
            </p>
            
            <div className="mb-4 d-flex align-items-center gap-3">
              <div className="bg-success bg-opacity-10 rounded-circle p-3">
                <FaMapMarkerAlt size={24} className="text-success" />
              </div>
              <div>
                <h6 className="fw-bold mb-1">Our Location</h6>
                <p className="text-muted mb-0">123 Organic Market Lane, Bristol, England BS1 4DJ</p>
              </div>
            </div>
            
            <div className="mb-4 d-flex align-items-center gap-3">
              <div className="bg-success bg-opacity-10 rounded-circle p-3">
                <FaPhone size={24} className="text-success" />
              </div>
              <div>
                <h6 className="fw-bold mb-1">Phone Number</h6>
                <p className="text-muted mb-0">+44 20 7946 0958</p>
                <p className="text-muted mb-0">+44 20 7946 0959</p>
              </div>
            </div>
            
            <div className="mb-4 d-flex align-items-center gap-3">
              <div className="bg-success bg-opacity-10 rounded-circle p-3">
                <FaEnvelope size={24} className="text-success" />
              </div>
              <div>
                <h6 className="fw-bold mb-1">Email Address</h6>
                <p className="text-muted mb-0">support@organicandseasonal.com</p>
                <p className="text-muted mb-0">farmers@organicandseasonal.com</p>
              </div>
            </div>
            
            <div className="mb-4 d-flex align-items-center gap-3">
              <div className="bg-success bg-opacity-10 rounded-circle p-3">
                <FaClock size={24} className="text-success" />
              </div>
              <div>
                <h6 className="fw-bold mb-1">Working Hours</h6>
                <p className="text-muted mb-0">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-muted mb-0">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-muted mb-0">Sunday: Closed</p>
              </div>
            </div>
          </Col>
          
          <Col lg={7}>
            <Card className="border-0 shadow-lg rounded-4">
              <Card.Body className="p-4 p-lg-5">
                <h3 className="fw-bold mb-4">Send Us a Message</h3>
                
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                    />
                  </Form.Group>
                  
                  <Button 
                    type="submit" 
                    className="btn-organic w-100 py-3"
                    disabled={submitted}
                  >
                    {submitted ? 'Sending...' : 'Send Message'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
