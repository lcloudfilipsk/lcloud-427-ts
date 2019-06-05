module.exports = function listAllS3BucketFiles({ s3, params }) {
  return new Promise((resolve, reject) => {
    s3.listObjects(params, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  })
};
