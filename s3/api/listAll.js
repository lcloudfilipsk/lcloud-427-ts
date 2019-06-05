module.exports = function listAllS3BucketFiles({ s3, params }) {
  return new Promise((resolve, reject) => {
    const { Bucket } = params;
    s3.listObjects({ Bucket }, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data.Contents);
    });
  })
};
