const dotenv = require('dotenv');
const AWS = require('aws-sdk');
dotenv.config();

function getS3BucketConnector() {
  const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;
  if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
    throw new Error(
      'Missing AWS_SECRET_ACCESS_KEY or AWS_SECRET_ACCESS_KEY env variable'
    );
  }
  AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  });
  return new AWS.S3();
}

function getS3BucketParams() {
  const { AWS_BUCKET } = process.env;
  if (!AWS_BUCKET) throw new Error('Missing AWS_BUCKET env variable');
  return {
    Bucket: AWS_BUCKET,
    MaxKeys: 10000
  };
}

module.exports = function() {
  try {
    const s3 = getS3BucketConnector();
    const params = getS3BucketParams();
    return { s3, params };
  } catch (err) {
    console.error(err);
  }
}
