const config = require('../config');
const schemas = require('./schemas');
const { user, weet, sessions, admin, ratings } = require('./paths');

const port = config.common.api.port || 8080;

module.exports = {
  openapi: '3.0.1',
  info: {
    version: '0.1.0',
    title: 'WTraining',
    description: 'WTraining',
    termsOfService: '',
    contact: {
      name: 'Wolox',
      email: 'tls@wolox.com.ar',
      url: 'https://www.wolox.com.ar/'
    },
    license: {
      name: 'MIT'
    }
  },
  servers: [
    {
      url: `http://localhost:${port}/`,
      description: 'Local server'
    },
    {
      url: `https://${process.env.API_URL}/`,
      description: 'Testing server'
    }
  ],
  security: [],
  tags: [
    {
      name: 'User operations'
    },
    {
      name: 'Weet operations'
    },
    {
      name: 'Session operations'
    },
    {
      name: 'Admin operations'
    },
    {
      name: 'Ratings operations'
    }
  ],
  paths: {
    ...user,
    ...weet,
    ...sessions,
    ...admin,
    ...ratings
  },
  components: {
    schemas,
    securitySchemes: {}
  }
};
