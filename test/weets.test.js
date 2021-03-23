const request = require('supertest');
const app = require('../app');
const UsersService = require('../app/services/users');
const WeetsSercive = require('../app/services/weets');
const { getRegularUserByEmailMock } = require('./mocks/admin');
const { signInInput } = require('./mocks/sessions');
const {
  createWeetInput,
  createBadWeedInput,
  createWeetOutput,
  createWeetMock,
  createBadWeedConstraint
} = require('./mocks/weets');

describe('Weets', () => {
  let regularToken = null;

  beforeEach(() => {
    jest.resetModules();
    signInInput.password = '12345abc';
  });

  describe('POST /weets', () => {
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
    test('Weet should be created', async done => {
      const createWeetServiceSpy = jest.spyOn(WeetsSercive, 'createWeet');
      createWeetServiceSpy.mockImplementation(createWeetMock);
      await request(app)
        .post('/weets')
        .set('Authorization', `Bearer ${regularToken}`)
        .send(createWeetInput)
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => {
          expect(res.body).toEqual(createWeetOutput);
          done();
        })
        .catch(err => done(err));
    });

    test('Weet isLength constraint should be returned', async done => {
      await request(app)
        .post('/weets')
        .set('Authorization', `Bearer ${regularToken}`)
        .send(createBadWeedInput)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(res => {
          expect(res.body.message).toContainEqual(createBadWeedConstraint);
          done();
        })
        .catch(err => done(err));
    });
  });
});
