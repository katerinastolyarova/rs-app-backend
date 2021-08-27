// eslint-disable-next-line import/named
import { importProductsFile } from './importProductsFile';
import { errorResponse, successResponse } from '../utils/responseBuilder';
import { getSignedUrl } from '../services/s3Service';

const mockSignedUrl = 'test';

const name = 'test.csv';

jest.mock('../services/s3Service', () => ({
  getSignedUrl: jest.fn(() => Promise.resolve(mockSignedUrl)),
}));

jest.mock('../utils/responseBuilder', () => ({
  successResponse: jest.fn((obj) => obj),
  errorResponse: jest.fn((err) => err),
}));

describe('importProductsFile', () => {
  const mockEvent = {
    queryStringParameters: {
      name,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Happy path scenario', async () => {
    await importProductsFile(mockEvent);

    expect(getSignedUrl).toHaveBeenCalledTimes(1);
    expect(successResponse).nthCalledWith(1, mockSignedUrl);
  });

  it('should call errorResponse once', async () => {
    const mockError = new Error('Something went wrong');
    getSignedUrl.mockImplementationOnce(() => Promise.reject(mockError));
    await importProductsFile(mockEvent);
    expect(errorResponse).nthCalledWith(1, mockError);
  });
});
