module.exports = {
  name: {
    type: 'string',
    example: 'Julián'
  },
  lastName: {
    type: 'string',
    example: 'Barrientos'
  },
  email: {
    type: 'string',
    example: 'julian.lopera@wolox.co'
  },
  password: {
    type: 'string',
    example: 'passwrd1'
  },
  UserInput: {
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
  UserCreated: {
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
  InvalidUserParameters: {
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
  InvalidUserEmail: {
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
  }
};
