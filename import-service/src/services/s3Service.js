import csvParser from 'csv-parser';

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
    const s3Stream = s3.getObject(params).createReadStream();

    s3Stream
      .pipe(csvParser())
      .on('data', (data) => {
        console.log(data);
      })
      .on('end', () => {
        console.log('Stream has ended');
      })
      .on('error', (error) => {
        console.log(`error from csvParser: ${error}`);
      });

    return true;
  } catch (error) {
    throw new Error(`${error}: Unable to read file`);
  }
};
