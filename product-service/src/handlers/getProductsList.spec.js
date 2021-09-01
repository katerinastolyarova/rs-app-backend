// eslint-disable-next-line import/named
import { getProductsList } from './getProductsList';

describe('getProductById', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Happy path scenario', async () => {
    const result = await getProductsList();

    expect.assertions(2);
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toBeDefined();
  });
});
