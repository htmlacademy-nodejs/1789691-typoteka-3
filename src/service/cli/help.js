'use strict';

const HELP = `
Доступные команды:
--help              выводит справку
--generate <count>  генерирует тестовые данные в mocks.json файл
--version           выводит версию программы
`;

module.exports = {
  name: `--help`,
  run() {
    console.info(HELP);
  },
};
