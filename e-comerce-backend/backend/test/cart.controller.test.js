const request = require('supertest');
const express = require('express')
const cartItems = require('../data/cartDb.js'); 
const cartRoute = '/api/cart';
const userRoute = '/api/user';

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

require('../routes/routesCartApp.js')(app);
require('../routes/routesUsersApp.js')(app);

let token

describe('Cart API', () => {

  test('GET /api/cart', async () => { // Get all Cart Items
    const userResponse = await request(app) //To get auth token
      .post(userRoute + '/signin')
      .send({ email: 'camryn.keller@quinnipiac.edu', password: 'abc123' });
    token = userResponse.body.token;

    const expectedResponse = { status: 'ok', updatedCarts: cartItems };
    const response = await request(app).get(cartRoute).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });

  test('POST /api/cart', async () => { // should add product in cart
    const expectedResponse = { status: 'ok', updatedCarts: cartItems };
    const response = await request(app)
        .post(cartRoute)
        .send({ cartId: '3', userId: 'camryn.keller@quinnipiac.edu', productId: '50', count: "15"})
        .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expectedResponse);
  });

  test('DELETE /api/cart/:id', async () => { // should delete product in cart
    const deleteCartId = '2';
    
    const response = await request(app)
        .delete(cartRoute + '/' + deleteCartId)
        .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.correctCarts).toContain(deleteCartId);
  });
});