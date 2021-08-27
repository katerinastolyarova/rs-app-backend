// eslint-disable-next-line import/named
import { catalogBatchProcess } from './catalogBatchProcess';
import { errorResponse, successResponse } from '../utils/responseBuilder';
import { addProduct } from '../services/productService';
import sendEmailNotification from '../services/notificationService';
import dbConnection from '../services/dbService';

jest.mock('../services/dbService');
jest.mock('../services/notificationService');

const mockProducts = [{
  title: 'R Projects For Dummies', description: 'R Projects For Dummies', price: '24', count: '4',
}];

jest.mock('../services/productService', () => ({
  addProduct: jest.fn(() => Promise.resolve(mockProducts)),
}));

jest.mock('../utils/responseBuilder', () => ({
  successResponse: jest.fn((obj) => obj),
  errorResponse: jest.fn((err) => err),
}));

describe('catalogBatchProcess', () => {
  const mockEvent = {
    Records: [
      {
        messageId: '168869f8-d44d-4b27-b3d7-c610bd77f5df',
        receiptHandle: 'AQEB57y6nmh7JyOcg5s1It3gAIDR5KrTm01cemW8P9vfNdpKxMPkLrbRbu/3boY8OhRAiZwXiYJjezDh9cS7DBh4+t50SKEERVAllemwUlv8Vf2livDiBJQMJtipfDyQWZ1oKrj/DUnzMr88B8/gx6dcM2gOVprwqPdDzfJDoe+uUtBKo8UA89++NC5NFJpbLr3tWL114Qm6SIwitkAj6gdFJH3Ir6AHfZPDZt0MH6PiDvBWD8B+vESP0LMEjjMLKXg7oQpfT9/tHbw4UxZJc1Ej7eoDHf45bXL81sMMBFJ9DScTmHQs1etIOU8/ZcRTtEyz2GQGOVtrZ4rC8EqCcHu3gf3WarOoMUfHmRBrz+oYkUFSf7DiMnFtmQd02+L2NRdv2LX8i/moojilfdJ0IdNmeA==',
        body: '{"title":"R Projects For Dummies","description":"R Projects For Dummies","price":"24","count":"4"}',
        attributes: {
          ApproximateReceiveCount: '1',
          SentTimestamp: '1629984872023',
          SenderId: 'AROARFSWCTV7OHTFOZ5MK:import-service-dev-importFileParser',
          ApproximateFirstReceiveTimestamp: '1629984872028',
        },
        messageAttributes: {},
        md5OfBody: 'da12fa77ab1b39bca19e994a42d90d7a',
        eventSource: 'aws:sqs',
        eventSourceARN: 'arn:aws:sqs:eu-west-1:080711163262:catalogItemsQueue',
        awsRegion: 'eu-west-1',
      },
    ],
  };

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('should return 500 if something went wrong with DB', async () => {
    const dbError = new Error('Something went wrong with DB');

    addProduct.mockImplementationOnce(() => Promise.reject(dbError));

    await catalogBatchProcess(mockEvent);

    expect(errorResponse).nthCalledWith(1, dbError);
  });

  it('should return 500', async () => {
    const snsError = new Error('Something went wrong with SNS');

    sendEmailNotification.mockImplementationOnce(() => Promise.reject(snsError));

    await catalogBatchProcess(mockEvent);

    expect(errorResponse).nthCalledWith(1, snsError);
  });
});
