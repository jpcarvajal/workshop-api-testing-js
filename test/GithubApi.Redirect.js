const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');
const { expect } = require('chai');

const urlBase = 'https://github.com';
const gitHubUserName = 'aperdomob';

describe('GitHub Api HEAD method', () => {
    let check;
    it('Checking page code status', async () => {
      try {
        await agent.head(`${urlBase}/${gitHubUserName}/redirect-test`);
      } catch (response) {
        check = response;
      }
      expect(check.status).to.equal(statusCode.StatusCodes.MOVED_PERMANENTLY);
      expect(check.response.headers.location).to.equal(`${urlBase}/${gitHubUserName}/new-redirect-test`);
    });
    it('Redirecting requests', async () => {
        const response = await agent.get(`${urlBase}/${gitHubUserName}/redirect-test`)
        .set('User-Agent', 'agent');
      expect(response.status).to.equal(statusCode.StatusCodes.OK);
    });
  });