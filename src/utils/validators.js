export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[6-9]\d{9}$/;
  return re.test(phone);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validatePincode = (pincode) => {
  const re = /^[1-9][0-9]{5}$/;
  return re.test(pincode);
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