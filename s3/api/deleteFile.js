module.exports = function deleteFile({ s3, params, input }) {
  return new Promise((resolve, reject) => {
    const { Bucket } = params;
    s3.deleteObject({ Bucket, Key: input }, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(`Successfully deleted file ${input}`);
    });
  })
};
