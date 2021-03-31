import Bilhete from '../models/Bilhete';
import * as Yup from 'yup';

class BilheteController{
    async index(req, res){
        const bilhetes = await Bilhete.findAll({where: {id_sessao: req.params.id_sessao},order: [['id', 'ASC']]})
        return res.json(bilhetes)
    }

    async store(req, res){
        const schema = Yup.object().shape({
            id_sessao: Yup.number().required().positive().integer(),
            id_sala: Yup.number().required().positive().integer(),
            id_poltrona: Yup.number().required().positive().integer()
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "Falha na Transmição de Dados"})
        }
        const {id_sessao, id_sala, id_poltrona} = req.body
        const data = {id_sessao, id_sala, id_poltrona, reservado: false}
        await Bilhete.create(data);

        return res.status(200).json({sucesso: "Bilhete Criado"})
    }

    async update(req, res){
        const schema = Yup.object().shape({
            id: Yup.number().required().positive().integer(),
            reservado: Yup.boolean().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "Verifique se todos os campos foram informados"})
        }
        const {id, reservado} = req.body
        const bilheteEdit = await Bilhete.findByPk(id)

        if(!bilheteEdit){
            return res.status(400).json({error: 'O bilhete não existe'})
        }
        
        await bilheteEdit.update({reservado});

        return res.status(200).json({success: "Bilhete atualizado com sucesso"});
    }

    async delete(req, res){
        
    }
}

export default new BilheteController();
