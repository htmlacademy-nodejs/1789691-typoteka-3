'use strict';

const {
  DEFAULT_COUNT,
  FILE_NAME,
  FULL_MONTH_COUNT,
  MAX_PUBLICATION_COUNT,
  ExitCode,
} = require(`../../../constants`);

const {
  getRandomInt,
  shuffle
} = require(`../utils`);

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const CATEGORIES_FILE_NAME = `./data/categories.txt`;
const SENTENCES_FILE_NAME = `./data/sentences.txt`;
const TITLES_FILE_NAME = `./data/titles.txt`;

const readFile = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`).filter((row) => row.length);
  } catch (error) {
    console.error(chalk.red(`Cannot read the file ${filePath}`), error);
    return [];
  }
};

const getDate = () => {
  const currentMonthNum = new Date().getMonth();
  const startDate = new Date().setMonth(currentMonthNum - FULL_MONTH_COUNT, 1);
  const startTime = new Date(startDate).setHours(0, 0, 0, 0);
  const finishTime = Date.now();
  const publicationTime = getRandomInt(startTime, finishTime);
  return new Date(publicationTime).toLocaleString();
};

const getRandomArrayItems = (texts, limit) => {
  const textCount = getRandomInt(1, limit || texts.length);
  return shuffle(texts).slice(0, textCount);
};

const generatePublications = (categories, sentences, titles, count) => {
  return Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: getDate(),
    announce: getRandomArrayItems(sentences, 5).join(` `),
    fullText: getRandomArrayItems(sentences).join(` `),
    category: getRandomArrayItems(categories),
  }));
};


module.exports = {
  name: `--generate`,
  async run(count) {
    const publicationCount = Number(count) || DEFAULT_COUNT;

    if (publicationCount > MAX_PUBLICATION_COUNT) {
      console.error(chalk.red(`Не больше 1000 публикаций`));
      process.exit(ExitCode.FAIL);
    }

    const categories = await readFile(CATEGORIES_FILE_NAME);
    const sentences = await readFile(SENTENCES_FILE_NAME);
    const titles = await readFile(TITLES_FILE_NAME);

    const publications = generatePublications(categories, sentences, titles, publicationCount);
    try {
      await fs.writeFile(FILE_NAME, JSON.stringify(publications));
      console.info(chalk.green(`Operation succeded. File has been created and contains ${publications.length} items.`));
    } catch (error) {
      console.error(chalk.red(`Can't write data to file. Error:`), error);
      process.exit(ExitCode.FAIL);
    }
  },
};
