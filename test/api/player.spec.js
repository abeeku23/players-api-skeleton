const _ = require('lodash');
const server = require('../../src/server');

const data = require('../util/data');
const User = require('../../src/models/User');
const Player = require('../../src/models/Player');

let token, user;

describe('Player API', () => {

  before(async () => {
    await User.remove({});
    const res = await chai.request(server)
      .post('/api/user')
      .send(data.user);
    token = res.body.token;
    user = res.body.user;
    data.player.created_by = user.id;
    data.player2.created_by = user.id;
  });

  describe('POST /api/players', () => {
    beforeEach(async () => {
      await Player.remove({});
    });

    it('should fail if token not provided', done => {
      chai.request(server)
        .post('/api/players')
        .send(data.player)
        .end(err => {
          expect(err).to.exist;
          expect(err.status).to.equal(403);
          done();
        });
    });

    ['first_name', 'last_name', 'rating', 'handedness'].forEach(field => {
      it(`should fail if ${ field } not present`, done => {
        chai.request(server)
          .post('/api/players')
          .send(_.omit(data.player, field))
          .set('Authorization', `Bearer ${ token }`)
          .end(err => {
            expect(err).to.exist;
            expect(err.status).to.equal(409);
            done();
          });
      });
    });

    it('should fail if player with same name exists', done => {
      Player.create(data.player)
        .then(() => {
          chai.request(server)
            .post('/api/players')
            .send(data.player)
            .set('Authorization', `Bearer ${ token }`)
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

    it('should deliver player if successful', done => {
      chai.request(server)
        .post('/api/players')
        .send(data.player)
        .set('Authorization', `Bearer ${ token }`)
        .end((err, res) => {
          expect(err).not.to.exist;
          expect(res.status).to.equal(201);
          expect(res.body).to.be.a('object');
          expect(res.body.success).to.be.true;
          expect(res.body.player).to.be.a('object');
          done();
        });
    });
  });

  describe('GET /api/players', () => {
    beforeEach(async () => {
      await Player.remove({});
    });

    it('should fail if token not provided', done => {
      chai.request(server)
        .get('/api/players')
        .end(err => {
          expect(err).to.exist;
          expect(err.status).to.equal(403);
          done();
        });
    });

    it('should deliver an empty array if no players', async () => {
      let res, error;
      try {
        res = await chai.request(server)
          .get('/api/players')
          .set('Authorization', `Bearer ${ token }`);
      } catch (err) {
        error = err;
      }

      expect(error).not.to.exist;
      expect(res.status).to.equal(200);
      expect(res.body).to.be.a('object');
      expect(res.body.success).to.be.true;
      expect(res.body.players).to.be.a('array');
      expect(res.body.players.length).to.equal(0);
    });

    it('should deliver all players', async () => {
      await Player.create(data.player);
      await Player.create(data.player2);

      let res, error;
      try {
        res = await chai.request(server)
          .get('/api/players')
          .set('Authorization', `Bearer ${ token }`);
      } catch (err) {
        error = err;
      }

      expect(error).not.to.exist;
      expect(res.status).to.equal(200);
      expect(res.body).to.be.a('object');
      expect(res.body.success).to.be.true;
      expect(res.body.players).to.be.a('array');
      expect(res.body.players.length).to.equal(2);

      res.body.players.forEach(player => expect(player.id).to.be.a('string'));
    });

    it('should not deliver players created by other users', async () => {
      const userRes = await chai.request(server)
        .post('/api/user')
        .send(Object.assign({}, data.user, { email: 'seconduser@foo.com' }));

      await Player.create(data.player);
      await Player.create(Object.assign({}, data.player2, { created_by: userRes.body.user.id }));

      let res, error;
      try {
        res = await chai.request(server)
          .get('/api/players')
          .set('Authorization', `Bearer ${ token }`);
      } catch (err) {
        error = err;
      }

      expect(error).not.to.exist;
      expect(res.status).to.equal(200);
      expect(res.body).to.be.a('object');
      expect(res.body.success).to.be.true;
      expect(res.body.players).to.be.a('array');
      expect(res.body.players.length).to.equal(1);

      res.body.players.forEach(player => expect(player.id).to.be.a('string'));
    });
  });

  describe('DELETE /players/:id', () => {
    beforeEach(async () => {
      await Player.remove({});
    });

    it('should fail if token not provided', done => {
      chai.request(server)
        .delete('/api/players/1')
        .end(err => {
          expect(err).to.exist;
          expect(err.status).to.equal(403);
          done();
        });
    });

    it('should fail if player does not exist', async () => {
      let res, error;
      try {
        res = await chai.request(server)
          .delete('/api/players/1')
          .set('Authorization', `Bearer ${ token }`);
      } catch (err) {
        error = err;
      }

      expect(error).to.exist;
      expect(res).not.to.exist;
      expect(error.status).to.equal(404);
    });

    it('should fail if player created by different user', async () => {
      const userRes = await chai.request(server)
        .post('/api/user')
        .send(Object.assign({}, data.user, { email: '__deletetest__@foo.com' }));

      let player = await Player.create(Object.assign({}, data.player, { created_by: userRes.body.user.id }));

      let res, error;
      try {
        res = await chai.request(server)
          .delete(`/api/players/${ player.id }`)
          .set('Authorization', `Bearer ${ token }`);
      } catch (err) {
        error = err;
      }
      expect(error).to.exist;
      expect(res).not.to.exist;
      expect(error.status).to.equal(404);
    });

    it('should remove the player if successful', async () => {
      let player = await Player.create(data.player);
      let res, error;
      try {
        res = await chai.request(server)
          .delete(`/api/players/${ player.id }`)
          .set('Authorization', `Bearer ${ token }`);
      } catch (err) {
        error = err;
      }

      expect(error).not.to.exist;
      expect(res.status).to.equal(200);

      player = await Player.findById(player.id);
      expect(player).not.to.exist;
    });
  });
});
