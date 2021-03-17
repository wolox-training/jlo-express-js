const { GET_USERS_OK } = require('../../config/constants');

module.exports = {
  userInput: {
    type: 'object',
    properties: {
      name: {
        $ref: '#/components/schemas/name'
      },
      lastName: {
        $ref: '#/components/schemas/lastName'
      },
      email: {
        $ref: '#/components/schemas/email'
      },
      password: {
        $ref: '#/components/schemas/password'
      }
    }
  },
  userCreated: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'Julián'
          }
        }
      },
      message: {
        type: 'string',
        example: 'Created'
      }
    }
  },
  invalidUserParameters: {
    type: 'object',
    properties: {
      message: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            value: {
              type: 'string',
              example: null
            },
            msg: {
              type: 'string',
              example: "'name' must be a string"
            },
            param: {
              type: 'string',
              example: 'name'
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
        example: 'bad_request'
      }
    }
  },
  invalidUserEmail: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'email must be unique'
      },
      internal_code: {
        type: 'string',
        example: 'unprocessable_entity'
      }
    }
  },
  getAllUsers: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        properties: {
          users: {
            type: 'object',
            properties: {
              count: {
                type: 'integer',
                example: 10
              },
              rows: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      $ref: '#/components/schemas/id'
                    },
                    name: {
                      $ref: '#/components/schemas/name'
                    },
                    lastName: {
                      $ref: '#/components/schemas/lastName'
                    },
                    email: {
                      $ref: '#/components/schemas/email'
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
        example: GET_USERS_OK
      }
    }
  }
};
