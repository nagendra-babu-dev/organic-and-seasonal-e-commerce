import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTruck, FaLeaf, FaAward, FaHandHoldingHeart, FaSeedling, FaShoppingBasket, FaStar } from 'react-icons/fa';
import FeaturedProducts from '../components/FeaturedProducts';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100 py-5">
            <Col lg={6} className="animate-slideInLeft">
              <div className="mb-4">
                <span className="badge bg-success mb-3 px-3 py-2">🌱 Fresh from Farm to Table</span>
                <h1 className="display-3 fw-bold mb-4" style={{ lineHeight: '1.2' }}>
                  Organic & Seasonal
                  <span className="text-success"> Freshness </span>
                  Delivered to Your Doorstep
                </h1>
                <p className="lead mb-4 text-muted">
                  Connect directly with local farmers. Get 100% certified organic, seasonal produce 
                  that's fresh, nutritious, and sustainably grown.
                </p>
                <div className="d-flex gap-3">
                  <Button as={Link} to="/shop" className="btn-organic btn-lg px-4">
                    Shop Now <FaShoppingBasket className="ms-2" />
                  </Button>
                  <Button as={Link} to="/about" variant="outline-organic" className="btn-outline-organic btn-lg px-4">
                    Learn More
                  </Button>
                </div>
                
                <div className="mt-5 pt-3">
                  <Row>
                    <Col xs={4} className="text-center">
                      <FaLeaf size={32} className="text-success mb-2" />
                      <h6>100% Organic</h6>
                      <small className="text-muted">Certified Products</small>
                    </Col>
                    <Col xs={4} className="text-center">
                      <FaTruck size={32} className="text-success mb-2" />
                      <h6>Free Delivery</h6>
                      <small className="text-muted">On orders £40+</small>
                    </Col>
                    <Col xs={4} className="text-center">
                      <FaAward size={32} className="text-success mb-2" />
                      <h6>Farm Fresh</h6>
                      <small className="text-muted">24hr Harvest</small>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            
            <Col lg={6} className="animate-slideInRight">
              <div className="position-relative">
                <img 
                  src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Fresh Organic Produce"
                  className="img-fluid rounded-4 shadow-lg"
                  style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
                />
                <div className="position-absolute bottom-0 end-0 bg-white rounded-3 p-3 shadow-lg m-3">
                  <FaHandHoldingHeart size={24} className="text-success" />
                  <span className="ms-2 fw-bold">Support Local Farmers</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Seasonal Banner */}
      <section className="seasonal-showcase py-5">
        <Container>
          <div className="text-center mb-5">
            <FaSeedling size={48} className="text-success mb-3" />
            <h2 className="display-5 fw-bold">What's In Season Now?</h2>
            <p className="lead text-muted">Discover the freshest seasonal produce available this month</p>
          </div>
          
          <Row className="g-4">
            {seasonalProducts.map((product, index) => (
              <Col key={index} sm={6} md={4} lg={2}>
                <div className="seasonal-card text-center h-100">
                  <div className="seasonal-card__image-wrap">
                    <img src={product.image} alt={product.name} className="seasonal-card__image" />
                  </div>
                  <h5 className="seasonal-card__title mb-1">{product.name}</h5>
                  <small className="seasonal-card__season">{product.season}</small>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      
      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} md={4}>
                <div className="text-center p-4 bg-white rounded-4 shadow-sm h-100 animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="mb-3">{feature.title}</h4>
                  <p className="text-muted">{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      
      {/* Featured Products */}
      <FeaturedProducts />
      
      {/* Testimonials */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center display-5 fw-bold mb-5">What Our Customers Say</h2>
          <Row className="g-4">
            {testimonials.map((testimonial, index) => (
              <Col key={index} md={4}>
                <div className="p-4 bg-white rounded-4 shadow-sm h-100">
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-warning me-1" />
                    ))}
                  </div>
                  <p className="mb-3">"{testimonial.text}"</p>
                  <div className="d-flex align-items-center">
                    <img src={testimonial.avatar} alt={testimonial.name} className="rounded-circle me-3" width="50" height="50" />
                    <div>
                      <h6 className="mb-0 fw-bold">{testimonial.name}</h6>
                      <small className="text-muted">{testimonial.location}</small>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

const seasonalProducts = [
  { name: 'Fresh Mangoes', image: 'https://images.unsplash.com/photo-1565850782747-b2de5e94b2b8?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1200', season: 'Summer Special' },
  { name: 'Organic Apples', image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=600', season: 'Autumn Harvest' },
  { name: 'Leafy Greens', image: 'https://images.unsplash.com/photo-1754926718408-6280785d5991?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1200', season: 'Spring Fresh' },
  { name: 'Pumpkins', image: 'https://images.unsplash.com/photo-1665816019507-23313603cc39?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1200', season: 'Fall Harvest' },
  { name: 'Citrus Fruits', image: 'https://images.pexels.com/photos/1002778/pexels-photo-1002778.jpeg?auto=compress&cs=tinysrgb&w=600', season: 'Winter Fresh' },
  { name: 'Berries', image: 'https://images.unsplash.com/photo-1444459094717-a39f1e3e0903?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1200', season: 'Summer Bounty' },
];

const features = [
  { icon: <FaLeaf size={32} className="text-success" />, title: '100% Certified Organic', description: 'All products are certified organic and sourced directly from verified farms.' },
  { icon: <FaTruck size={32} className="text-success" />, title: 'Farm to Table Delivery', description: 'Freshly harvested produce delivered within 24 hours of harvest.' },
  { icon: <FaAward size={32} className="text-success" />, title: 'Quality Guaranteed', description: 'Every product undergoes strict quality checks before delivery.' },
];

const testimonials = [
  { text: 'The quality of organic vegetables is exceptional! I love knowing exactly where my food comes from.', name: 'Priya Sharma', location: 'Mumbai', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { text: 'Finally a platform that connects me directly with farmers. The seasonal produce section is my favorite!', name: 'Rahul Mehta', location: 'Delhi', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { text: 'Amazing service! Fresh organic produce delivered right to my doorstep. Highly recommended!', name: 'Anjali Singh', location: 'Bangalore', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
];

export default Home;
