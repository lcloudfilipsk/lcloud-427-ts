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
  const { callback, input } = options[option];
  if (input) {
    return askForUserInput(callback, { s3, params, input, options });
  }
  callback({ s3, params })
  .then(res => {
    console.group();
    console.log('result:')
    console.group();
    console.log(res);
    console.groupEnd();
    console.groupEnd();
    chooseOption(options, { s3, params });
  })
  .catch(err => {
    console.error(err);
    chooseOption(options, { s3, params });
  });
}

function askForUserInput(callback, { s3, params, input, options }) {
  inquirer.prompt([
    {
      name: 'input',
      type: 'input',
      message: `Enter ${input}:`,
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return `Please enter ${input}.`;
        }
      }
    },
  ]).then(({ input }) => {
    callback({ s3, params, input })
    .then(res => {
      console.group();
      console.log('result:')
      console.group();
      console.log(res);
      console.groupEnd();
      console.groupEnd();
      chooseOption(options, { s3, params });
    })
    .catch(err => {
      console.error(err);
      chooseOption(options, { s3, params });
    });
  });
}

module.exports = chooseOption;
