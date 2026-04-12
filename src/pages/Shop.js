import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Badge, Pagination } from 'react-bootstrap';
import { FaSearch, FaFilter, FaLeaf } from 'react-icons/fa';
import ProductCard from '../components/products/ProductCard';
import { productService } from '../services/productService';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('featured');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0, limit: 12 });

  const seasons = ['all', 'Spring', 'Summer', 'Monsoon', 'Autumn', 'Winter'];

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearchTerm(searchInput.trim());
      setPage(1);
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        const sortMap = {
          featured: { sort: 'rating', order: 'DESC' },
          newest: { sort: 'created_at', order: 'DESC' },
          rating: { sort: 'rating', order: 'DESC' },
          'price-low': { sort: 'price', order: 'ASC' },
          'price-high': { sort: 'price', order: 'DESC' }
        };

        const response = await productService.getProducts({
          search: searchTerm || undefined,
          season: selectedSeason,
          category: selectedCategory,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          page,
          limit: 9,
          ...sortMap[sortBy]
        });

        setProducts(response.products || []);
        setPagination(response.pagination || { page: 1, pages: 1, total: 0, limit: 9 });
      } catch (error) {
        console.error('Failed to load products:', error);
        setProducts([]);
        setPagination({ page: 1, pages: 1, total: 0, limit: 9 });
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page, priceRange, searchTerm, selectedSeason, selectedCategory, sortBy]);

  const categories = useMemo(() => {
    const dynamicCategories = [...new Set(products.map((product) => product.category).filter(Boolean))];
    return ['all', ...dynamicCategories];
  }, [products]);

  return (
    <>
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
          <Col lg={3} className="mb-4">
            <div className="bg-white rounded-4 p-4 shadow-sm sticky-top" style={{ top: '100px' }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0"><FaFilter className="me-2" /> Filters</h5>
                <Button
                  variant="link"
                  className="text-success p-0"
                  onClick={() => {
                    setSelectedSeason('all');
                    setSelectedCategory('all');
                    setPriceRange([0, 100]);
                    setSearchInput('');
                    setSearchTerm('');
                    setPage(1);
                  }}
                >
                  Reset All
                </Button>
              </div>

              <div className="mb-4">
                <label className="fw-semibold mb-2">Seasonal Availability</label>
                <div className="d-flex flex-wrap gap-2">
                  {seasons.map((season) => (
                    <Button
                      key={season}
                      variant={selectedSeason === season ? 'success' : 'outline-success'}
                      size="sm"
                      onClick={() => {
                        setSelectedSeason(season);
                        setPage(1);
                      }}
                      className="rounded-pill"
                    >
                      {season === 'all' ? 'All Seasons' : season}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="fw-semibold mb-2">Categories</label>
                {categories.map((category) => (
                  <Form.Check
                    key={category}
                    type="radio"
                    label={category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => {
                      setSelectedCategory(category);
                      setPage(1);
                    }}
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
                    onChange={(e) => {
                      setPriceRange([Number(e.target.value), priceRange[1]]);
                      setPage(1);
                    }}
                  />
                  <Form.Control
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => {
                      setPriceRange([priceRange[0], Number(e.target.value)]);
                      setPage(1);
                    }}
                  />
                </div>
                <Form.Range
                  min={0}
                  max={100}
                  step={1}
                  value={priceRange[1]}
                  onChange={(e) => {
                    setPriceRange([priceRange[0], Number(e.target.value)]);
                    setPage(1);
                  }}
                />
              </div>
            </div>
          </Col>

          <Col lg={9}>
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
              <InputGroup style={{ maxWidth: '300px' }}>
                <InputGroup.Text className="bg-white">
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </InputGroup>

              <div className="d-flex gap-2">
                <Form.Select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(1);
                  }}
                  style={{ width: '180px' }}
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </Form.Select>
              </div>
            </div>

            <div className="mb-3">
              <Badge bg="success" className="me-2">
                Showing {products.length} of {pagination.total} products
              </Badge>
              {selectedSeason !== 'all' && <Badge bg="warning" className="me-2">{selectedSeason} Seasonal</Badge>}
              {selectedCategory !== 'all' && <Badge bg="info">{selectedCategory}</Badge>}
            </div>

            <Row className="g-4">
              {products.map((product) => (
                <Col key={product.id} md={6} xl={4}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>

            {!loading && products.length === 0 && (
              <div className="text-center py-5">
                <FaLeaf size={64} className="text-muted mb-3" />
                <h4>No products found</h4>
                <p className="text-muted">Try adjusting your filters or search terms</p>
              </div>
            )}

            {pagination.pages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <Pagination>
                  <Pagination.Prev
                    disabled={page === 1}
                    onClick={() => setPage((current) => Math.max(current - 1, 1))}
                  />
                  {Array.from({ length: pagination.pages }, (_, index) => index + 1).map((pageNumber) => (
                    <Pagination.Item
                      key={pageNumber}
                      active={pageNumber === page}
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    disabled={page === pagination.pages}
                    onClick={() => setPage((current) => Math.min(current + 1, pagination.pages))}
                  />
                </Pagination>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Shop;
