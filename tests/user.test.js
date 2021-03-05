import request from 'supertest'
import { sign } from 'jsonwebtoken'

import app from '../src/app'
import User from '../src/app/models/User'

/* Testes
  Listagem de usuários sem token de acesso ✔
  Listagem de usuários com token de acesso ✔

  Cadastro de usuário sem campos obrigatórios (nome, e-mail, cpf, rg, username, password) ✔
  Cadastro de usuário com e-mail inválido ✔
  Cadastro de usuário com e-mail em uso ✔
  Cadastro de usuário com cpf inválido ✔
  Cadastro de usuário com rg inválido ✔
  Cadastro de usuário com nome de usuário em uso ✔
  Cadastro de usuário com dados corretos ✔
  
  Atualização de usuário sem os dados obrigatórios (nome, e-mail, cpf, rg) ✔
  Atualização de usuário com e-mail em uso ✔
  Atualização de usuário com e-mail inválido ✔
  Atualização de usuário com nome de usuário em uso ✔
  Atualização de usuário com rg inválido ✔
  Atualização de usuário com cpf inválido ✔
  Atualização de usuário sem token de acesso ✔
  Atualização de usuário com dados corretos ✔

  Deletar usuário com id que não existe ✔
  Deletar usuário sem token de acesso ✔
  Deletar usuário com token de acesso ✔
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
  it('Should return 401 if call get users without accessToken', async () => {
    await request(app)
    .get('/user')
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  it('Should return 200 if call get users with accessToken', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .get('/user')
    .set('Authorization', `Bearer ${accessToken}`)
    .then(response => {
      expect(response.statusCode).toBe(200)
    });
  })

  /* POST */
  it('Should add a user with all corrects values', async () => {
    await request(app)
    .post('/user')
    .send({
      name: 'matheus',
      cpf: '11430143916',
      rg: '272582268',
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

  it('Should return 400 if send a invalid e-mail', async () => {
    await request(app)
    .post('/user')
    .send({
      name: 'matheus',
      cpf: '11430143916',
      rg: '497773703',
      email: 'matheusgmail.com',
      phone: 'movel',
      number: '999555595',
      username: 'mapx',
      password: '123456',
      profile: 'admin'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if send a invalid cpf', async () => {
    await request(app)
    .post('/user')
    .send({
      name: 'matheus',
      cpf: '11430143910',
      rg: '497773703',
      email: 'matheusgmail.com',
      phone: 'movel',
      number: '999555595',
      username: 'mapx',
      password: '123456',
      profile: 'admin'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if send a invalid rg', async () => {
    await request(app)
    .post('/user')
    .send({
      name: 'matheus',
      cpf: '11430143916',
      rg: '497773700',
      email: 'matheusgmail.com',
      phone: 'movel',
      number: '999555595',
      username: 'mapx',
      password: '123456',
      profile: 'admin'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if not send a name', async () => {
    await request(app)
    .post('/user')
    .send({
      name: '',
      cpf: '11430143916',
      rg: '272582268',
      email: 'matheus@gmail.com',
      phone: 'movel',
      number: '999555595',
      username: 'mapx',
      password: '123456',
      profile: 'admin'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if not send a email', async () => {
    await request(app)
    .post('/user')
    .send({
      name: 'matheus',
      cpf: '11430143916',
      rg: '272582268',
      email: '',
      phone: 'movel',
      number: '999555595',
      username: 'mapx',
      password: '123456',
      profile: 'admin'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if not send a cpf', async () => {
    await request(app)
    .post('/user')
    .send({
      name: 'matheus',
      cpf: '',
      rg: '272582268',
      email: 'matheus@gmail.com',
      phone: 'movel',
      number: '999555595',
      username: 'mapx',
      password: '123456',
      profile: 'admin'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if not send a rg', async () => {
    await request(app)
    .post('/user')
    .send({
      name: 'matheus',
      cpf: '11430143916',
      rg: '',
      email: 'matheus@gmail.com',
      phone: 'movel',
      number: '999555595',
      username: 'mapx',
      password: '123456',
      profile: 'admin'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if not send a username', async () => {
    await request(app)
    .post('/user')
    .send({
      name: 'matheus',
      cpf: '11430143916',
      rg: '272582268',
      email: 'matheus@gmail.com',
      phone: 'movel',
      number: '999555595',
      username: '',
      password: '123456',
      profile: 'admin'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if not send a password', async () => {
    await request(app)
    .post('/user')
    .send({
      name: 'matheus',
      cpf: '11430143916',
      rg: '272582268',
      email: 'matheus@gmail.com',
      phone: 'movel',
      number: '999555595',
      username: 'mapx',
      password: '',
      profile: 'admin'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if send a duplicated e-mail', async () => {
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
    .post('/user')
    .send({
      name: 'matheus',
      cpf: '11430143916',
      rg: '272582268',
      email: 'matheus@gmail.com',
      phone: 'movel',
      number: '999555595',
      username: 'mapx',
      password: '123456',
      profile: 'admin'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if send a duplicated username', async () => {
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
    .post('/user')
    .send({
      name: 'matheus',
      cpf: '11430143916',
      rg: '272582268',
      email: 'matheus@gmail.com',
      phone: 'movel',
      number: '999555595',
      username: 'mapx',
      password: '123456',
      profile: 'admin'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
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

  it('Should return 400 if try update without name', async () => {
    const accessToken = await mockAccessToken()

    await User.create({
      name: 'matheus',
      cpf: '11430143916',
      rg: '272582268',
      email: 'mapx@gmail.com',
      phone: 'movel',
      number: '999555595',
      username: 'mapx',
      password: '123456',
      profile: 'admin'
    })

    await request(app)
    .put(('/user/2'))
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      name: '',
      cpf: '11430143916',
      rg: '272582268',
      email: 'mapx@gmail.com'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if try update without cpf', async () => {
    const accessToken = await mockAccessToken()

    await User.create({
      name: 'matheus',
      cpf: '11430143916',
      rg: '272582268',
      email: 'mapx@gmail.com',
      phone: 'movel',
      number: '999555595',
      username: 'mapx',
      password: '123456',
      profile: 'admin'
    })

    await request(app)
    .put(('/user/2'))
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      name: 'matheus',
      cpf: '',
      rg: '272582268',
      email: 'mapx@gmail.com'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if try update without rg', async () => {
    const accessToken = await mockAccessToken()

    await User.create({
      name: 'matheus',
      cpf: '11430143916',
      rg: '272582268',
      email: 'mapx@gmail.com',
      phone: 'movel',
      number: '999555595',
      username: 'mapx',
      password: '123456',
      profile: 'admin'
    })

    await request(app)
    .put(('/user/2'))
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      name: 'matheus',
      cpf: '11430143916',
      rg: '',
      email: 'mapx@gmail.com'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if try update without e-mail', async () => {
    const accessToken = await mockAccessToken()

    await User.create({
      name: 'matheus',
      cpf: '11430143916',
      rg: '272582268',
      email: 'mapx@gmail.com',
      phone: 'movel',
      number: '999555595',
      username: 'mapx',
      password: '123456',
      profile: 'admin'
    })

    await request(app)
    .put(('/user/2'))
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      name: 'matheus',
      cpf: '11430143916',
      rg: '272582268',
      email: ''
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if try update with a e-mail in use', async () => {
    const accessToken = await mockAccessToken()

    await User.create({
      name: 'matheus',
      cpf: '11430143916',
      rg: '272582268',
      email: 'mapx@gmail.com',
      phone: 'movel',
      number: '999555595',
      username: 'mapx',
      password: '123456',
      profile: 'admin'
    })

    await request(app)
    .put(('/user/2'))
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      name: 'matheus',
      cpf: '11430143916',
      rg: '272582268',
      email: 'matheus@gmail.com'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if try update with a username in use', async () => {
    const accessToken = await mockAccessToken()

    await User.create({
      name: 'matheus',
      cpf: '11430143916',
      rg: '272582268',
      email: 'mapx@gmail.com',
      phone: 'movel',
      number: '999555595',
      username: 'mapx',
      password: '123456',
      profile: 'admin'
    })

    await request(app)
    .put(('/user/2'))
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      name: 'matheus',
      cpf: '11430143916',
      rg: '272582268',
      email: 'mapx@gmail.com',
      username: 'matheus'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if try update with a invalid e-mail', async () => {
    const accessToken = await mockAccessToken()

    await User.create({
      name: 'matheus',
      cpf: '11430143916',
      rg: '272582268',
      email: 'mapx@gmail.com',
      phone: 'movel',
      number: '999555595',
      username: 'mapx',
      password: '123456',
      profile: 'admin'
    })

    await request(app)
    .put(('/user/2'))
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      name: 'matheus',
      cpf: '11430143916',
      rg: '272582268',
      email: 'mapxgmail.com'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if try update with a invalid cpf', async () => {
    const accessToken = await mockAccessToken()

    await User.create({
      name: 'matheus',
      cpf: '11430143916',
      rg: '272582268',
      email: 'mapx@gmail.com',
      phone: 'movel',
      number: '999555595',
      username: 'mapx',
      password: '123456',
      profile: 'admin'
    })

    await request(app)
    .put(('/user/2'))
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      name: 'matheus',
      cpf: '11430143910',
      rg: '272582268',
      email: 'mapx@gmail.com'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if try update with a invalid rg', async () => {
    const accessToken = await mockAccessToken()

    await User.create({
      name: 'matheus',
      cpf: '11430143916',
      rg: '272582268',
      email: 'mapx@gmail.com',
      phone: 'movel',
      number: '999555595',
      username: 'mapx',
      password: '123456',
      profile: 'admin'
    })

    await request(app)
    .put(('/user/2'))
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      name: 'matheus',
      cpf: '11430143916',
      rg: '272582260',
      email: 'mapx@gmail.com'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 200 on success updated', async () => {
    const accessToken = await mockAccessToken()

    await User.create({
      name: 'matheus',
      cpf: '11430143916',
      rg: '272582268',
      email: 'mapx@gmail.com',
      phone: 'movel',
      number: '999555595',
      username: 'mapx',
      password: '123456',
      profile: 'admin'
    })

    await request(app)
    .put(('/user/2'))
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      name: 'matheus',
      cpf: '11430143916',
      rg: '272582268',
      email: 'mapx@gmail.com'
    })
    .then(response => {
      expect(response.statusCode).toBe(200)
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

  it('Should return 400 if id not exists', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .delete(('/user'))
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      id: "10"
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should delete an account on success', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .delete(('/user'))
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      id: "1"
    })
    .then(response => {
      expect(response.statusCode).toBe(200)
    });
  })
})