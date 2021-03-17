module.exports = {
  '/users/sessions': {
    post: {
      tags: ['Session operations'],
      description: 'JWT Sign in',
      operationId: 'signIn',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/signIn'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'Sign in successful',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/signInOk'
              }
            }
          }
        },
        400: {
          description: 'Credentials are not valid',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/signInBad'
              }
            }
          }
        }
      }
    }
  }
};
