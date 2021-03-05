import request from 'supertest'
import { sign } from 'jsonwebtoken'

import app from '../src/app'
import User from '../src/app/models/User'

/* Testes 
  Listar usuário sem token de acesso ✔
  Listar usuário sem o id no parametro ✔
  Listar usuário com id passado inválido ✔
  Listar usuário em caso de sucesso ✔

  Login de usuário sem os campos obrigatórios (username, password) ✔
  Login de usuário com username inválido ✔
  Login de usuário com senha inválida ✔
  Login de usuário em caso de sucesso ✔
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

describe('User tests', () => {
  beforeEach(async () => {
    await User.sync({force: true})
  })

  /* GET */
  it('Should return 401 if call get user without accessToken', async () => {
    await request(app)
    .get('/login')
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  it('Should return 404 if call get user without id on parameter', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .get('/login')
    .set('Authorization', `Bearer ${accessToken}`)
    .then(response => {
      expect(response.statusCode).toBe(404)
    });
  })

  it('Should return 400 if call get user with invalid id on parameter', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .get('/login/5')
    .set('Authorization', `Bearer ${accessToken}`)
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 200 on success', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .get('/login/1')
    .set('Authorization', `Bearer ${accessToken}`)
    .then(response => {
      expect(response.statusCode).toBe(200)
    });
  })

  /* POST */
  it('Should return 400 on login without username', async () => {
    await request(app)
    .post('/login')
    .send({
        username: '',
        password: '123456'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 on login without password', async () => {
    await request(app)
    .post('/login')
    .send({
        username: 'matheus',
        password: ''
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 200 on login with invalid username', async () => {
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
    await request(app)
    .post('/login')
    .send({
        username: 'matheuss',
        password: '123456'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 200 on login with invalid password', async () => {
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
    await request(app)
    .post('/login')
    .send({
        username: 'matheuss',
        password: '123456'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 200 on login success', async () => {
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
    await request(app)
    .post('/login')
    .send({
        username: 'matheus',
        password: '123456'
    })
    .then(response => {
      expect(response.statusCode).toBe(200)
    });
  })
})