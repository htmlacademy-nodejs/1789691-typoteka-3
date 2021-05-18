'use strict';

const chalk = require(`chalk`);

const HELP = `
Доступные команды:
--help              выводит справку
--generate <count>  генерирует тестовые данные в mocks.json файл
--version           выводит версию программы
--server <port>     запускает сервер для отображения моков
`;

module.exports = {
  name: `--help`,
  run() {
    console.info(chalk.grey(HELP));
  },
};
