'use strict';

const {
  CATEGORIES,
  DEFAULT_COUNT,
  FILE_NAME,
  FULL_MONTH_COUNT,
  MAX_PUBLICATION_COUNT,
  TEXTS,
  TITLES,
  ExitCode,
} = require(`../constants`);

const {
  getRandomInt,
  shuffle
} = require(`../utils`);

const fs = require(`fs`);


const getDate = () => {
  const currentMonthNum = new Date().getMonth();
  const startDate = new Date().setMonth(currentMonthNum - FULL_MONTH_COUNT, 1);
  const startTime = new Date(startDate).setHours(0, 0, 0, 0);
  const finishTime = Date.now();
  const publicationTime = getRandomInt(startTime, finishTime);
  return new Date(publicationTime).toLocaleString();
};

const getRandomTexts = (texts, limit) => {
  const textCount = getRandomInt(1, limit || texts.length);
  return shuffle(texts).slice(0, textCount);
};

const generatePublications = (count) => {
  return Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: getDate(),
    announce: getRandomTexts(TEXTS, 5).join(` `),
    fullText: getRandomTexts(TEXTS).join(` `),
    category: getRandomTexts(CATEGORIES),
  }));
};

module.exports = {
  name: `--generate`,
  run(count) {
    const publicationCount = Number(count) || DEFAULT_COUNT;

    if (publicationCount > MAX_PUBLICATION_COUNT) {
      console.error(`Не больше 1000 публикаций`);
      process.exit(ExitCode.FAIL);
    }

    const publications = generatePublications(publicationCount);
    fs.writeFile(FILE_NAME, JSON.stringify(publications), (error) => {
      if (error) {
        console.error(`Can't write data to file. Error:`, error);
        process.exit(ExitCode.FAIL);
      }
      console.info(`Operation succeded. File has been created and contains ${publications.length} items.`);
    });
  },
};
