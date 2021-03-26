const request = require('supertest');
const app = require('../app');
const UsersService = require('../app/services/users');
const WeetsService = require('../app/services/weets');
const { getRegularUserByEmailMock } = require('./mocks/admin');
const { signInInput } = require('./mocks/sessions');
const {
  createWeetInput,
  createBadWeedInput,
  createWeetOutput,
  createWeetMock,
  createBadWeedConstraint,
  getAllWeetsMock,
  countMock,
  rowsMock
} = require('./mocks/weets');

describe('Weets', () => {
  let regularToken = null;

  beforeEach(async done => {
    jest.resetModules();
    signInInput.password = '12345abc';
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

  describe('POST /weets', () => {
    test('Weet should be created', async done => {
      const createWeetServiceSpy = jest.spyOn(WeetsService, 'createWeet');
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

  describe('GET /weets', () => {
    test('Paginated weet list should be returned', async done => {
      const getAllWeetsSpy = jest.spyOn(WeetsService, 'getAllWeets');
      getAllWeetsSpy.mockImplementation(getAllWeetsMock);
      await request(app)
        .get('/weets?offset=0&limit=5')
        .set('Authorization', `Bearer ${regularToken}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body.data.weets.count).toBe(countMock);
          expect(res.body.data.weets.rows).toEqual(rowsMock);
          done();
        })
        .catch(err => done(err));
    });
  });
});
