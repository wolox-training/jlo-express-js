exports.config = {
  environment: 'development',
  common: {
    database: {
      name: process.env.DB_NAME_DEV
    },
    witter_api: {
      url: process.env.WITTER_API_URL
    }
  },
  isDevelopment: true
};
