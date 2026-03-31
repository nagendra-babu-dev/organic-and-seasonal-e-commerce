export const mockOrders = [
  { 
    id: 'ORD-001', 
    date: '2024-01-15', 
    total: 18.6, 
    status: 'Delivered', 
    items: 3,
    products: [
      { id: 1, name: 'Organic Tomatoes', quantity: 2, price: 2.4 },
      { id: 2, name: 'Organic Spinach', quantity: 1, price: 1.6 },
      { id: 4, name: 'Organic Carrots', quantity: 1, price: 1.3 }
    ]
  },
  { 
    id: 'ORD-002', 
    date: '2024-01-22', 
    total: 27.4, 
    status: 'Shipped', 
    items: 5,
    products: [
      { id: 5, name: 'Organic Apples', quantity: 2, price: 2.9 },
      { id: 7, name: 'Organic Brown Rice', quantity: 2, price: 2.2 },
      { id: 8, name: 'Organic Broccoli', quantity: 1, price: 2.1 }
    ]
  },
  { 
    id: 'ORD-003', 
    date: '2024-01-28', 
    total: 12.8, 
    status: 'Processing', 
    items: 2,
    products: [
      { id: 3, name: 'Organic Mangoes', quantity: 1, price: 4.8 }
    ]
  }
];
