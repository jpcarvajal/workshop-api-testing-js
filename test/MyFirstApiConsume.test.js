const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');
const request = require('superagent');

const expect = chai.expect;

describe('First Api Tests', () => {
});

it('Consume GET Service', async () => {
    const response = await agent.get('https://httpbin.org/ip');
  
    expect (response.status).to.equal(statusCode.StatusCodes.OK);
    expect(response.body).to.have.property('origin');
  });

it('Consume GET Service with query parameters', async () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };
  
    const response = await agent.get('https://httpbin.org/get').query(query);
  
    expect (response.status).to.equal(statusCode.StatusCodes.OK);
    expect(response.body.args).to.eql(query);
});

it('Consume HEAD Service', async () => {
    request
    .head('https://httpbin.org/headers')
    .then(res => {
        expect (response.status).to.equal(statusCode.StatusCodes.OK);
    });
});


it('Consume HEAD Service with query parameters', async () => {
    const query = {
        name: 'John',
        age: '31',
        city: 'New York'
      };
    
      const response = await agent.head('https://httpbin.org/headers').query(query);
    
      expect (response.status).to.equal(statusCode.StatusCodes.OK);
    });

it('Consume PATCH Service with query parameters', async () => {
    const query = {
      name: 'Audi e-tron',
      color: 'Blue',
      price: '100000'
    };

    const response = await agent.patch('https://httpbin.org/patch').query(query);

    expect (response.status).to.equal(statusCode.StatusCodes.OK);
    expect(response.body.args).to.eql(query);
});

it('Consume PUT Service with query parameters', async () => {
    const data = {
        name:"tj",
        pet:"tobi"
    }
    
    request
    .put('https://httpbin.org/put')
    .set('content-Type', 'applicationfdgfga/json')
    .send(data)
    .then(res => {
        expect (res.status).to.equal(statusCode.StatusCodes.OK);
        //Pasa aún si le pongo a que compare con query (query no está definido)
        expect (res.body.data).to.eql(query)
  });
});

it('Consume Delete Service with query parameters', async () => {
    request
    .del('https://httpbin.org/delete')
    .then(res => {
        expect (res.status).to.equal(statusCode.StatusCodes.OK);
  });
});



