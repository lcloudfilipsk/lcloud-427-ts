const fs = require('fs');
const path = require('path');

module.exports = function uploadFile({ s3, params, input }) {
  const cwd = process.cwd();
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(path.join(cwd, input), (err, data) => {
        if (err) {
          throw err;
        }
        const { Bucket } = params;
        s3.upload({ Key: input, Bucket, Body: data }, (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve('Upload success');
        });
      });
    } catch (err) {
      console.error(err);
    }
  })
};
