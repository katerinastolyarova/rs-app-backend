import { Client } from 'pg';
import { errorResponse, successResponse } from '../utils/responseBuilder';
import winstonLogger from '../utils/logger';
import { getAllProducts } from '../services/productService';

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

exports.getProductsList = async (event) => {
  const client = new Client(dbOptions);
  await client.connect();

  try {
    winstonLogger.info(
      `Incoming request: ${JSON.stringify(event)}`,
    );
    const productsList = await getAllProducts(client);
    winstonLogger.info(`Result: ${JSON.stringify(productsList)}`);

    if (productsList) return successResponse(productsList);

    return successResponse({ message: 'Products not found!' }, 404);
  } catch (err) {
    return errorResponse(err);
  }
};
