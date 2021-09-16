const dbConnection = async (Client, dbOptions) => {
  const client = new Client(dbOptions);
  await client.connect();

  return client;
};

export default dbConnection;
