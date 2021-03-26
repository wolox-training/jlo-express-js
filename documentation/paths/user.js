module.exports = {
  '/users': {
    post: {
      tags: ['User operations'],
      description: 'Create user',
      operationId: 'createUser',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/userInput'
            }
          }
        },
        required: true
      },
      responses: {
        201: {
          description: 'Created',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/userCreated'
              }
            }
          }
        },
        400: {
          description: 'Invalid parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/invalidUserParameters'
              }
            }
          }
        },
        442: {
          description: 'email must be unique',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/invalidUserEmail'
              }
            }
          }
        }
      }
    },
    get: {
      tags: ['User operations'],
      description: 'Get all users',
      operationId: 'getAllUsers',
      parameters: [
        {
          $ref: '#/components/schemas/offset'
        },
        {
          $ref: '#/components/schemas/limit'
        }
      ],
      responses: {
        200: {
          description: 'Users successful obtained',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/getAllUsers'
              }
            }
          }
        }
      }
    }
  }
};
