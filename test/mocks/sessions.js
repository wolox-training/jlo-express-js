const signInInput = {
  email: 'julian1.lopera@wolox.co',
  password: '12345abc'
};

const getUserByEmailMock = email =>
  Promise.resolve({
    id: 1,
    name: 'Julián',
    lastName: 'Lopera',
    password: '$2a$10$EYvF77TQ8YxOk4a.mvjH4.J7oRCjgXlAyUCjT7CE6Q5lpD4hBQeL.',
    email,
    role: 'regular'
  });

const getNullUserByEmailMock = email => Promise.resolve(null && email);

module.exports = {
  signInInput,
  getUserByEmailMock,
  getNullUserByEmailMock
};
