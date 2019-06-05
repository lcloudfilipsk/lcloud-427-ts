const inquirer = require('inquirer');
function chooseOption(options, { s3, params }) {
  inquirer.prompt([
  	{
      name: 'options',
      type: 'list',
      message: 'Choose option:',
      choices: options.map(({ name }, index) => {
        return { name, value: index };
      })
    },
  ])
  .then(answers => {
    processOption(answers.options, options, { s3, params });
  });
}

function processOption(option, options, { s3, params }) {
  options[option].callback({ s3, params })
  .then(res => {
    console.log(res.Contents);
    chooseOption(options, { s3, params });
  })
  .catch(err => console.error(err));
}

module.exports = chooseOption;
