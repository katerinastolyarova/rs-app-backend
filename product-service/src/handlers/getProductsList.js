import { errorResponse, successResponse } from '../utils/responseBuilder';
import winstonLogger from '../utils/logger';
import { getAllProducts } from '../services/productService';

exports.getProductsList = async (event) => {
  try {
    winstonLogger.info(
      `Incoming request: ${JSON.stringify(event)}`,
    );
    const productsList = await getAllProducts();
    winstonLogger.info(`Result: ${JSON.stringify(productsList)}`);

    if (productsList) return successResponse(productsList);

    return successResponse({ message: 'Products not found!' }, 404);
  } catch (err) {
    return errorResponse(err);
  }
};
