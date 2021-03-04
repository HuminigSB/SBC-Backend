import request from 'supertest'
import app from '../src/app'

/* Testes
  Listagem de usuáriios sem token de acesso ✔
  Listagem de usuários com token de acesso

  Cadastro de usuário sem dados
  Cadastro de usuário sem campos obrigatórios (nome, e-mail, cpf, rg, username, password)
  Cadastro de usuário com e-mail inválido
  Cadastro de usuário com e-mail em uso
  Cadastro de usuário com cpf inválido
  Cadastro de usuário com rg inválido
  Cadastro de usuário com nome de usuário em uso
  Cadastro de usuário com dados corretos ✔
  
  Atualização de usuário sem os dados obrigatórios (nome, e-mail, cpf, rg)
  Atualização de usuário com e-mail em uso
  Atualização de usuário com nome de usuário em uso
  Atualização de usuário com rg inválido
  Atualização de usuário com cpf inválido
  Atualização de usuário sem token de acesso ✔
  Atualização de usuário com dados corretos

  Deletar usuário com id que não existe
  Deletar usuário sem token de acesso ✔
  Deletar usuário com token de acesso 
*/

describe('User tests', () => {
  /* GET */
  it('Should return 401 if call get users without accessToken', async () => {
    await request(app)
    .get('/user')
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  /* POST */
  it('Should add a user with all corrects values', async () => {
    await request(app)
    .post('/user')
    .send({
      name: 'matheus',
      cpf: '11430143916',
      rg: '497773703',
      email: 'matheus@gmail.com',
      phone: 'movel',
      number: '999555595',
      username: 'mapx',
      password: '123456',
      profile: 'admin'
    })
    .then(response => {
      expect(response.statusCode).toBe(200)
    });
  })

  /* PUT */
  it('Should return 401 if try update user without accessToken', async () => {
    await request(app)
    .put(('/user/1'))
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  /* DELETE */
  it('Should return 401 if try delete user without accessToken', async () => {
    await request(app)
    .delete(('/user'))
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })
})