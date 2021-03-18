const request = require('supertest');
const app = require('../app');
const UsersService = require('../app/services/users');
const { UPDATED, INVALID_TOKEN } = require('../config/constants');
const {
  getAdminUserByEmailMock,
  getNullAdminUserByEmailMock,
  getRegularUserByEmailMock
} = require('./mocks/admin');
const { signInInput } = require('./mocks/sessions');
const { createUserInput, createUserOutput } = require('./mocks/users');

describe('Admin', () => {
  let adminToken = null;
  let regularToken = null;

  beforeEach(() => {
    jest.resetModules();
    signInInput.password = '12345abc';
  });
  describe('POST /admin/users', () => {
    describe('Regular user request', () => {
      beforeEach(async done => {
        const getUserByEmailSpy = jest.spyOn(UsersService, 'getUserByEmail');
        getUserByEmailSpy.mockImplementation(getRegularUserByEmailMock);
        await request(app)
          .post('/users/sessions')
          .send(signInInput)
          .then(res => {
            regularToken = res && res.body && res.body.data && res.body.data.token;
            done();
          })
          .catch(err => done(err));
      });

      test('Regular user should be unauthorized', async done => {
        const getUserByEmailSpy = jest.spyOn(UsersService, 'getUserByEmail');
        getUserByEmailSpy.mockImplementation(getNullAdminUserByEmailMock);
        await request(app)
          .post('/admin/users')
          .set('Authorization', `Bearer ${regularToken}`)
          .send(createUserInput)
          .expect('Content-Type', /json/)
          .expect(401)
          .then(res => {
            expect(res.body.message).toBe(INVALID_TOKEN);
            done();
          })
          .catch(err => done(err));
      });
    });

    describe('Admin user request', () => {
      beforeEach(async done => {
        const getUserByEmailSpy = jest.spyOn(UsersService, 'getUserByEmail');
        getUserByEmailSpy.mockImplementation(getAdminUserByEmailMock);
        await request(app)
          .post('/users/sessions')
          .send(signInInput)
          .then(res => {
            adminToken = res && res.body && res.body.data && res.body.data.token;
            done();
          })
          .catch(err => done(err));
      });

      test('Admin user should be created successful', async done => {
        const getUserByEmailSpy = jest.spyOn(UsersService, 'getUserByEmail');
        getUserByEmailSpy.mockImplementation(getNullAdminUserByEmailMock);
        await request(app)
          .post('/admin/users')
          .set('Authorization', `Bearer ${adminToken}`)
          .send(createUserInput)
          .expect('Content-Type', /json/)
          .expect(201)
          .then(res => {
            expect(res.body).toEqual(createUserOutput);
            done();
          })
          .catch(err => done(err));
      });

      test('Regular user should be created successful', async done => {
        const getUserByEmailSpy = jest.spyOn(UsersService, 'getUserByEmail');
        getUserByEmailSpy.mockImplementation(getRegularUserByEmailMock);
        await request(app)
          .post('/admin/users')
          .set('Authorization', `Bearer ${adminToken}`)
          .send(createUserInput)
          .expect('Content-Type', /json/)
          .expect(200)
          .then(res => {
            expect(res.body.data).toEqual(createUserOutput.data);
            expect(res.body.message).toEqual(UPDATED);
            done();
          })
          .catch(err => done(err));
      });
    });
  });
});
