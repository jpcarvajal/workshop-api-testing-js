const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');
const { expect } = require('chai');

const urlBase = 'https://api.github.com';

describe('With query parameters', () => {
  it('Cantidad por defecto', async () => {
    const response = await agent.get(`${urlBase}/users`)
    .set('User-Agent', 'agent');
    expect(response.status).to.equal(statusCode.StatusCodes.OK);
    expect(Object.entries(response.body).length).equals(30);
  });

  it('10 usuarios', async () => {
    const users = 10;
    const query = { per_page: users };

    const response = await agent.get(`${urlBase}/users`)
    .set('User-Agent', 'agent')
    .query(query);
    expect(response.status).to.equal(statusCode.StatusCodes.OK);
    expect(Object.entries(response.body).length).equals(users);
  });

  it('50 usuarios', async () => {
    const users = 50;
    const query = { per_page: users };

    const response = await agent.get(`${urlBase}/users`)
    .set('User-Agent', 'agent')
    .query(query);
    expect(response.status).to.equal(statusCode.StatusCodes.OK);
    expect(Object.entries(response.body).length).equals(users);
  });
});