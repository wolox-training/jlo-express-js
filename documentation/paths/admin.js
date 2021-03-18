module.exports = {
  '/admin/users': {
    post: {
      tags: ['Admin operations'],
      description: 'Creates or updates admin user',
      operationId: 'createOrUpdateAdminUser',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/createOrUpdateAdminUser'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'Updated',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/userUpdated'
              }
            }
          }
        },
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
