import S3 from 'aws-sdk/clients/s3';
import { errorResponse, successResponse } from '../utils/responseBuilder';
import winstonLogger from '../utils/logger';
import { getSignedUrl } from '../services/s3Service';

const s3 = new S3({ region: 'eu-west-1', signatureVersion: 'v4' });
const BUCKET = 'rs-school-import-service-bucket';

exports.importProductsFile = async (event) => {
  try {
    winstonLogger.info(
      `Incoming request: ${JSON.stringify(event)}`,
    );

    const { name = '' } = event.queryStringParameters;

    const params = {
      Bucket: BUCKET,
      Key: `uploaded/${name}`,
      Expires: 60,
      ContentType: 'text/csv',

    };

    const signedUrl = await getSignedUrl(s3, params);

    winstonLogger.info(`Result: ${JSON.stringify(signedUrl)}`);

    if (signedUrl) return successResponse(signedUrl);

    return errorResponse({ message: 'URL not found' }, 404);
  } catch (err) {
    return errorResponse(err);
  }
};
