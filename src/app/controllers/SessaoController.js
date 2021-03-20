import * as Yup from 'yup'

import Sessao from '../models/Sessao';
import Bilhete from '../models/Bilhete';
import Poltrona from '../models/Poltrona'

class SessaoController{
    async index(req, res){

    }

    async store(req, res){
        const schema = Yup.object().shape({
            idSala: Yup.number().required().positive().integer(),
            title_movie: Yup.string().required(),
            description: Yup.string().required(),
            data: Yup.string().required(),
            inicio: Yup.string().required(),
            fim: Yup.string().required()
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "Falha na Transmição de Dados"})
        }
        const dataSessao = await Sessao.create(req.body)
        if(dataSessao.id){
            const poltronas = await Poltrona.findAll({where: {id_sala: dataSessao.idSala},order: [['id', 'ASC']]})
            for(let i = 0; i < poltronas.length; i = i + 1 ) {
                await Bilhete.create({id_sessao: dataSessao.id, id_sala: dataSessao.idSala, id_poltrona: poltronas[i].id, reservado: false});
            }
            return res.status(200).json({sucesso: "Sessão criada"})
        }
        return res.status(400).json({sucesso: "Falha na criação da sessão"})
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
        
    }
}

export default new SessaoController();
