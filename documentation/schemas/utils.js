module.exports = {
  id: {
    type: 'integer',
    example: 1
  },
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
  offset: {
    name: 'offset',
    in: 'query',
    schema: {
      type: 'integer',
      default: 0
    },
    required: false
  },
  limit: {
    name: 'limit',
    in: 'query',
    schema: {
      type: 'integer',
      default: 5
    },
    required: false
  }
};
