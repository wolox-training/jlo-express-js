const axios = require('axios');
const config = require('../../config');
const logger = require('../logger');

const { url } = config && config.common && config.common.witter_api;
const getGeekJoke = () => {
  logger.info(`getGeekJoke() request:\n geek_joke_url: ${url}`);
  return axios.get(url);
};

module.exports = {
  getGeekJoke
};
