const fs = require('fs');
const { resolve } = require('path');

const absPath = filename => resolve(__dirname, '../../../src/views/' + `${filename}.vue`);

const extRegex =  /\.\w+$/;

module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Name:',
    validate (value) {
      if (!value.length) return '[!] Views must have a name';
      // strip prefix if extant
      const fileName = value.replace(extRegex, '');
      // ensure file doesn't already exist
      try {
        fs.access(absPath(fileName), fs.F_OK, (err) => {
          if (!err) throw Error('[!] File already exists');
        });
      } catch ({ message }) {
        return message;
      }
      return true;
    },
  },
  {
    type: 'confirm',
    name: 'useStyles',
    message: 'Add <style> block?',
  }
];
