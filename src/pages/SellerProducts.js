import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Button, Badge, Form, Row, Col } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { productService } from '../services/productService';
import { formatPrice } from '../utils/formatters';

const INITIAL_PRODUCT_FORM = {
  name: '',
  description: '',
  price: '',
  unit: 'kg',
  category: 'vegetables',
  season: 'all',
  stock: '',
  seasonal: true,
  organic_certified: true,
  image: null
};

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [busyKey, setBusyKey] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [form, setForm] = useState(INITIAL_PRODUCT_FORM);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productService.getMyProducts();
        setProducts(data);
      } catch (error) {
        toast.error(error.message || 'Failed to load products');
      }
    };

    loadProducts();
  }, []);

  const resetForm = () => {
    setForm(INITIAL_PRODUCT_FORM);
    setEditingProductId(null);
    setShowForm(false);
  };

  const startCreate = () => {
    setEditingProductId(null);
    setForm(INITIAL_PRODUCT_FORM);
    setShowForm(true);
  };

  const startEdit = (product) => {
    setEditingProductId(product.id);
    setForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price ?? '',
      unit: product.unit || 'kg',
      category: product.category || 'vegetables',
      season: product.season || 'all',
      stock: product.stock ?? '',
      seasonal: Boolean(product.seasonal),
      organic_certified: Boolean(product.organic_certified ?? product.organicCertified ?? product.organic),
      image: null
    });
    setShowForm(true);
  };

  const onFormChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    if (type === 'file') {
      setForm((current) => ({ ...current, image: files && files[0] ? files[0] : null }));
      return;
    }

    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!form.name || !form.price || !form.unit || !form.category) {
      toast.error('Please fill all required product fields');
      return;
    }

    const payload = new FormData();
    payload.append('name', form.name);
    payload.append('description', form.description);
    payload.append('price', form.price);
    payload.append('unit', form.unit);
    payload.append('category', form.category);
    payload.append('season', form.season);
    payload.append('stock', form.stock || 0);
    payload.append('seasonal', form.seasonal ? '1' : '0');
    payload.append('organic_certified', form.organic_certified ? '1' : '0');
    if (form.image) {
      payload.append('image', form.image);
    }

    try {
      setBusyKey('save-product');
      if (editingProductId) {
        const response = await productService.updateProduct(editingProductId, payload);
        setProducts((current) => current.map((item) => (item.id === editingProductId ? response.product : item)));
        toast.success('Product updated successfully');
      } else {
        const response = await productService.createProduct(payload);
        setProducts((current) => [response.product, ...current]);
        toast.success('Product created successfully');
      }
      resetForm();
    } catch (error) {
      toast.error(error.message || 'Failed to save product');
    } finally {
      setBusyKey('');
    }
  };

  const toggleStatus = async (product) => {
    try {
      setBusyKey(`toggle-${product.id}`);
      const response = await productService.updateProduct(product.id, {
        is_active: product.is_active ? 0 : 1
      });
      setProducts((current) => current.map((item) => (item.id === product.id ? response.product : item)));
      toast.success(`Product marked as ${product.is_active ? 'inactive' : 'active'}`);
    } catch (error) {
      toast.error(error.message || 'Failed to update product status');
    } finally {
      setBusyKey('');
    }
  };

  const deleteProduct = async (productId) => {
    try {
      setBusyKey(`delete-${productId}`);
      await productService.deleteProduct(productId);
      setProducts((current) => current.filter((item) => item.id !== productId));
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to delete product');
    } finally {
      setBusyKey('');
    }
  };

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0">Seller Products</h4>
            <Button className="btn-organic d-flex align-items-center gap-2" onClick={startCreate}>
              <FaPlus /> Add Product
            </Button>
          </div>

          {showForm && (
            <Card className="border-0 bg-light mb-4">
              <Card.Body>
                <h5 className="fw-bold mb-3">{editingProductId ? 'Edit Product' : 'Add New Product'}</h5>
                <Form onSubmit={handleSave}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Product Name *</Form.Label>
                        <Form.Control name="name" value={form.name} onChange={onFormChange} required />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Price *</Form.Label>
                        <Form.Control name="price" type="number" step="0.01" value={form.price} onChange={onFormChange} required />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control name="stock" type="number" value={form.stock} onChange={onFormChange} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Unit *</Form.Label>
                        <Form.Select name="unit" value={form.unit} onChange={onFormChange} required>
                          <option value="kg">kg</option>
                          <option value="g">g</option>
                          <option value="piece">piece</option>
                          <option value="dozen">dozen</option>
                          <option value="litre">litre</option>
                          <option value="bundle">bundle</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Category *</Form.Label>
                        <Form.Select name="category" value={form.category} onChange={onFormChange} required>
                          <option value="vegetables">Vegetables</option>
                          <option value="fruits">Fruits</option>
                          <option value="grains">Grains</option>
                          <option value="dairy">Dairy</option>
                          <option value="herbs">Herbs</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Season</Form.Label>
                        <Form.Select name="season" value={form.season} onChange={onFormChange}>
                          <option value="all">All</option>
                          <option value="summer">Summer</option>
                          <option value="monsoon">Monsoon</option>
                          <option value="winter">Winter</option>
                          <option value="spring">Spring</option>
                          <option value="autumn">Autumn</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control name="image" type="file" accept="image/*" onChange={onFormChange} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={onFormChange} />
                  </Form.Group>

                  <div className="d-flex gap-4 mb-3">
                    <Form.Check type="checkbox" label="Seasonal Product" name="seasonal" checked={form.seasonal} onChange={onFormChange} />
                    <Form.Check type="checkbox" label="Organic Certified" name="organic_certified" checked={form.organic_certified} onChange={onFormChange} />
                  </div>

                  <div className="d-flex gap-2">
                    <Button type="submit" className="btn-organic" disabled={busyKey === 'save-product'}>
                      {busyKey === 'save-product' ? 'Saving...' : editingProductId ? 'Update Product' : 'Create Product'}
                    </Button>
                    <Button type="button" variant="outline-secondary" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          )}

          <div className="table-responsive">
            <Table className="align-middle">
              <thead>
                <tr className="border-bottom">
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="fw-bold">{product.name}</td>
                    <td>{formatPrice(product.price)}</td>
                    <td>{product.stock} units</td>
                    <td>
                      <Badge bg={product.is_active ? 'success' : 'secondary'}>
                        {product.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="d-flex gap-2 flex-wrap">
                      <Button variant="outline-primary" size="sm" onClick={() => startEdit(product)}>
                        <FaEdit />
                      </Button>
                      <Button
                        variant={product.is_active ? 'outline-secondary' : 'outline-success'}
                        size="sm"
                        onClick={() => toggleStatus(product)}
                        disabled={busyKey === `toggle-${product.id}`}
                      >
                        {product.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => deleteProduct(product.id)}
                        disabled={busyKey === `delete-${product.id}`}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SellerProducts;
