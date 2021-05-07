'use strict';

const DEFAULT_COMMAND = `--help`;
const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const MAX_PUBLICATION_COUNT = 1000;
const FULL_MONTH_COUNT = 2;

const ExitCode = {
  SUCCESS: 0,
  FAIL: 1,
};

module.exports = {
  DEFAULT_COMMAND,
  DEFAULT_COUNT,
  FILE_NAME,
  FULL_MONTH_COUNT,
  MAX_PUBLICATION_COUNT,
  ExitCode,
};
