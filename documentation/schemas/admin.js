module.exports = {
  createOrUpdateAdminUser: {
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
  }
};
