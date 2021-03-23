module.exports = {
  '/weet': {
    get: {
      tags: ['Weet operations'],
      description: 'Allows you to obtain a weet',
      operationId: 'getWeet',
      responses: {
        200: {
          description: 'Weet was obtained',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/getWeet'
              }
            }
          }
        }
      }
    }
  },
  '/weets': {
    post: {
      tags: ['Weet operations'],
      description: 'Allows you to create a weet',
      operationId: 'createWeet',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/createWeet'
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
                $ref: '#/components/schemas/weetCreated'
              }
            }
          }
        },
        400: {
          description: 'Invalid parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/invalidWeetParameters'
              }
            }
          }
        },
        401: {
          description: 'Invalid session authentication',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/invalidToken'
              }
            }
          }
        }
      }
    }
  }
};
