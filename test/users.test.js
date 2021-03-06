/* eslint-disable no-unused-vars */
/* eslint-disable max-params */

const { CronJob } = require('cron');
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
  rowsMock,
  createUserMock
} = require('./mocks/users');
const { sendWelcomeEmailMock, sendBadWelcomeEmailMock, unproccesableSendEmail } = require('./mocks/mailer');
const MailerService = require('../app/services/mailer');
const UsersService = require('../app/services/users');
const { signInInput, getUserByEmailMock, getNullUserByEmailMock } = require('./mocks/sessions');
const { BAD_CREDENTIALS, TIME_ZONE, CRON_TIME } = require('../config/constants');

let regularToken = null;

jest.mock('cron', () => ({
  CronJob: jest.fn().mockImplementation((cronTime, onTick, onComplete, start, timeZone) => ({
    start: () => true
  }))
}));

describe('Users', () => {
  beforeEach(() => {
    jest.resetModules();
    signInInput.password = '12345abc';
    CronJob.mockClear();
  });

  describe('POST /users', () => {
    test('User should be created successful', async done => {
      const sendWelcomeEmailSpy = jest.spyOn(MailerService, 'sendWelcomeEmail');
      sendWelcomeEmailSpy.mockImplementation(sendWelcomeEmailMock);
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

    test('The unsent mail message should be returned.', async done => {
      const sendWelcomeEmailSpy = jest.spyOn(MailerService, 'sendWelcomeEmail');
      sendWelcomeEmailSpy.mockImplementation(sendBadWelcomeEmailMock);
      await request(app)
        .post('/users')
        .send(createUserInput)
        .expect('Content-Type', /json/)
        .expect(422)
        .then(res => {
          expect(res.body).toEqual(unproccesableSendEmail);
          done();
        })
        .catch(err => done(err));
    });

    test("'email' parameter should be unique", async done => {
      const createUserServiceMock = jest.spyOn(UsersService, 'createUser');
      createUserServiceMock.mockImplementation(user =>
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
      const reqBody = { ...createUserInput };
      reqBody.password = passwordInvalid;
      await request(app)
        .post('/users')
        .send(reqBody)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(res => {
          expect(res.body).toEqual(passwordBadRequest);
          done();
        })
        .catch(err => done(err));
    });

    test('Required parameters should be generate a bad_request response', async done => {
      const reqBody = { ...createUserInput };
      const parameterName = 'name';
      delete reqBody[parameterName];
      await request(app)
        .post('/users')
        .send(reqBody)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(res => {
          expect(res.body.message).toContainEqual(parameterExistsBadRequest(parameterName));
          done();
        })
        .catch(err => done(err));
    });

    test('Mail job should be properly called', async done => {
      jest.resetModules();
      const createUserSpy = jest.spyOn(UsersService, 'createUser');
      createUserSpy.mockImplementation(createUserMock);
      const sendWelcomeEmailSpy = jest.spyOn(MailerService, 'sendWelcomeEmail');
      sendWelcomeEmailSpy.mockImplementation(sendWelcomeEmailMock);
      await request(app)
        .post('/users')
        .send(createUserInput)
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => {
          expect(CronJob).toBeCalledWith(CRON_TIME, expect.any(Function), null, true, TIME_ZONE);
          expect(res.body).toEqual(createUserOutput);
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
        .expect(401)
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
        .expect(401)
        .then(res => {
          expect(res.body.message).toBe(BAD_CREDENTIALS);
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /users', () => {
    beforeEach(async done => {
      const getUserByEmailSpy = jest.spyOn(UsersService, 'getUserByEmail');
      getUserByEmailSpy.mockImplementation(getUserByEmailMock);
      await request(app)
        .post('/users/sessions')
        .send(signInInput)
        .then(res => {
          regularToken = res && res.body && res.body.data && res.body.data.token;
          done();
        })
        .catch(err => done(err));
    });

    test('Paginated user list should be returned', async done => {
      const getAllUsersSpy = jest.spyOn(UsersService, 'getAllUsers');
      getAllUsersSpy.mockImplementation(getAllUsersMock);
      await request(app)
        .get('/users?offset=0&limit=5')
        .set('Authorization', `Bearer ${regularToken}`)
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
