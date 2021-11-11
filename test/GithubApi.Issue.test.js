const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');
const request = require('superagent');

const urlBase = 'https://api.github.com';

describe('Github Api Test Post & Patch', () => {
    it('Información usuario logueado', async () => {
        const response = await agent.get(`${urlBase}/user`)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
        urlRepos = response.body.repos_url;
        usuario = response.body.login;
        expect(response.body.public_repos).length > 0
    });
    it('Acceso a repositorio', async () => {
        const response = await agent.get(urlRepos)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
        repos = response.body[0]
        resposName = repos.name
        expect(repos).to.not.equal(undefined);
    });
    it('Crear issue', async () => {
        titulo = 'Titulo'
        const issueResponse = await agent.post(`${urlBase}/repos/${usuario}/${resposName}/issues`)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent')
        .send({ title: titulo });
        expect(issueResponse.body.title).equal(titulo);
        expect(issueResponse.body.body).equal(null);
        issueNumber = issueResponse.body.number
    });
    it('Modificar issue', async () => {
        const body = 'Body'
        const issueResponse = await agent.patch(`${urlBase}/repos/${usuario}/${resposName}/issues/${issueNumber}`)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent')
        .send({ body: body });
        expect(issueResponse.body.title).equal(titulo);
        expect(issueResponse.body.body).equal(body);
    });
});