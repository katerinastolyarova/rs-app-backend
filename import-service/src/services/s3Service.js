import csvParser from 'csv-parser';
import productSchema from '../schemas/productSchema';

export const getSignedUrl = async (s3, params) => {
  try {
    const signedUrl = await s3.getSignedUrl('putObject', params);

    return signedUrl;
  } catch (error) {
    throw new Error(`${error}: Unable to upload file`);
  }
};

export const moveParsedFile = async (s3, params, record) => {
  const uploaded = 'uploaded';
  const parsed = 'parsed';
  const copyParams = {
    Bucket: params.Bucket,
    CopySource: `${params.Bucket}/${params.Key}`,
    Key: params.Key.replace(uploaded, parsed),
  };

  const deleteParams = {
    Bucket: params.Bucket,
    Key: record.s3.object.key,
  };

  try {
    await s3.copyObject(copyParams).promise();

    await s3.deleteObject(deleteParams).promise();

    return true;
  } catch (error) {
    throw new Error(`${error}: Unable to move file`);
  }
};

export const getProducts = async (s3, params) => {
  try {
    const products = [];
    const s3Stream = s3.getObject(params).createReadStream();

    return new Promise((resolve, reject) => {
      s3Stream
        .pipe(csvParser({ separator: ';' }))
        .on('data', (data) => {
          const validation = productSchema.validate(data);

          if (!validation.error) {
            products.push(data);
          } else {
            console.log(`Invalid product data ${validation.error}`);
          }
        })
        .on('end', () => {
          console.log('Stream has ended');
          console.table(products);
          resolve(products);
        })
        .on('error', (error) => {
          console.log(`error from csvParser: ${error}`);
          reject(error);
        });
    });
  } catch (error) {
    throw new Error(`${error}: Unable to read file`);
  }
};
