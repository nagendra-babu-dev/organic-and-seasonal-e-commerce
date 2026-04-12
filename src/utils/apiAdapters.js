const FALLBACK_API_URL = 'http://localhost:5000/api';

export const API_BASE_URL = process.env.REACT_APP_API_URL || FALLBACK_API_URL;
export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '');

export const toAssetUrl = (value) => {
  if (!value) {
    return '';
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  return `${API_ORIGIN}${value.startsWith('/') ? value : `/${value}`}`;
};

export const normalizeUser = (user) => {
  if (!user) {
    return null;
  }

  return {
    ...user,
    userType: user.userType || user.user_type || 'customer'
  };
};

export const normalizeProduct = (product) => {
  if (!product) {
    return null;
  }

  return {
    ...product,
    organic: Boolean(product.organic ?? product.organicCertified ?? product.organic_certified),
    organicCertified: Boolean(product.organicCertified ?? product.organic_certified ?? product.organic),
    seasonal: Boolean(product.seasonal),
    farm: product.farm || product.farmer_name || 'Local Farm',
    origin: product.origin || product.farmer_city || '',
    nutritionInfo: product.nutritionInfo || product.nutrition_info || '',
    image: toAssetUrl(product.image)
  };
};
