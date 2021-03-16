const request = require('supertest');
const app = require('../app');
const { DBCreateError } = require('./mocks/errors');
const {
  createUserInput,
  createUserOutput,
  unproccesableEmail,
  emailUniqueErrors,
  passwordInvalid,
  passwordBadRequest,
  parameterExistsBadRequest,
  getAllUsersMock,
  countMock,
  rowsMock
} = require('./mocks/users');
const UsersService = require('../app/services/users');
const { signInInput, getUserByEmailMock, getNullUserByEmailMock } = require('./mocks/sessions');
const { BAD_CREDENTIALS } = require('../config/constants');

describe('Users', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('POST /users', () => {
    test('User should be created successful', async done => {
      await request(app)
        .post('/users')
        .send(createUserInput)
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => {
          expect(res.body).toEqual(createUserOutput);
          done();
        })
        .catch(err => done(err));
    });

    test("'email' parameter should be unique", async done => {
      const createUserSericeMock = jest.spyOn(UsersService, 'createUser');
      createUserSericeMock.mockImplementation(user =>
        Promise.reject(new DBCreateError('Invalid input', emailUniqueErrors(user)))
      );
      await request(app)
        .post('/users')
        .send(createUserInput)
        .expect('Content-Type', /json/)
        .expect(422)
        .then(res => {
          expect(res.body).toEqual(unproccesableEmail);
          done();
        })
        .catch(err => done(err));
    });

    test("'password' parameter is not valid", async done => {
      createUserInput.password = passwordInvalid;
      await request(app)
        .post('/users')
        .send(createUserInput)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(res => {
          expect(res.body).toEqual(passwordBadRequest);
          done();
        })
        .catch(err => done(err));
    });

    test('Required parameters should be generate a bad_request response', async done => {
      const parameterName = 'name';
      delete createUserInput[parameterName];
      await request(app)
        .post('/users')
        .send(createUserInput)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(res => {
          expect(res.body.message).toContainEqual(parameterExistsBadRequest(parameterName));
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('POST /users/session', () => {
    test('token should be returned', async done => {
      const getUserByEmailSpy = jest.spyOn(UsersService, 'getUserByEmail');
      getUserByEmailSpy.mockImplementation(getUserByEmailMock);
      await request(app)
        .post('/users/sessions')
        .send(signInInput)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body.data.token).toBeTruthy();
          done();
        })
        .catch(err => done(err));
    });

    test('bad request should be returned when password does not match', async done => {
      const getUserByEmailSpy = jest.spyOn(UsersService, 'getUserByEmail');
      getUserByEmailSpy.mockImplementation(getUserByEmailMock);
      signInInput.password = 'abc12345';
      await request(app)
        .post('/users/sessions')
        .send(signInInput)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(res => {
          expect(res.body.message).toBe(BAD_CREDENTIALS);
          done();
        })
        .catch(err => done(err));
    });

    test('bad request should be returned when user does not exist', async done => {
      const getUserByEmailSpy = jest.spyOn(UsersService, 'getUserByEmail');
      getUserByEmailSpy.mockImplementation(getNullUserByEmailMock);
      await request(app)
        .post('/users/sessions')
        .send(signInInput)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(res => {
          expect(res.body.message).toBe(BAD_CREDENTIALS);
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /users', () => {
    test('Paginated user list should be returned', async done => {
      const getAllUsersSpy = jest.spyOn(UsersService, 'getAllUsers');
      getAllUsersSpy.mockImplementation(getAllUsersMock);
      await request(app)
        .get('/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body.data.users.count).toBe(countMock);
          expect(res.body.data.users.rows).toEqual(rowsMock);
          done();
        })
        .catch(err => done(err));
    });
  });
});
