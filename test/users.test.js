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
  parameterExistsBadRequest
} = require('./mocks/users');
const UsersService = require('../app/services/users');

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
});
