'use strict';

const {Cli} = require(`./cli`);
const {DEFAULT_COMMAND} = require(`../../constants`);

const [, , optionName, optionValue] = process.argv;
if (!optionName || !Cli[optionName]) {
  Cli[DEFAULT_COMMAND].run();
} else {
  Cli[optionName].run(optionValue);
}
