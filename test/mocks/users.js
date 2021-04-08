/* eslint-disable no-unused-vars */

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

const countMock = 10;
const rowsMock = [
  {
    id: 1,
    name: 'Julián',
    lastName: 'Lopera',
    email: 'julian1.lopera@wolox.co'
  },
  {
    id: 2,
    name: 'Julián',
    lastName: 'Lopera',
    email: 'julian2.lopera@wolox.co'
  },
  {
    id: 3,
    name: 'Julián',
    lastName: 'Lopera',
    email: 'julian3.lopera@wolox.co'
  },
  {
    id: 4,
    name: 'Julián',
    lastName: 'Lopera',
    email: 'julian4.lopera@wolox.co'
  },
  {
    id: 5,
    name: 'Julián',
    lastName: 'Lopera',
    email: 'julian5.lopera@wolox.co'
  }
];

const getAllUsersMock = pagination =>
  Promise.resolve({
    count: countMock,
    rows: rowsMock
  });

const createUserMock = user => Promise.resolve(true);

module.exports = {
  createUserInput,
  createUserOutput,
  emailUniqueErrors,
  unproccesableEmail,
  passwordInvalid,
  passwordBadRequest,
  parameterExistsBadRequest,
  getAllUsersMock,
  countMock,
  rowsMock,
  createUserMock
};
