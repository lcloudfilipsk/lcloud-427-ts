module.exports = function listAll({ s3, params, input }) {
  return new Promise((resolve, reject) => {
    const { Bucket } = params;
    s3.listObjects({ Bucket }, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const res = data.Contents.filter(obj => obj.Key.includes(input));
      res.length > 0 ?
        resolve(res) : resolve(`Couldn't find file that matches the regex`);
    });
  })
};
