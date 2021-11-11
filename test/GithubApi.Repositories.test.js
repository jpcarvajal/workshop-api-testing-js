const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');

const urlBase = 'https://api.github.com';
const githubUserName = 'aperdomob';
const repository = 'jasmine-awesome-report';

describe('Github Api Test Repositories', () => {
    it('Autenticación datos generales', async () => {
      const response = await agent.get(`${urlBase}/users/${githubUserName}`)
        .set('User-Agent', 'agent');
      expect(response.status).to.equal(statusCode.StatusCodes.OK);
      expect(response.body.name).to.equal('Alejandro Perdomo');
      expect(response.body.company).to.equal('Perficient Latam');
      expect(response.body.location).to.equal('Colombia');
    });
    it('Busqueda repositorio', async () => {
      const response = await agent.get(`${urlBase}/users/${githubUserName}/repos`)
        .set('User-Agent', 'agent');
      const repoInfo = response.body.find((repo) => repo.name === repository);
      expect(response.status).to.equal(statusCode.StatusCodes.OK);
      expect(repoInfo.name).to.equal(repository);
      expect(repoInfo.private).to.equal(false);
      expect(repoInfo.description).to.equal('An awesome html report for Jasmine');
    });
});





