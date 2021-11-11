const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');

const urlBase = 'https://api.github.com';
const gitHubUserName = 'aperdomob';

describe('Github Api Test Following', () => {
    it('Seguir inicialmente', async () => {
      response = await agent.put(`${urlBase}/user/following/${gitHubUserName}`)
            .set('User-Agent', 'agent')
            .set('Accept', 'application/vnd.github.v3+json')
            .auth('token', process.env.ACCESS_TOKEN);
            expect(response.status).to.eql(statusCode.StatusCodes.NO_CONTENT);
            expect(response.body).length===0;
    });
    
    it('Consultar lista seguidos', async () => {
      const response = await agent.get(`${urlBase}/user/following`)
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN);
      const seguido = response.body.find((repo) => repo.login === gitHubUserName);
      expect(response.status).to.equal(statusCode.StatusCodes.OK);
      expect(seguido.login).to.equal(gitHubUserName);
    });

    it('Verifican idempotencia siguiendo', async () => {
      const response = await agent.get(`${urlBase}/user/following`)
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN);
      const seguido = response.body.find((repo) => repo.login === gitHubUserName);
      expect(response.status).to.equal(statusCode.StatusCodes.OK);
      expect(seguido.login).to.equal(gitHubUserName);
    });

    it('Verifican idempotencia revisando lista', async () => {
      const response = await agent.get(`${urlBase}/user/following`)
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN);
      const seguido = response.body.find((repo) => repo.login === gitHubUserName);
      expect(response.status).to.equal(statusCode.StatusCodes.OK);
      expect(seguido.login).to.equal(gitHubUserName);
    });
});

