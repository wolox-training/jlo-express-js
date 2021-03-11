exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    database: {
      name: process.env.DB_NAME_TEST
    },
    session: {
      secret: 'some-super-secret'
    },
    witter_api: {
      url: process.env.WITTER_API_URL
    }
  }
};
