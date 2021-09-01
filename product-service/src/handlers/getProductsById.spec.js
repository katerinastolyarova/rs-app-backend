// eslint-disable-next-line import/named
import { getProductsById } from './getProductsById';

describe('getProductById', () => {
  const mockEvent = {
    pathParameters: {
      productId: '857aaf9e-dd73-4292-86c3-e155db022761',
    },
  };

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Happy path scenario', async () => {
    const result = await getProductsById(mockEvent);

    expect.assertions(2);
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).id).toBe(mockEvent.pathParameters.productId);
  });

  it('should return 404', async () => {
    const event = {
      pathParameters: {
        productId: '123',
      },
    };

    const result = await getProductsById(event);

    expect.assertions(2);
    expect(result.statusCode).toBe(404);
    expect(JSON.parse(result.body).message).toBeDefined();
  });

  it('should return 500', async () => {
    const event = {};

    const result = await getProductsById(event);

    expect.assertions(2);
    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body).message).toBeDefined();
  });
});
