const { BAD_REQUEST } = require('../../app/errors');
const { WEET_GET_FOUND, WEET_CREATED } = require('../../config/constants');

module.exports = {
  weetContent: {
    type: 'string',
    example: 'No statement can catch the ChuckNorrisException'
  },
  getWeet: {
    type: 'object',
    properties: {
      data: {
        $ref: '#/components/schemas/weetContent'
      },
      message: {
        type: 'string',
        example: WEET_GET_FOUND
      }
    }
  },
  createWeet: {
    type: 'object',
    properties: {
      content: {
        $ref: '#/components/schemas/weetContent'
      }
    }
  },
  weetCreated: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        properties: {
          content: {
            $ref: '#/components/schemas/weetContent'
          }
        }
      },
      message: {
        type: 'string',
        example: WEET_CREATED
      }
    }
  },
  invalidWeetParameters: {
    type: 'object',
    properties: {
      message: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            msg: {
              type: 'string',
              example: "'content' must be greater than 1 and less than 140 characters"
            },
            param: {
              type: 'string',
              example: 'content'
            },
            location: {
              type: 'string',
              example: 'body'
            }
          }
        }
      },
      internal_code: {
        type: 'string',
        example: BAD_REQUEST
      }
    }
  }
};
