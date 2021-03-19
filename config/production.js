exports.config = {
  environment: 'production',
  common: {
    database: {
      name: process.env.DB_NAME_DEV
    },
    witter_api: {
      url: process.env.WITTER_API_URL
    },
    session: {
      header_name: 'authorization',
      secret: process.env.NODE_API_SESSION_SECRET
    }
  },
  isProduction: true
};
