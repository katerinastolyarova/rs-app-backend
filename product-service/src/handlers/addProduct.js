import { Client } from 'pg';
import { errorResponse, successResponse } from '../utils/responseBuilder';
import winstonLogger from '../utils/logger';
import { addProduct } from '../services/productService';
import productSchema from '../schemas/productSchema';

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

exports.addProduct = async (event) => {
  const client = new Client(dbOptions);
  await client.connect();

  try {
    winstonLogger.info(
      `Incoming request: ${JSON.stringify(event)}`,
    );

    const productData = JSON.parse(event.body);

    const validation = productSchema.validate(productData);

    if (validation.error) return successResponse({ message: `Product data is invalid, ${validation.error}` }, 400);

    const addedProduct = await addProduct(client, productData);

    winstonLogger.info(`The product was added successful: ${JSON.stringify(addedProduct)}`);

    return successResponse(addedProduct);
  } catch (err) {
    return errorResponse(err);
  }
};
