const sendEmailNotification = async (sns, product, attributes) => {
  console.log(product);
  const sentNotification = await sns.publish({
    Subject: `Received new product ${product.title}`,
    Message: JSON.stringify(product),
    MessageAttributes: attributes,
    TopicArn: process.env.SNS_TOPIC_ARN,
  })
    .promise();

  return sentNotification;
};

export default sendEmailNotification;
