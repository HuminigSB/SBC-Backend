import request from 'supertest'
import { sign } from 'jsonwebtoken'

import app from '../src/app'
import User from '../src/app/models/User'
import Poltrona from '../src/app/models/Poltrona'

/* Testes 
  Listar poltronas sem token de acesso ✔
  Listar poltronas em casso de sucesso ✔

  Criar poltrona sem token de acesso ✔
  Criar poltrona sem campos obrigatórios (id_sala, row, column, type) ✔
  Criar poltrona com type que não existe (< 0 || > 4) ✔
  Criar poltrona em caso de sucesso ✔

  Atualizar poltrona sem token de acesso
  Atualizar poltrona sem campos obrigatórios (type, value)
  Atualizar poltrona que não existe no banco
  Atualizar poltrona em caso de sucesso
  
  Deletar poltrona sem token de acesso ✔
  Deletar poltrona sem campo obrigatório (active) ✔
  Deletar poltrona que não existe no banco ✔
  Deletar poltrona em caso de sucesso ✔
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

const mockPoltrona = async () => {
    const { dataValues } = await Poltrona.create({
        id_sala: "1", 
        row: "1",
        column: "1",
        value: "20.00", 
        type: 'doble'
    })
    return dataValues.id
}

describe('Poltrona tests', () => {
  beforeEach(async () => {
    await User.sync({force: true})
    await Poltrona.sync({force: true})
  })

  /* GET */
  it('Should return 401 if call get poltrona without accessToken', async () => {
    await request(app)
    .get('/poltrona')
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  it('Should return 200 if call get poltrona with accessToken', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .get('/poltrona/1')
    .set('Authorization', `Bearer ${accessToken}`)
    .then(response => {
      expect(response.statusCode).toBe(200)
    });
  })

  /* POST */
  it('Should return 401 if call post poltrona without accessToken', async () => {
    await request(app)
    .post('/poltrona')
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  it('Should return 400 if call post poltrona without id_sala', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .post('/poltrona')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
        row: 1,
        column: 1,
        type: 1
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if call post poltrona without row', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .post('/poltrona')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
        id_sala: 1,
        column: 1,
        type: 1
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if call post poltrona without column', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .post('/poltrona')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
        id_sala: 1,
        row: 1,
        type: 1
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if call post poltrona without type', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .post('/poltrona')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
        id_sala: 1,
        row: 1,
        column: 1
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if call post poltrona with invalid type', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .post('/poltrona')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
        id_sala: 1,
        row: 1,
        column: 1,
        type: 5
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 200 if call post poltrona with valid fields', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .post('/poltrona')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
        id_sala: 1,
        row: 1,
        column: 1,
        type: 1
    })
    .then(response => {
      expect(response.statusCode).toBe(200)
    });
  })

  /* DELETE */
  it('Should return 401 if call delete poltrona without accessToken', async () => {
    await request(app)
    .delete('/poltrona')
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  it('Should return 400 if call delete poltrona without active', async () => {
    const accessToken = await mockAccessToken()
    const idPoltrona = await mockPoltrona()
    await request(app)
    .delete(`/poltrona/${idPoltrona}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send({})
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if call delete poltrona with invalid id', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .delete('/poltrona/50')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({})
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 200 if call dele poltrona on sucess', async () => {
    const accessToken = await mockAccessToken()
    const idPoltrona = await mockPoltrona()
    await request(app)
    .delete(`/poltrona/${idPoltrona}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
        active: false
    })
    .then(response => {
      expect(response.statusCode).toBe(200)
    });
  })

  /* UPDATE */
  it('Should return 401 if call update poltrona without accessToken', async () => {
    await request(app)
    .put('/poltrona')
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  it('Should return 400 if call update poltrona without type', async () => {
    const accessToken = await mockAccessToken()
    const idPoltrona = await mockPoltrona()
    await request(app)
    .put(`/poltrona/${idPoltrona}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
        value: "7.00"
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if call update poltrona without value', async () => {
    const accessToken = await mockAccessToken()
    const idPoltrona = await mockPoltrona()
    await request(app)
    .put(`/poltrona/${idPoltrona}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
        type: "wheelchair"
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if call update poltrona with not exists', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .put('/poltrona/50')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
        type: "wheelchair",
        value: "7.00"
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 200 if call update poltrona on success', async () => {
    const accessToken = await mockAccessToken()
    const idPoltrona = await mockPoltrona()
    await request(app)
    .put(`/poltrona/${idPoltrona}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
        type: "wheelchair",
        value: "7.00"
    })
    .then(response => {
      expect(response.statusCode).toBe(200)
    });
  })
})
