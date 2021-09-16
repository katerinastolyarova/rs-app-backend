import { Client } from 'pg';
import { errorResponse, successResponse } from '../utils/responseBuilder';
import winstonLogger from '../utils/logger';
import { deleteProduct } from '../services/productService';

const {
  PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD,
} = process.env;

const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

exports.deleteProduct = async (event) => {
  const client = new Client(dbOptions);
  await client.connect();

  try {
    winstonLogger.info(
      `Incoming request: ${JSON.stringify(event)}`,
    );

    const { productId = '' } = event.pathParameters;

    const product = await deleteProduct(client, productId);

    winstonLogger.info(`Result: ${JSON.stringify(product)}`);

    if (product) return successResponse(product);

    return successResponse({ message: 'Product not found!' }, 404);
  } catch (err) {
    return errorResponse(err);
  }
};
