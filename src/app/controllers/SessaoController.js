import * as Yup from 'yup';
import {add, isAfter, parseISO, isEqual} from 'date-fns'

import Sessao from '../models/Sessao';
import Bilhete from '../models/Bilhete';
import Poltrona from '../models/Poltrona'
import Observable from '../observer/Observable';

class SessaoController extends Observable{
    async index(req, res){
        console.log(req.params.id == -1)
        if(req.params.id == -1){
            const sessoes = await Sessao.findAll()
            return res.json(sessoes)
        }
        const sessao = await Sessao.findByPk(req.params.id)
        return res.json(sessao)
    }

    async store(req, res){
        const schema = Yup.object().shape({
            idSala: Yup.number().required().positive().integer(),
            title_movie: Yup.string().required(),
            description: Yup.string().required(),
            data: Yup.string().required(),
            inicio: Yup.date().required(),
            duracao: Yup.string().required()
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "Falha na Transmição de Dados"})
        }
        const {inicio, duracao, idSala, data} = req.body
        const duracaoInserir = duracao.split(":")
        const fim = add(parseISO(inicio), {hours: duracaoInserir[0], minutes: duracaoInserir[1]})
        const sessoes = await Sessao.findAll({where: {id_sala: idSala, data: data}})
        let taOk = true
        sessoes.forEach(sessao=>{
            const duracaoSessao = sessao.dataValues.duracao.split(":")
            if(isAfter(fim,sessao.dataValues.inicio) && isAfter(add(sessao.dataValues.inicio, {hours: duracaoSessao[0], minutes: duracaoSessao[1]}),fim)){
                taOk=false
            }
            if(isAfter(parseISO(inicio),sessao.dataValues.inicio) && isAfter(add(sessao.dataValues.inicio, {hours: duracaoSessao[0], minutes: duracaoSessao[1]}),parseISO(inicio))){
                taOk=false
            }
            if(isEqual(parseISO(inicio), sessao.dataValues.inicio)){
                taOk=false
            }
            if(isEqual(fim,add(sessao.dataValues.inicio, {hours: duracaoSessao[0], minutes: duracaoSessao[1]}))){
                taOk=false
            }
        })
        if(!taOk){
            return res.status(400).json({error: "Esta sala esta ocupada nesse horario"})
        }
        const dataSessao = await Sessao.create(req.body)        
        if(!dataSessao.id){
            return res.status(400).json({error: "Falha na criação da sessão"})
        }
        const poltronas = await Poltrona.findAll({where: {id_sala: dataSessao.idSala},order: [['id', 'ASC']]})
        for(let i = 0; i < poltronas.length; i = i + 1 ) {
            await Bilhete.create({id_sessao: dataSessao.id, id_sala: dataSessao.idSala, id_poltrona: poltronas[i].id, reservado: false});
        }
        return res.status(200).json({sucesso: "Sessão criada"})
    }

    async update(req, res){
        const schema = Yup.object().shape({
            title_movie: Yup.string().required(),
            description: Yup.string().required(),
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "Falha na Transmição de Dados"})
        }
        const sessaoEditar = await Sessao.findByPk(req.params.id)
        if(!sessaoEditar){
            return res.status(400).json({error: 'Sessão não encontrada'})
        }
        const sessaoEditada = await sessaoEditar.update(req.body);

        if(!sessaoEditada){
            return res.status(400).json({error: "Erro ao editar sessão tente novamente"});
        }

        return res.status(200).json({success: "Sessão editada com sucesso"});
    }

    async delete(req, res){
        const bilhetes = await Bilhete.findAll({where: {id_sessao: req.params.id},order: [['id', 'ASC']]})
        await super.subscribe(bilhetes)

        const sessaoDelete = await Sessao.findByPk(req.params.id)
        if(!sessaoDelete){
            return res.status(400).json({error: 'A sessão não existe'})
        }
        const sessaoDeleted = await sessaoDelete.destroy();
        if(sessaoDeleted){
            await super.notify()  
            bilhetes.forEach(bilhete =>{
                super.unsubscribe(bilhete)
            })
            return res.status(200).json({success: "Sessão deletada com sucesso!"})
        } 
          
        return res.status(400).json({success: "Erro ao deletar a sessão!"})
    }
}

export default new SessaoController();
