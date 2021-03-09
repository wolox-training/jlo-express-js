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
              $ref: '#/components/schemas/UserInput'
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
                $ref: '#/components/schemas/UserCreated'
              }
            }
          }
        },
        400: {
          description: 'Invalid parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/InvalidUserParameters'
              }
            }
          }
        },
        442: {
          description: 'email must be unique',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/InvalidUserEmail'
              }
            }
          }
        }
      }
    }
  }
};
