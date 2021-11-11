const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');
//token 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
const urlBase = 'https://api.github.com';
const githubUserName = 'jpcarvajal';
const repository = 'workshop-api-testing-js';

describe('Github Api Test Token', () => {
  describe('Authentication', () => {
    it('Via OAuth2 Tokens by Header', async () => {
      const response = await agent.get(`${urlBase}/repos/${githubUserName}/${repository}`)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      expect(response.status).to.equal(statusCode.StatusCodes.OK);
      expect(response.body.description).equal('This is a Workshop about Api Testing in JavaScript');
    });
  });
});