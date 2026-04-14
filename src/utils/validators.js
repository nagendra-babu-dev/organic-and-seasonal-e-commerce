export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const normalized = String(phone || '').replace(/[\s()+-]/g, '');
  const re = /^(?:0\d{10}|44\d{10})$/;
  return re.test(normalized);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validatePincode = (pincode) => {
  const re = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
  return re.test(String(pincode || '').trim());
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const validateAddress = (address) => {
  return address.trim().length >= 10;
};

export const validateProductForm = (product) => {
  const errors = {};
  if (!product.name || product.name.trim().length < 3) {
    errors.name = 'Product name must be at least 3 characters';
  }
  if (!product.price || product.price <= 0) {
    errors.price = 'Price must be greater than 0';
  }
  if (!product.stock || product.stock < 0) {
    errors.stock = 'Stock must be 0 or greater';
  }
  if (!product.description || product.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }
  return errors;
};
