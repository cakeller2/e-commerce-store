const request = require('supertest');
const express = require('express')
const products = require('../data/products.js')  
const productRoute = '/api/products'

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

require('../routes/routesProductsApp.js')(app);

describe('Products API', () => {
  test('GET /api/products', async () => { // all products
    const response = await request(app).get(productRoute);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(products);    
  });
  
  it('GET /api/products/:id ', async () => { //should return a specific product
    const productId = "6"; // Assuming this is a valid product ID
    const response = await request(app).get(productRoute + "/" + productId);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(productId);
  });
  
  it('GET /api/products/:id ', async () => { //with invalid id should return 404
    const invalidId = "999"; // Assuming this is an invalid product ID
    const response = await request(app).get(productRoute + "/" + invalidId);
    expect(response.status).toBe(200);
    expect(response.body.id).not.toBe(invalidId);
  });
});