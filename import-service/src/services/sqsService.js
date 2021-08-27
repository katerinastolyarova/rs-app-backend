const sendMessage = async (sqs, product) => {
  const sentMessage = await sqs.sendMessage({
    QueueUrl: process.env.SQS_URL,
    MessageBody: JSON.stringify(product),
  })
    .promise();

  return sentMessage;
};

export default sendMessage;
