const requestSuperTest = require('supertest');
const app = require('../app');
const { userModel } = require('../models')
const authData = {
  "email": "admin@admin.com",
  "password": "admin2005"
}

const userRegister = {
    "name": "Diego",
    "age": 22,
    "email": "admin@admin.com",
    "password": "admin2005"
}

beforeAll(async () => {
  await userModel.deleteMany({});
});

describe('[AUTH] - Auth routes', () => {

  it('Should return 201 when register is successful', async () => {
    const response = await requestSuperTest(app)
      .post('/api/v1/auth/register')
      .send(userRegister)
    
    expect(response.status).toBe(201);
  });

  it('Should return 200 when login is successful', async () => {
    const response = await requestSuperTest(app)
      .post('/api/v1/auth/login')
      .send(authData)

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });

  it('should return 404 when user is not found', async () => {
    const response = await requestSuperTest(app)
      .post('/api/v1/auth/login')
      .send({email: 'abc@gmail.com', password: '123'})
    
    expect(response.status).toBe(404);
  });

  it('should return 400 when password is incorrect', async () => {
    const response = await requestSuperTest(app)
      .post('/api/v1/auth/login')
      .send({ "email": "admin@admin.com", "password": "admin2008"})

    expect(response.status).toBe(400);
  });

});