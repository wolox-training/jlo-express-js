/* eslint-disable no-unused-vars */

const getAdminUserByEmailMock = email =>
  Promise.resolve({
    id: 1,
    name: 'Julián',
    lastName: 'Lopera',
    password: '$2a$10$EYvF77TQ8YxOk4a.mvjH4.J7oRCjgXlAyUCjT7CE6Q5lpD4hBQeL.',
    email: 'julian1.lopera@wolox.com',
    role: 'admin'
  });

const getRegularUserByEmailMock = email =>
  Promise.resolve({
    id: 1,
    name: 'Julián',
    lastName: 'Lopera',
    password: '$2a$10$EYvF77TQ8YxOk4a.mvjH4.J7oRCjgXlAyUCjT7CE6Q5lpD4hBQeL.',
    email: 'julian1.lopera@wolox.com',
    role: 'regular',
    save: () => true
  });

const getNullAdminUserByEmailMock = email => Promise.resolve(null);

module.exports = {
  getAdminUserByEmailMock,
  getNullAdminUserByEmailMock,
  getRegularUserByEmailMock
};
