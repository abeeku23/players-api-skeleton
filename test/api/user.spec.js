/*jshint esversion: 6 */
const _ = require('lodash');
const server = require('../../src/server');
const User = require('../../src/models/User');
const data = require('../util/data');

describe('User API', () => {

  describe('POST /api/user', () => {
    beforeEach(async () => {
      await User.remove({});
    });

    ['first_name', 'last_name', 'email'].forEach(field => {
      it(`should fail if ${field} not present`, done => {
        chai.request(server)
          .post('/api/user')
          .send(_.omit(data.user, field))
          .end(err => {
            expect(err).to.exist;
            expect(err.status).to.equal(409);
            done();
          });
      });
    });

    it('should fail if passwords do not match', done => {
      const user = Object.assign({}, data.user, { password: '__different__' });
      chai.request(server)
        .post('/api/user')
        .send(user)
        .end(err => {
          expect(err).to.exist;
          expect(err.status).to.equal(409);
          done();
        });
    });

    it('should fail if user already exists', done => {
      User.create(data.user)
        .then(() => {
          chai.request(server)
            .post('/api/user')
            .send(data.user)
            .end(err => {
              expect(err).to.exist;
              expect(err.status).to.equal(409);
              done();
            });
        })
        .catch(err => {
          throw err;
        });
    });

    it('should deliver user and token if successful', done => {
      chai.request(server)
        .post('/api/user')
        .send(data.user)
        .end((err, res) => {
          expect(err).not.to.exist;
          expect(res.status).to.equal(201);
          expect(res.body.success).to.be.true;
          expect(res.body.user).to.be.a('object');
          expect(res.body.user.id).to.be.a('string');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
  });

  describe('POST /api/login', () => {
    beforeEach(async () => {
      await User.remove({});
      await chai.request(server)
        .post('/api/user')
        .send(data.user);
    });

    it('should fail if email not found', done => {
      chai.request(server)
        .post('/api/login')
        .send({ email: 'notfound@email.com', password: data.password })
        .end(err => {
          expect(err).to.exist;
          expect(err.status).to.equal(401);
          done();
        });
    });

    it('should fail if password invalid', done => {
      chai.request(server)
        .post('/api/login')
        .send({ email: data.email, password: '__wrong__' })
        .end(err => {
          expect(err).to.exist;
          expect(err.status).to.equal(401);
          done();
        });
    });

    it('should deliver user and token if successful', done => {
      chai.request(server)
        .post('/api/login')
        .send({ email: data.email, password: data.password })
        .end((err, res) => {
          expect(err).not.to.exist;
          expect(res.status).to.equal(200);
          expect(res.body.success).to.be.true;
          expect(res.body.user).to.be.a('object');
          expect(res.body.user.id).to.be.a('string');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
  });

  describe('PUT /api/user/:userId', () => {
    let loggedInUser;

    beforeEach(async () => {
      await User.remove({});
      loggedInUser = await chai.request(server)
        .post('/api/user')
        .send(data.user)
        .then(res => res.body.user);
    });

    it('should update the user data', (done) => {
      const updatedUser = Object.assign({}, data.user, { first_name: 'Elon', last_name: 'Musk' });
      chai.request(server)
        .put(`/api/user/${loggedInUser.id}`)
        .send(updatedUser)
        .end((err, res) => {
          expect(err).not.to.exist;
          expect(res.status).to.equal(200);
          expect(res.body.success).to.be.true;
          expect(res.body.user).to.be.a('object');
          expect(res.body.user.id).to.be.a('string');
          expect(res.body.user.first_name).to.equal('Elon');
          expect(res.body.user.last_name).to.equal('Musk');
          done();
        });
    });
  });
});
