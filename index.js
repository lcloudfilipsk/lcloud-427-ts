const chalk = require('chalk');
const figlet = require('figlet');
const { s3, params } = require('./s3/connector.js')();
const listAll = require('./s3/api/listAll');
const uploadFile = require('./s3/api/uploadFile');

console.log(`
  ${chalk.green(
    figlet.textSync('LCloud')
  )}
  Recruitment tasks
`);

const options = [
  {
    name: 'List all files in an S3 Bucket',
    callback: listAll
  },
  {
    name: 'Upload a local file to a defined location in the bucket',
    input: 'file location',
    callback: uploadFile
  },
  {
    name: 'List an AWS buckets files that match a "filter" regex',
    input: 'regex',
    callback: () => {}
  },
  {
    name: 'Exit',
    callback: process.exit
  }
];

const client = require('./client/index.js')(options, { s3, params });
