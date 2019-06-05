const { s3, params } = require('./s3/connector.js')();
const listAll = require('./s3/api/listAll');

const options = [
  {
    name: 'List all files in an S3 Bucket',
    callback: listAll
  },
  // {
  //   name: 'Upload a local file to a defined location in the bucket',
  //   input: true,
  //   callback: uploadFile({ s3, params })
  //   .then(res => console.log(res))
  //   .catch(err => console.error(err))
  // }
  {
    name: 'Exit',
    callback: process.exit
  }
];

const client = require('./client/index.js')(options, { s3, params });
