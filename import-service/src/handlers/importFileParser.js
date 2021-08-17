/* eslint-disable no-await-in-loop */
import S3 from 'aws-sdk/clients/s3';
import { errorResponse, successResponse } from '../utils/responseBuilder';
import winstonLogger from '../utils/logger';
import { getProducts, moveParsedFile } from '../services/s3Service';

const s3 = new S3({ region: 'eu-west-1', signatureVersion: 'v4' });

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

    const result = await getProducts(s3, params, record);
    if (result) {
      await moveParsedFile(s3, params, record);

      return successResponse({ message: 'Success!' });
    }

    return errorResponse({ message: 'Unable parse file!' });
  } catch (err) {
    return errorResponse(err);
  }
};
