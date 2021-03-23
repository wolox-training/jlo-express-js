const { BAD_REQUEST } = require('../../app/errors');
const { WEET_GET_FOUND, WEET_CREATED, GET_WEETS_OK } = require('../../config/constants');

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
  },
  getWeets: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        properties: {
          weets: {
            type: 'object',
            properties: {
              count: {
                type: 'intenger',
                example: 1
              },
              rows: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      $ref: '#/components/schemas/id'
                    },
                    content: {
                      $ref: '#/components/schemas/weetContent'
                    },
                    userId: {
                      $ref: '#/components/schemas/id'
                    }
                  }
                }
              }
            }
          }
        }
      },
      message: {
        type: 'string',
        example: GET_WEETS_OK
      }
    }
  }
};
