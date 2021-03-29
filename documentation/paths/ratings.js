module.exports = {
  '/weets/:id/ratings': {
    post: {
      tags: ['Ratings operations'],
      description: 'Create rating',
      operationId: 'createRating',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/createRatingInuput'
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
                $ref: '#/components/schemas/ratingUpdated'
              }
            }
          }
        },
        201: {
          description: 'Created',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ratingCreated'
              }
            }
          }
        },
        400: {
          description: 'Invalid parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/invalidScoreInput'
              }
            }
          }
        },
        422: {
          description: 'email must be unique',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/invalidResource'
              }
            }
          }
        }
      }
    }
  }
};
