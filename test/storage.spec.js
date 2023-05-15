const requestSuperTest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const { tokenSign } = require('../utils/handleJwt');
const { userAdminRegister } = require('./mocks/mocks');
const { userModel, storageModel } = require('../models');
let JTW_TOKEN = '';
const filePath = `${__dirname}/mocks/track.mp3`;

beforeAll(async () => {
  await userModel.deleteMany({});
  await storageModel.deleteMany({});
  const user = await userModel.create(userAdminRegister);
  JTW_TOKEN = tokenSign(user);
}, 60000);

afterAll(() => {
  mongoose.connection.close();
})

describe('[STORAGE] - Storage routes', () => {
  let id = '';
  it('should upload a file', async () => {
    const response = await requestSuperTest(app)
      .post('/api/v1/storage')
      .set('Authorization', `Bearer ${JTW_TOKEN}`)
      .attach('myfile', filePath);
    const { body } = response;
    expect(response.status).toBe(201);
    expect(body).toHaveProperty('data');
    expect(body).toHaveProperty('data.url');
  });

  it('should get all files', async () => {
    const response = await requestSuperTest(app)
      .get('/api/v1/storage')
      .set('Authorization', `Bearer ${JTW_TOKEN}`)
    const { body } = response;
    expect(response.status).toBe(200);
    expect(body).toHaveProperty('data'); 
  })

  it('should get a file id', async() => {
    const { _id } = await storageModel.findOne();
    id = _id.toString();
  })

  it('should get a file by id', async () => {
    const response = await requestSuperTest(app)
      .get(`/api/v1/storage/${id}`)
      .set('Authorization', `Bearer ${JTW_TOKEN}`)
    const { body } = response;
    expect(response.status).toBe(200);
    expect(body).toHaveProperty('data');
  });

  it('should delete a file by id', async () => {
    const { _id } = await storageModel.findOne();
    id = _id.toString();
    const response = await requestSuperTest(app)
      .delete(`/api/v1/storage/${id}`)
      .set('Authorization', `Bearer ${JTW_TOKEN}`)
    const { body } = response;
    expect(response.status).toBe(200);
    expect(body).toBe(true);
  });
})