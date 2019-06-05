const { s3, params } = require('./s3/connector.js')();
const listAll = require('./s3/api/listAll');

try {
  listAll({ s3, params })
  .then(res => console.log(res))
  .catch(err => console.error(err));
} catch(err) {
  console.error(err);
}
