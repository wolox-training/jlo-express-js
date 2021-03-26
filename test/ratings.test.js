const request = require('supertest');
const app = require('../app');
const UsersService = require('../app/services/users');
const WeetsService = require('../app/services/weets');
// const RatingsService = require('../app/services/ratings');
const { getRegularUserByEmailMock } = require('./mocks/admin');
const { signInInput } = require('./mocks/sessions');
const {
  createRatingInput,
  unproccesableRating,
  getNullWeetByIdMock
  // getWeetByIdMock
} = require('./mocks/ratings');

describe('Ratings', () => {
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

  describe('POST /weets/:id/ratings', () => {
    describe('Weet does not exist', () => {
      test('Rating should not be created, unproccesable entity should be returned', async done => {
        const getWeetByIdServiceSpy = jest.spyOn(WeetsService, 'getWeetById');
        getWeetByIdServiceSpy.mockImplementation(getNullWeetByIdMock);
        await request(app)
          .post('/weets/1/ratings')
          .set('Authorization', `Bearer ${regularToken}`)
          .send(createRatingInput)
          .expect('Content-Type', /json/)
          .expect(422)
          .then(res => {
            expect(res.body).toEqual(unproccesableRating);
            done();
          })
          .catch(err => done(err));
      });
    });

    // describe('Weet exists', () => {
    //   test('Rating should be created with specific score', async done => {
    //     const getWeetByIdServiceSpy = jest.spyOn(WeetsService, 'getWeetById');
    //     getWeetByIdServiceSpy.mockImplementation(getWeetByIdMock);
    //     await request(app)
    //       .post('/weets/1/ratings')
    //       .set('Authorization', `Bearer ${regularToken}`)
    //       .send(createRatingInput)
    //       .expect('Content-Type', /json/)
    //       .expect(200)
    //       .then(res => {
    //         expect(res.body).toEqual({});
    //         done();
    //       })
    //       .catch(err => done(err));
    //   });

    //   // test('Rating should be updated', async done => {});

    //   // test('User position should be updated', async done => {});
    // });
  });
});
