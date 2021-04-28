'use strict';

const {Cli} = require(`./cli`);
const {DEFAULT_COMMAND} = require(`./constants`);

const [, , optionName, optionValue] = process.argv;
console.log(`option:`, optionName, optionValue);
if (!optionName || !Cli[optionName]) {
  Cli[DEFAULT_COMMAND].run();
} else {
  Cli[optionName].run(optionValue);
}
