import mockProducts from '../data/productsList';

export const getAllProducts = async () => mockProducts;

export const getProductById = async (productId) => mockProducts
  .find((product) => product.id === productId);
