import Bilhete from '../models/Bilhete';
import * as Yup from 'yup';

class BilheteController{
    async index(req, res){
  
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
        const data = {id_sessao: req.body.id_sessao, id_sala: req.body.id_sala, id_poltrona: req.body.id_poltrona, reservado: false}
        await Bilhete.create(data);

        return res.status(200).json({sucesso: "Bilhete Criado"})
    }

    async update(req, res){

    }

    async delete(req, res){
        
    }
}

export default new BilheteController();
