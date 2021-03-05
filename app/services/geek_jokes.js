const axios = require('axios');
const config = require('../../config');

const { url } = config && config.common && config.common.witter_api;
const getGeekJoke = () => axios.get(url);

module.exports = {
  getGeekJoke
};
