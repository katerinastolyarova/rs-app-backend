import { Client } from 'pg';
import SNS from 'aws-sdk/clients/sns';
import dbConnection from '../services/dbService';
import { errorResponse, successResponse } from '../utils/responseBuilder';
import winstonLogger from '../utils/logger';
import { addProduct } from '../services/productService';
import sendEmailNotification from '../services/notificationService';

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

const sns = new SNS({ region: 'eu-west-1' });

exports.catalogBatchProcess = async (event) => {
  const client = await dbConnection(Client, dbOptions);

  try {
    winstonLogger.info(
      `Incoming request: ${JSON.stringify(event)}`,
    );

    const products = event.Records.map((record) => JSON.parse(record.body));

    const addedProducts = await Promise.all(products.map((product) => addProduct(client, product)));

    winstonLogger.info(`The products were added successful: ${JSON.stringify(addedProducts)}`);

    await Promise.all(products.map((product) => sendEmailNotification(sns, product, { price: { DataType: 'Number', StringValue: String(product.price) } })));

    return successResponse(addedProducts);
  } catch (err) {
    return errorResponse(err);
  }
};
