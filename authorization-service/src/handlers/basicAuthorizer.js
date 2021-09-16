import winstonLogger from '../../../product-service/src/utils/logger';
import generatePolicy from '../services/policyGenerator';

exports.basicAuthorizer = async (event, _context, callback) => {
  try {
    winstonLogger.info(
      `Incoming request: ${JSON.stringify(event)}`,
    );
    const authorizationHeader = event.authorizationToken;
    const creds = authorizationHeader.split(' ')[1];
    const plainCreds = Buffer.from(creds, 'base64')
      .toString()
      .split(':');
    const username = plainCreds[0];
    const password = plainCreds[1];

    console.log(`Username: ${username}, Password: ${password}`);

    const localCreds = process.env.username;
    console.log(`Local creds: ${localCreds}`);
    const effect = !localCreds || localCreds !== password ? 'Deny' : 'Allow';

    const policy = generatePolicy(creds, effect, event.methodArn);
    console.log(policy);

    callback(null, policy);
  } catch (error) {
    callback('Unauthorized', error);
  }
};
