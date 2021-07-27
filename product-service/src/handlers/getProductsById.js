import { errorResponse, successResponse } from '../utils/responseBuilder';
import winstonLogger from '../utils/logger';
import { getProductById } from '../services/productService';

exports.getProductsById = async (event) => {
  try {
    winstonLogger.info(
      `Incoming request: ${JSON.stringify(event)}`,
    );

    const { productId = '' } = event.pathParameters;

    const product = await getProductById(productId);

    winstonLogger.info(`Result: ${JSON.stringify(product)}`);

    if (product) return successResponse(product);

    return successResponse({ message: 'Product not found!' }, 404);
  } catch (err) {
    return errorResponse(err);
  }
};
