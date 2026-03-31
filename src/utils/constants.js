export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const SEASONS = [
  { id: 'spring', name: 'Spring', months: ['March', 'April', 'May'], icon: '🌸' },
  { id: 'summer', name: 'Summer', months: ['June', 'July', 'August'], icon: '☀️' },
  { id: 'monsoon', name: 'Monsoon', months: ['September', 'October'], icon: '🌧️' },
  { id: 'autumn', name: 'Autumn', months: ['November', 'December'], icon: '🍂' },
  { id: 'winter', name: 'Winter', months: ['January', 'February'], icon: '❄️' }
];

export const CATEGORIES = [
  { id: 'vegetables', name: 'Vegetables', icon: '🥬', count: 45 },
  { id: 'fruits', name: 'Fruits', icon: '🍎', count: 32 },
  { id: 'herbs', name: 'Herbs', icon: '🌿', count: 18 },
  { id: 'grains', name: 'Grains', icon: '🌾', count: 12 },
  { id: 'dairy', name: 'Dairy', icon: '🥛', count: 8 }
];

export const DELIVERY_CHARGE = 4;
export const FREE_DELIVERY_THRESHOLD = 40;

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const PAYMENT_METHODS = [
  { id: 'cod', name: 'Cash on Delivery', icon: '💰' },
  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  { id: 'upi', name: 'UPI', icon: '📱' }
];
