/* eslint-disable no-await-in-loop */
import S3 from 'aws-sdk/clients/s3';
import SQS from 'aws-sdk/clients/sqs';
import { errorResponse, successResponse } from '../utils/responseBuilder';
import winstonLogger from '../utils/logger';
import { getProducts, moveParsedFile } from '../services/s3Service';
import sendMessage from '../services/sqsService';

const s3 = new S3({ region: 'eu-west-1', signatureVersion: 'v4' });
const sqs = new SQS({ region: 'eu-west-1' });

exports.importFileParser = async (event) => {
  try {
    winstonLogger.info(
      `Incoming request: ${JSON.stringify(event)}`,
    );

    const record = event.Records[0];
    const params = {
      Bucket: record.s3.bucket.name,
      Key: record.s3.object.key,
    };

    winstonLogger.info(
      `Params: ${JSON.stringify(params)}`,
    );

    const products = await getProducts(s3, params);

    winstonLogger.info(
      `Parsed products: ${JSON.stringify(products)}`,
    );

    if (products) {
      await Promise.all(products.map((product) => sendMessage(sqs, product)));

      await moveParsedFile(s3, params, record);

      return successResponse({ message: 'Success!' });
    }
    return errorResponse({ message: 'Unable parse file or file is empty' });
  } catch (err) {
    return errorResponse(err);
  }
};
