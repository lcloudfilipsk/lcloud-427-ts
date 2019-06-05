const chalk = require('chalk');
const figlet = require('figlet');
const { s3, params } = require('./s3/connector')();
const listAll = require('./s3/api/listAll');
const uploadFile = require('./s3/api/uploadFile');
const listAllFilter = require('./s3/api/listAllFilter');
const deleteFile = require('./s3/api/deleteFile');

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
    callback: listAllFilter
  },
  {
    name: 'Delete all files matching a regex from a bucket',
    input: 'regex',
    callback: deleteFile
  },
  {
    name: 'Exit',
    callback: process.exit
  }
];

const client = require('./client')(options, { s3, params });
