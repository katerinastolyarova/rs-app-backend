const defaultHeaders = {
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Origin': '*',
};

const errorResponse = (err, statusCode = 500) => ({
  statusCode,
  headers: defaultHeaders,
  body: JSON.stringify({ message: err.message || 'Something went wrong!' }),
});

const successResponse = (body, statusCode = 200) => ({
  statusCode,
  headers: defaultHeaders,
  body: JSON.stringify(body),
});

export { errorResponse, successResponse };
