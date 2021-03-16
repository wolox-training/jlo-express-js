const { BAD_CREDENTIALS, SIGN_IN_SUCCESSFUL } = require('../../config/constants');

module.exports = {
  signIn: {
    type: 'object',
    properties: {
      email: {
        $ref: '#/components/schemas/email'
      },
      password: {
        $ref: '#/components/schemas/password'
      }
    }
  },
  signInOk: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
            example: '$2a$10$EYvF77TQ8YxOk4a.mvjH4.J7oRCjgXlAyUCjT7CE6Q5lpD4hBQeL.'
          }
        }
      },
      message: {
        type: 'string',
        example: SIGN_IN_SUCCESSFUL
      }
    }
  },
  signInBad: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: BAD_CREDENTIALS
      },
      internal_code: {
        type: 'string',
        example: 'bad_request'
      }
    }
  }
};
