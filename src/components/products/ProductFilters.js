import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { SEASONS, CATEGORIES } from '../../utils/constants';

const ProductFilters = ({ filters, onFilterChange, onReset }) => {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-4 p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Filters</h5>
        <Button variant="link" className="text-success p-0" onClick={onReset}>
          Reset All
        </Button>
      </div>

      <div className="mb-4">
        <label className="fw-semibold mb-2">Seasonal Availability</label>
        <div className="d-flex flex-wrap gap-2">
          <Button
            variant={filters.season === 'all' ? 'success' : 'outline-success'}
            size="sm"
            onClick={() => handleChange('season', 'all')}
            className="rounded-pill"
          >
            All Seasons
          </Button>
          {SEASONS.map(season => (
            <Button
              key={season.id}
              variant={filters.season === season.id ? 'success' : 'outline-success'}
              size="sm"
              onClick={() => handleChange('season', season.id)}
              className="rounded-pill"
            >
              {season.icon} {season.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="fw-semibold mb-2">Categories</label>
        <div>
          <Form.Check
            type="radio"
            label="All Categories"
            name="category"
            checked={filters.category === 'all'}
            onChange={() => handleChange('category', 'all')}
            className="mb-2"
          />
          {CATEGORIES.map(category => (
            <Form.Check
              key={category.id}
              type="radio"
              label={`${category.icon} ${category.name} (${category.count})`}
              name="category"
              checked={filters.category === category.id}
              onChange={() => handleChange('category', category.id)}
              className="mb-2"
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="fw-semibold mb-2">Price Range</label>
        <div className="d-flex gap-2 mb-2">
          <Form.Control
            type="number"
            placeholder="Min"
            value={filters.priceMin}
            onChange={(e) => handleChange('priceMin', Number(e.target.value))}
          />
          <Form.Control
            type="number"
            placeholder="Max"
            value={filters.priceMax}
            onChange={(e) => handleChange('priceMax', Number(e.target.value))}
          />
        </div>
        <Form.Range
          min={0}
          max={10}
          step={0.1}
          value={filters.priceMax}
          onChange={(e) => handleChange('priceMax', Number(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <Form.Check
          type="checkbox"
          label="Certified Organic Only"
          checked={filters.organicOnly}
          onChange={(e) => handleChange('organicOnly', e.target.checked)}
        />
      </div>
    </div>
  );
};

export default ProductFilters;
