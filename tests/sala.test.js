import request from 'supertest'
import { sign } from 'jsonwebtoken'

import app from '../src/app'
import User from '../src/app/models/User'
import Sala from '../src/app/models/Sala'

/* Testes 
  Listar salas sem token de acesso ✔
  Listar salas em caso de sucesso ✔

  Adicionar sala sem token de acesso ✔
  Adicionar sala em caso de sucesso ✔

  Deletar sala sem token de acesso e sem id ✔
  Deletar sala com o campo id mas sem token válido ✔
  Deletar sala sem o campo id com token válido ✔
  Deletar sala com o campo id invalido e token valido ✔
  Deletar sala com o campo id valido ✔
*/

const mockAccessToken = async () => {
  await User.create({
    name: 'matheus',
    cpf: '11430143916',
    rg: '272582268',
    email: 'matheus@gmail.com',
    phone: 'movel',
    number: '999555595',
    username: 'matheus',
    password: '123456',
    profile: 'admin'
  })
  const user = await User.findOne({ where: { email: 'matheus@gmail.com' }})
  const { id } = user.dataValues
  const token = sign({ id }, 'hash#@$', { expiresIn: '7d'})
  return token
}

const mockSala = async () => {
    const { dataValues } = await Sala.create({
        total: 100
    })
    return dataValues.id
}

describe('Sala tests', () => {
  beforeEach(async () => {
    await User.sync({force: true})
    await Sala.sync({force: true})
  })

  /* GET */
  it('Should return 401 if call get salas without accessToken', async () => {
    await request(app)
    .get('/sala')
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  it('Should return 200 if call get salas with accessToken', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .get('/sala')
    .set('Authorization', `Bearer ${accessToken}`)
    .then(response => {
      expect(response.statusCode).toBe(200)
    });
  })

  /* POST */
  it('Should return 401 if call post salas without accessToken', async () => {
    await request(app)
    .post('/sala')
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  it('Should return 200 if call post salas with accessToken', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .post('/sala')
    .set('Authorization', `Bearer ${accessToken}`)
    .then(response => {
      expect(response.statusCode).toBe(200)
    });
  })

  /* DELETE */
  it('Should return 401 if call get delete without accessToken', async () => {
    await request(app)
    .delete('/sala')
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  it('Should return 401 if call get delete without accessToken and with invalid id', async () => {
    await request(app)
    .delete('/sala')
    .send({
        id: '1'
    })
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  it('Should return 400 if call get delete with accessToken but without id', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .delete('/sala')
    .set('Authorization', `Bearer ${accessToken}`)
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if call get delete with accessToken and invalid id', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .delete('/sala')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
        id: '5'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 200 on success delete', async () => {
    const accessToken = await mockAccessToken()
    const salaId = await mockSala()
    await request(app)
    .delete('/sala')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
        id: `${salaId}`
    })
    .then(response => {
      expect(response.statusCode).toBe(200)
    });
  })
})