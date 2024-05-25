const request = require('supertest');
const express = require('express')
const users = require('../data/usersDb.js') 
const userRoute = '/api/user';

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

require('../routes/routesUsersApp.js')(app);

describe('Test User Routes', () => {
  let token;

  test('GET /api/user', async () => { // Get all Users
    const response = await request(app).get(userRoute)
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(users);
  });

  test('POST /api/user/signup', async () => { // Sign Up User
    const response = await request(app)
      .post(userRoute + '/signup')
      .send({ email: 'test@example.com', fullName: 'Test User', password: 'password123' });

    expect(response.statusCode).toBe(201);
    expect(response.text).toEqual('Sucessfully account opened');
  });

  test('POST /api/user/signin', async () => { // Sign In User
    const response = await request(app)
      .post(userRoute + '/signin')
      .send({ email: 'camryn.keller@quinnipiac.edu', password: 'abc123' });

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toEqual('ok');
    expect(response.body.token).toBeDefined();
    token = response.body.token;
  });

  test('GET /api/user/me', async () => { // Get SignedIn User
    const response = await request(app)
      .get(userRoute + '/me')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.user.fullName).toBe("Camryn Keller");
  });
});