import request from 'supertest'
import { sign } from 'jsonwebtoken'

import app from '../src/app'
import User from '../src/app/models/User'
import Bilhete from '../src/app/models/Bilhete'

/* Testes
  Inserção de bilhete sem campos obrigatórios (id_sessao, id_sala, id_poltrona) ✔
  Inserção de bilhete sem token de acesso ✔
  Inserção de bilhete com token de acesso inválido ✔
  Inserção de bilhete com dados corretos  ✔

  Atualização de bilhete sem campos obrigatórios (id, reservado) ✔
  Atualização de bilhete sem token de acesso ✔
  Atualização de bilhete com token de acesso inválido ✔
  Atualização de bilhete com dados corretos  ✔

  Listar bilhetes sem token de acesso ✔
  Listar bilhetes com token de acesso inválido ✔
  Listar bilhetes com tudo certo ✔
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

describe('Bilhete tests', () => {
  beforeEach(async () => {
    await User.sync({force: true}),
    await Bilhete.sync({force: true})
  })

  /* POST */
  it('Should return 400 if not send a id_sessao', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .post('/bilhete')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      id_sessao: '',
      id_sala: '1',
      id_poltrona: '1'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if not send a id_sala', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .post('/bilhete')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      id_sessao: '1',
      id_sala: '',
      id_poltrona: '1'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if not send a id_poltrona', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .post('/bilhete')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      id_sessao: '1',
      id_sala: '1',
      id_poltrona: ''
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 401 if try add bilhete without accessToken', async () => {
    await request(app)
    .post(('/bilhete'))
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  it('Should return 401 if send a invalid accessToken', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .post('/bilhete')
    .set('Authorization', `Barrer ${accessToken}`)
    .send({
      id_sessao: '1',
      id_sala: '1',
      id_poltrona: '1'
    })
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  it('Should return 200 on success add a bilhete with all corrects values', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .post('/bilhete')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      id_sessao: '1',
      id_sala: '1',
      id_poltrona: '1'
    })
    .then(response => {
      expect(response.statusCode).toBe(200)
    });
  })

  /* PUT */
  it('Should return 400 if not send a id', async () => {
    const accessToken = await mockAccessToken()

    await Bilhete.create({
      id_sessao: '1',
      id_sala: '1',
      id_poltrona: '1'
    })
    
    await request(app)
    .put('/bilhete')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      id: '',
      reservado: true
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if not send a reservado', async () => {
    const accessToken = await mockAccessToken()

    await Bilhete.create({
      id_sessao: '1',
      id_sala: '1',
      id_poltrona: '1'
    })
    
    await request(app)
    .put('/bilhete')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      id: '1',
      reservado: ''
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 401 if try update bilhete without accessToken', async () => {
    await request(app)
    .put(('/bilhete'))
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  it('Should return 401 if send a invalid accessToken', async () => {
    const accessToken = await mockAccessToken()

    await Bilhete.create({
      id_sessao: '1',
      id_sala: '1',
      id_poltrona: '1'
    })

    await request(app)
    .put('/bilhete')
    .set('Authorization', `Barrer ${accessToken}`)
    .send({
      id: '1',
      reservado: true
    })
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  it('Should return 200 on success updated', async () => {
    const accessToken = await mockAccessToken()

    await Bilhete.create({
      id_sessao: '1',
      id_sala: '1',
      id_poltrona: '1'
    })

    await request(app)
    .put('/bilhete')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      id: '1',
      reservado: true
    })
    .then(response => {
      expect(response.statusCode).toBe(200)
    });
  })

  /* GET */
  it('Should return 401 if try get bilhete without acessToken', async () => {
    await request(app)
    .get('/bilhete/1')
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  it('Should return 401 if send a invalid accessToken', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .get('/bilhete/1')
    .set('Authorization', `Barrer ${accessToken}`)
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  it('Should return 200 on success get bilhete with all correct', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .get('/bilhete/1')
    .set('Authorization', `Bearer ${accessToken}`)
    .then(response => {
      expect(response.statusCode).toBe(200)
    });
  })
})