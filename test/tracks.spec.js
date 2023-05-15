const requestSuperTest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const { tokenSign } = require('../utils/handleJwt');
const { userAdminRegister, trackDumb, storageDumb } = require('./mocks/mocks');
const { userModel, storageModel, trackModel } = require('../models');
let JTW_TOKEN = '';
let STORAGE_ID = '';

beforeAll(async () => {
  await userModel.deleteMany({});
  await storageModel.deleteMany({});
  const user = await userModel.create(userAdminRegister);
  const storage = await storageModel.create(storageDumb);
  STORAGE_ID = storage._id.toString();
  JTW_TOKEN = tokenSign(user);
}, 60000);  

afterAll(() => {
  mongoose.connection.close();
});


describe('[TRACKS] - Tracks routes', () => {
  let trackId = '';
  it('should create a track', async () => {
    const newTrack = {...trackDumb, mediaId: STORAGE_ID};
    const response = await requestSuperTest(app)
      .post('/api/v1/tracks')
      .set('Authorization', `Bearer ${JTW_TOKEN}`)
      .send(newTrack);

    const { body } = response;
    expect(response.status).toBe(201);
    expect(body).toHaveProperty('data');
    expect(body).toHaveProperty('data.name');
    expect(body).toHaveProperty('data.artist');
    expect(body).toHaveProperty('data.duration');
  });

  it('should get all tracks', async () => {
    const response = await requestSuperTest(app)
      .get('/api/v1/tracks')
      .set('Authorization', `Bearer ${JTW_TOKEN}`);
    const { body } = response;
    expect(response.status).toBe(200);
    expect(body).toHaveProperty('data');
  });

  it('should get a track', async () => {
    const { _id } = await trackModel.findOne({});
    trackId = _id.toString();
    const response = await requestSuperTest(app)
      .get(`/api/v1/tracks/${trackId}`)
      .set('Authorization', `Bearer ${JTW_TOKEN}`);
    const { body } = response;
    expect(response.status).toBe(200);
    expect(body).toHaveProperty('data'); 
  });

  it('should update a track', async () => {
    const trackUpdate = {...trackDumb, name: 'Track updated', mediaId: STORAGE_ID};
    const { _id } = await trackModel.findOne({});
    trackId = _id.toString();
    const response = await requestSuperTest(app)
      .put(`/api/v1/tracks/${trackId}`)
      .set('Authorization', `Bearer ${JTW_TOKEN}`)
      .send(trackUpdate);
    const { body } = response;
    expect(response.status).toBe(200);
    expect(body).toHaveProperty('data');
    expect(body.data.name).toBe('Track updated');
  });

  it('should delete a track', async () => {
    const { _id } = await trackModel.findOne({});
    trackId = _id.toString();
    const response = await requestSuperTest(app)
      .delete(`/api/v1/tracks/${trackId}`)
      .set('Authorization', `Bearer ${JTW_TOKEN}`);
    const { body } = response;
    expect(response.status).toBe(200);
    expect(body).toBe(true);
  });
});
