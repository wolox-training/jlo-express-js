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
                $ref: '#/components/schemas/Weet'
              }
            }
          }
        }
      }
    }
  }
};
