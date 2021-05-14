'use strict';

const DEFAULT_COMMAND = `--help`;
const DEFAULT_COUNT = 1;
const DEFAULT_PORT = 8080;
const FILE_NAME = `mocks.json`;
const MAX_PUBLICATION_COUNT = 1000;
const FULL_MONTH_COUNT = 2;

const ExitCode = {
  SUCCESS: 0,
  FAIL: 1,
};

const HttpCodes = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
};

module.exports = {
  DEFAULT_COMMAND,
  DEFAULT_COUNT,
  DEFAULT_PORT,
  FILE_NAME,
  FULL_MONTH_COUNT,
  MAX_PUBLICATION_COUNT,
  ExitCode,
  HttpCodes,
};
