import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Badge } from 'react-bootstrap';
import { FaSearch, FaFilter, FaLeaf } from 'react-icons/fa';
import ProductCard from '../components/products/ProductCard';
import { products } from '../data/products';

const Shop = ({ addToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const seasons = ['all', 'Spring', 'Summer', 'Monsoon', 'Autumn', 'Winter'];
  const categories = ['all', 'vegetables', 'fruits', 'herbs', 'grains', 'dairy'];

  let filteredProducts = [...products];

  // Search filter
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Season filter
  if (selectedSeason !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.season === selectedSeason);
  }

  // Category filter
  if (selectedCategory !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }

  // Price filter
  filteredProducts = filteredProducts.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

  // Sort
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'newest') {
    filteredProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-success bg-opacity-10 py-5">
        <Container>
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-3">Fresh Organic Produce</h1>
            <p className="lead">Directly sourced from certified organic farms across India</p>
          </div>
        </Container>
      </section>

      <Container className="py-5">
        <Row>
          {/* Filters Sidebar */}
          <Col lg={3} className="mb-4">
            <div className="bg-white rounded-4 p-4 shadow-sm sticky-top" style={{ top: '100px' }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0"><FaFilter className="me-2" /> Filters</h5>
                <Button variant="link" className="text-success p-0" onClick={() => {
                  setSelectedSeason('all');
                  setSelectedCategory('all');
                  setPriceRange([0, 10]);
                  setSearchTerm('');
                }}>
                  Reset All
                </Button>
              </div>

              <div className="mb-4">
                <label className="fw-semibold mb-2">Seasonal Availability</label>
                <div className="d-flex flex-wrap gap-2">
                  {seasons.map(season => (
                    <Button
                      key={season}
                      variant={selectedSeason === season ? 'success' : 'outline-success'}
                      size="sm"
                      onClick={() => setSelectedSeason(season)}
                      className="rounded-pill"
                    >
                      {season === 'all' ? 'All Seasons' : season}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="fw-semibold mb-2">Categories</label>
                {categories.map(category => (
                  <Form.Check
                    key={category}
                    type="radio"
                    label={category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className="mb-2"
                  />
                ))}
              </div>

              <div className="mb-4">
                <label className="fw-semibold mb-2">Price Range</label>
                <div className="d-flex gap-2 mb-2">
                  <Form.Control
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  />
                  <Form.Control
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  />
                </div>
                <Form.Range
                  min={0}
                  max={10}
                  step={0.1}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                />
              </div>
            </div>
          </Col>

          {/* Products Grid */}
          <Col lg={9}>
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
              <InputGroup style={{ maxWidth: '300px' }}>
                <InputGroup.Text className="bg-white">
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>

              <div className="d-flex gap-2">
                <Form.Select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ width: '180px' }}
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </Form.Select>

                <Button 
                  variant="outline-success" 
                  className="d-lg-none"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FaFilter />
                </Button>
              </div>
            </div>

            <div className="mb-3">
              <Badge bg="success" className="me-2">Showing {filteredProducts.length} products</Badge>
              {selectedSeason !== 'all' && <Badge bg="warning" className="me-2">{selectedSeason} Seasonal</Badge>}
              {selectedCategory !== 'all' && <Badge bg="info">{selectedCategory}</Badge>}
            </div>

            <Row className="g-4">
              {filteredProducts.map(product => (
                <Col key={product.id} md={6} xl={4}>
                  <ProductCard product={product} addToCart={addToCart} />
                </Col>
              ))}
            </Row>

            {filteredProducts.length === 0 && (
              <div className="text-center py-5">
                <FaLeaf size={64} className="text-muted mb-3" />
                <h4>No products found</h4>
                <p className="text-muted">Try adjusting your filters or search terms</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Shop;
