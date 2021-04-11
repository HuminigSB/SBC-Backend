import request from 'supertest'
import { sign } from 'jsonwebtoken'

import app from '../src/app'
import User from '../src/app/models/User'
import Sessao from '../src/app/models/Sessao'

/* Testes
  Inserção de sessao sem campos obrigatórios (idSala, title_movie, description, data, inicio, duracao) ✔
  Inserção de sessao sem token de acesso ✔
  Inserção de sessao com dados corretos ✔
  Inserção de sessao com valor invalido para o campo idSala ✔

  Editar sessao sem campos obrigatórios (title_movie, description) ✔
  Editar sessao sem token de acesso ✔
  Editar sessao com dados corretos ✔

  Deletar sessao sem token de acesso ✔
  Deletar sessao com sucesso ✔

  Listar sessoes sem token de acesso ✔
  Listar sessoes com sucesso ✔
  Buscar sessao sem token de acesso ✔
  Buscar sessao com sucesso ✔
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

describe('Sessao tests', () => {
  beforeEach(async () => {
    await User.sync({force: true}),
    await Sessao.sync({force: true})
  })

  /* POST */
  it('Should return 400 if not send a idSala', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .post('/sessao')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      idSala:'',
      title_movie:'In the Heights',
      description:'As luzes se acendem em Washington Heights... O cheirinho de um cafecito caliente paira no ar, na saída da estação de metrô da Rua 181, onde um caleidoscópio de sonhos mobiliza essa comunidade vibrante e muito unida.  No meio de tudo, temos o querido e magnético dono de uma mercearia, Usnavi (Anthony Ramos), que economiza cada centavo do seu dia de trabalho enquanto torce, imagina e canta sobre uma vida melhor.',
      data:'15/07/2021',
      inicio:'2021-07-15 00:15:32.133+00',
      duracao:'01:55'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if not send a title_movie', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .post('/sessao')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      idSala:'1',
      title_movie:'',
      description:'As luzes se acendem em Washington Heights... O cheirinho de um cafecito caliente paira no ar, na saída da estação de metrô da Rua 181, onde um caleidoscópio de sonhos mobiliza essa comunidade vibrante e muito unida.  No meio de tudo, temos o querido e magnético dono de uma mercearia, Usnavi (Anthony Ramos), que economiza cada centavo do seu dia de trabalho enquanto torce, imagina e canta sobre uma vida melhor.',
      data:'15/07/2021',
      inicio:'2021-07-15 00:15:32.133+00',
      duracao:'01:55'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if not send a description', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .post('/sessao')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      idSala:'1',
      title_movie:'In the Heights',
      description:'',
      data:'15/07/2021',
      inicio:'2021-07-15 00:15:32.133+00',
      duracao:'01:55'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if not send a data', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .post('/sessao')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      idSala:'1',
      title_movie:'In the Heights',
      description:'As luzes se acendem em Washington Heights... O cheirinho de um cafecito caliente paira no ar, na saída da estação de metrô da Rua 181, onde um caleidoscópio de sonhos mobiliza essa comunidade vibrante e muito unida.  No meio de tudo, temos o querido e magnético dono de uma mercearia, Usnavi (Anthony Ramos), que economiza cada centavo do seu dia de trabalho enquanto torce, imagina e canta sobre uma vida melhor.',
      data:'',
      inicio:'2021-07-15 00:15:32.133+00',
      duracao:'01:55'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if not send a inicio', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .post('/sessao')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      idSala:'1',
      title_movie:'In the Heights',
      description:'As luzes se acendem em Washington Heights... O cheirinho de um cafecito caliente paira no ar, na saída da estação de metrô da Rua 181, onde um caleidoscópio de sonhos mobiliza essa comunidade vibrante e muito unida.  No meio de tudo, temos o querido e magnético dono de uma mercearia, Usnavi (Anthony Ramos), que economiza cada centavo do seu dia de trabalho enquanto torce, imagina e canta sobre uma vida melhor.',
      data:'15/07/2021',
      inicio:'',
      duracao:'01:55'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if not send a duracao', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .post('/sessao')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      idSala:'1',
      title_movie:'In the Heights',
      description:'As luzes se acendem em Washington Heights... O cheirinho de um cafecito caliente paira no ar, na saída da estação de metrô da Rua 181, onde um caleidoscópio de sonhos mobiliza essa comunidade vibrante e muito unida.  No meio de tudo, temos o querido e magnético dono de uma mercearia, Usnavi (Anthony Ramos), que economiza cada centavo do seu dia de trabalho enquanto torce, imagina e canta sobre uma vida melhor.',
      data:'15/07/2021',
      inicio:'2021-07-15 00:15:32.133+00',
      duracao:''
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 401 if try add sessao without accessToken', async () => {
    await request(app)
    .post('/sessao')
    .send({
      idSala:'1',
      title_movie:'In the Heights',
      description:'As luzes se acendem em Washington Heights... O cheirinho de um cafecito caliente paira no ar, na saída da estação de metrô da Rua 181, onde um caleidoscópio de sonhos mobiliza essa comunidade vibrante e muito unida.  No meio de tudo, temos o querido e magnético dono de uma mercearia, Usnavi (Anthony Ramos), que economiza cada centavo do seu dia de trabalho enquanto torce, imagina e canta sobre uma vida melhor.',
      data:'15/07/2021',
      inicio:'2021-07-15 00:15:32.133+00',
      duracao:'01:55'
    })
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  it('Should return 200 on success add a sessao with all corrects values', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .post('/sessao')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      idSala:'1',
      title_movie:'In the Heights',
      description:'As luzes se acendem em Washington Heights... O cheirinho de um cafecito caliente paira no ar, na saída da estação de metrô da Rua 181, onde um caleidoscópio de sonhos mobiliza essa comunidade vibrante e muito unida.  No meio de tudo, temos o querido e magnético dono de uma mercearia, Usnavi (Anthony Ramos), que economiza cada centavo do seu dia de trabalho enquanto torce, imagina e canta sobre uma vida melhor.',
      data:'15/07/2021',
      inicio:'2021-07-15 00:15:32.133+00',
      duracao:'01:55'
    })
    .then(response => {
      expect(response.statusCode).toBe(200)
    });
  })

  it('Should return 400 if send a invalid idSala', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
    .post('/sessao')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      idSala:'1a',
      title_movie:'In the Heights',
      description:'As luzes se acendem em Washington Heights... O cheirinho de um cafecito caliente paira no ar, na saída da estação de metrô da Rua 181, onde um caleidoscópio de sonhos mobiliza essa comunidade vibrante e muito unida.  No meio de tudo, temos o querido e magnético dono de uma mercearia, Usnavi (Anthony Ramos), que economiza cada centavo do seu dia de trabalho enquanto torce, imagina e canta sobre uma vida melhor.',
      data:'15/07/2021',
      inicio:'2021-07-15 00:15:32.133+00',
      duracao:'01:55'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })
  
  /* PUT */
  it('Should return 400 if not send a title_movie', async () => {
    const accessToken = await mockAccessToken()
    await request(app).post('/sessao').set('Authorization', `Bearer ${accessToken}`).send({//cria sessão a ser editada
      idSala:'1',
      title_movie:'In the Heights',
      description:'As luzes se acendem em Washington Heights... O cheirinho de um cafecito caliente paira no ar, na saída da estação de metrô da Rua 181, onde um caleidoscópio de sonhos mobiliza essa comunidade vibrante e muito unida.  No meio de tudo, temos o querido e magnético dono de uma mercearia, Usnavi (Anthony Ramos), que economiza cada centavo do seu dia de trabalho enquanto torce, imagina e canta sobre uma vida melhor.',
      data:'15/07/2021',
      inicio:'2021-07-15 00:15:32.133+00',
      duracao:'01:55'
    })
    await request(app)
    .put(`/sessao/1`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      title_movie:'',
      description:'As luzes se acendem em Washington Heights... O cheirinho de um cafecito caliente paira no ar, na saída da estação de metrô da Rua 181, onde um caleidoscópio de sonhos mobiliza essa comunidade vibrante e muito unida.  No meio de tudo, temos o querido e magnético dono de uma mercearia, Usnavi (Anthony Ramos), que economiza cada centavo do seu dia de trabalho enquanto torce, imagina e canta sobre uma vida melhor.'
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 400 if not send a description', async () => {
    const accessToken = await mockAccessToken()
    await request(app).post('/sessao').set('Authorization', `Bearer ${accessToken}`).send({//cria sessão a ser editada
      idSala:'1',
      title_movie:'In the Heights',
      description:'As luzes se acendem em Washington Heights... O cheirinho de um cafecito caliente paira no ar, na saída da estação de metrô da Rua 181, onde um caleidoscópio de sonhos mobiliza essa comunidade vibrante e muito unida.  No meio de tudo, temos o querido e magnético dono de uma mercearia, Usnavi (Anthony Ramos), que economiza cada centavo do seu dia de trabalho enquanto torce, imagina e canta sobre uma vida melhor.',
      data:'15/07/2021',
      inicio:'2021-07-15 00:15:32.133+00',
      duracao:'01:55'
    })
    await request(app)
    .put('/sessao/1')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      title_movie:'In the Heights',
      description:''
    })
    .then(response => {
      expect(response.statusCode).toBe(400)
    });
  })

  it('Should return 401 if try edit sessao without accessToken', async () => {
    await request(app).post('/sessao').set('Authorization', `Bearer ${await mockAccessToken()}`).send({//cria sessão a ser editada
      idSala:'1',
      title_movie:'In the Heights',
      description:'As luzes se acendem em Washington Heights... O cheirinho de um cafecito caliente paira no ar, na saída da estação de metrô da Rua 181, onde um caleidoscópio de sonhos mobiliza essa comunidade vibrante e muito unida.  No meio de tudo, temos o querido e magnético dono de uma mercearia, Usnavi (Anthony Ramos), que economiza cada centavo do seu dia de trabalho enquanto torce, imagina e canta sobre uma vida melhor.',
      data:'15/07/2021',
      inicio:'2021-07-15 00:15:32.133+00',
      duracao:'01:55'
    })
    await request(app)
    .put('/sessao/1')
    .send({
      title_movie:'In the Heights',
      description:'As luzes se acendem em Washington Heights... O cheirinho de um cafecito caliente paira no ar, na saída da estação de metrô da Rua 181, onde um caleidoscópio de sonhos mobiliza essa comunidade vibrante e muito unida.  No meio de tudo, temos o querido e magnético dono de uma mercearia, Usnavi (Anthony Ramos), que economiza cada centavo do seu dia de trabalho enquanto torce, imagina e canta sobre uma vida melhor.'
    })
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  it('Should return 200 on success edit a sessao with all corrects values', async () => {
    const accessToken = await mockAccessToken()
    await request(app).post('/sessao').set('Authorization', `Bearer ${accessToken}`).send({//cria sessão a ser editada
      idSala:'1',
      title_movie:'In the Heights',
      description:'As luzes se acendem em Washington Heights... O cheirinho de um cafecito caliente paira no ar, na saída da estação de metrô da Rua 181, onde um caleidoscópio de sonhos mobiliza essa comunidade vibrante e muito unida.  No meio de tudo, temos o querido e magnético dono de uma mercearia, Usnavi (Anthony Ramos), que economiza cada centavo do seu dia de trabalho enquanto torce, imagina e canta sobre uma vida melhor.',
      data:'15/07/2021',
      inicio:'2021-07-15 00:15:32.133+00',
      duracao:'01:55'
    })
    await request(app)
    .put('/sessao/1')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      title_movie:'In the Heights',
      description:'As luzes se acendem em Washington Heights... O cheirinho de um cafecito caliente paira no ar, na saída da estação de metrô da Rua 181, onde um caleidoscópio de sonhos mobiliza essa comunidade vibrante e muito unida.  No meio de tudo, temos o querido e magnético dono de uma mercearia, Usnavi (Anthony Ramos), que economiza cada centavo do seu dia de trabalho enquanto torce, imagina e canta sobre uma vida melhor.'
    })
    .then(response => {
      expect(response.statusCode).toBe(200)
    });
  })

  /* DELETE */
  it('Should return 401 if try delete sessao without accessToken', async () => {
    await request(app).post('/sessao').set('Authorization', `Bearer ${await mockAccessToken()}`).send({//cria sessão a ser editada
      idSala:'1',
      title_movie:'In the Heights',
      description:'As luzes se acendem em Washington Heights... O cheirinho de um cafecito caliente paira no ar, na saída da estação de metrô da Rua 181, onde um caleidoscópio de sonhos mobiliza essa comunidade vibrante e muito unida.  No meio de tudo, temos o querido e magnético dono de uma mercearia, Usnavi (Anthony Ramos), que economiza cada centavo do seu dia de trabalho enquanto torce, imagina e canta sobre uma vida melhor.',
      data:'15/07/2021',
      inicio:'2021-07-15 00:15:32.133+00',
      duracao:'01:55'
    })
    await request(app)
    .delete('/sessao/1')
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  it('Should return 200 on success delete a sessao with all corrects values', async () => {
    const accessToken = await mockAccessToken()
    await request(app).post('/sessao').set('Authorization', `Bearer ${accessToken}`).send({//cria sessão a ser editada
      idSala:'1',
      title_movie:'In the Heights',
      description:'As luzes se acendem em Washington Heights... O cheirinho de um cafecito caliente paira no ar, na saída da estação de metrô da Rua 181, onde um caleidoscópio de sonhos mobiliza essa comunidade vibrante e muito unida.  No meio de tudo, temos o querido e magnético dono de uma mercearia, Usnavi (Anthony Ramos), que economiza cada centavo do seu dia de trabalho enquanto torce, imagina e canta sobre uma vida melhor.',
      data:'15/07/2021',
      inicio:'2021-07-15 00:15:32.133+00',
      duracao:'01:55'
    })
    await request(app)
    .delete('/sessao/1')
    .set('Authorization', `Bearer ${accessToken}`)
    .then(response => {
      expect(response.statusCode).toBe(200)
    });
  })

  /* GET */
  it('Should return 401 if try get all sessao without accessToken', async () => {
    await request(app).post('/sessao').set('Authorization', `Bearer ${await mockAccessToken()}`).send({//cria sessão a ser editada
      idSala:'1',
      title_movie:'In the Heights',
      description:'As luzes se acendem em Washington Heights... O cheirinho de um cafecito caliente paira no ar, na saída da estação de metrô da Rua 181, onde um caleidoscópio de sonhos mobiliza essa comunidade vibrante e muito unida.  No meio de tudo, temos o querido e magnético dono de uma mercearia, Usnavi (Anthony Ramos), que economiza cada centavo do seu dia de trabalho enquanto torce, imagina e canta sobre uma vida melhor.',
      data:'15/07/2021',
      inicio:'2021-07-15 00:15:32.133+00',
      duracao:'01:55'
    })
    await request(app)
    .get('/sessao/-1')
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  it('Should return 200 on success get all sessao with all corrects values', async () => {
    const accessToken = await mockAccessToken()
    await request(app).post('/sessao').set('Authorization', `Bearer ${accessToken}`).send({//cria sessão a ser editada
      idSala:'1',
      title_movie:'In the Heights',
      description:'As luzes se acendem em Washington Heights... O cheirinho de um cafecito caliente paira no ar, na saída da estação de metrô da Rua 181, onde um caleidoscópio de sonhos mobiliza essa comunidade vibrante e muito unida.  No meio de tudo, temos o querido e magnético dono de uma mercearia, Usnavi (Anthony Ramos), que economiza cada centavo do seu dia de trabalho enquanto torce, imagina e canta sobre uma vida melhor.',
      data:'15/07/2021',
      inicio:'2021-07-15 00:15:32.133+00',
      duracao:'01:55'
    })
    await request(app)
    .get('/sessao/-1')
    .set('Authorization', `Bearer ${accessToken}`)
    .then(response => {
      expect(response.statusCode).toBe(200)
    });
  })

  it('Should return 401 if try get sessao without accessToken', async () => {
    await request(app).post('/sessao').set('Authorization', `Bearer ${await mockAccessToken()}`).send({//cria sessão a ser editada
      idSala:'1',
      title_movie:'In the Heights',
      description:'As luzes se acendem em Washington Heights... O cheirinho de um cafecito caliente paira no ar, na saída da estação de metrô da Rua 181, onde um caleidoscópio de sonhos mobiliza essa comunidade vibrante e muito unida.  No meio de tudo, temos o querido e magnético dono de uma mercearia, Usnavi (Anthony Ramos), que economiza cada centavo do seu dia de trabalho enquanto torce, imagina e canta sobre uma vida melhor.',
      data:'15/07/2021',
      inicio:'2021-07-15 00:15:32.133+00',
      duracao:'01:55'
    })
    await request(app)
    .get('/sessao/1')
    .then(response => {
      expect(response.statusCode).toBe(401)
    });
  })

  it('Should return 200 on success get sessao with all corrects values', async () => {
    const accessToken = await mockAccessToken()
    await request(app).post('/sessao').set('Authorization', `Bearer ${accessToken}`).send({//cria sessão a ser editada
      idSala:'1',
      title_movie:'In the Heights',
      description:'As luzes se acendem em Washington Heights... O cheirinho de um cafecito caliente paira no ar, na saída da estação de metrô da Rua 181, onde um caleidoscópio de sonhos mobiliza essa comunidade vibrante e muito unida.  No meio de tudo, temos o querido e magnético dono de uma mercearia, Usnavi (Anthony Ramos), que economiza cada centavo do seu dia de trabalho enquanto torce, imagina e canta sobre uma vida melhor.',
      data:'15/07/2021',
      inicio:'2021-07-15 00:15:32.133+00',
      duracao:'01:55'
    })
    await request(app)
    .get('/sessao/1')
    .set('Authorization', `Bearer ${accessToken}`)
    .then(response => {
      expect(response.statusCode).toBe(200)
    });
  })
})