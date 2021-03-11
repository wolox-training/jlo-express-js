const { UNPROCESSABLE_ENTITY, BAD_REQUEST } = require('../../app/errors');
const {
  CREATED,
  VALIDATE_PASSWORD_MATCHES,
  VALIDATE_EXISTS,
  validationMessage
} = require('../../config/constants');

const passwordInvalid = '111av';

const createUserInput = {
  name: 'Julián',
  lastName: 'Barrientos',
  email: 'julian1.lopera@wolox.co',
  password: 'password1'
};

const createUserOutput = {
  data: {
    name: createUserInput.name
  },
  message: CREATED
};

const uniqueEmailErrorMessage = 'email must be unique';

const emailUniqueErrors = user => [
  {
    value: user.email,
    message: uniqueEmailErrorMessage,
    type: 'unique violation',
    origin: 'DB',
    path: 'email'
  }
];

const unproccesableEmail = {
  message: [uniqueEmailErrorMessage],
  internal_code: UNPROCESSABLE_ENTITY
};

const passwordBadRequest = {
  message: [
    {
      msg: validationMessage('password', VALIDATE_PASSWORD_MATCHES),
      location: 'body',
      param: 'password',
      value: passwordInvalid
    }
  ],
  internal_code: BAD_REQUEST
};

const parameterExistsBadRequest = parameterName => ({
  msg: validationMessage(parameterName, VALIDATE_EXISTS),
  param: parameterName,
  location: 'body'
});

module.exports = {
  createUserInput,
  createUserOutput,
  emailUniqueErrors,
  unproccesableEmail,
  passwordInvalid,
  passwordBadRequest,
  parameterExistsBadRequest
};
