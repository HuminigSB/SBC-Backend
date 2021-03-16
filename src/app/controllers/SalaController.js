import * as Yup from 'yup'
import Sala from '../models/Sala';
import Poltrona from '../models/Poltrona'

class SalaController{
    async index(req, res){
        const sala = await Sala.findAll()
        return res.json(sala)
    }

    async store(req, res){
        /* Validar os campos */
        const {dataValues} = await Sala.create({
            total: 100
        })
        
        /* Criação da sala com todas poltronas */
        if(dataValues.id){
            for(let i = 1; i<=10; i++){
                for(let j = 1; j<=10; j++){
                    await Poltrona.create({
                        id_sala: dataValues.id, 
                        row: i,
                        column: j,
                        value: "7.00",
                        type: "economic",
                        active: true
                    })
                }
            }
            return res.status(200).json({success: "Sala criada com sucesso!"})
        }
        return res.status(400).json({error: "Falha na criação da sala!"})
    }

    async delete(req, res){
         /* Validar os campos */
         const schema = Yup.object().shape({
            id: Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "A validação falhou!"})
        }

        const salaDelete = await Sala.findByPk(req.body.id)

        /* Verifico se a poltrona existe ou não */
        if(!salaDelete){
            return res.status(400).json({error: 'A poltrona não existe'})
        }

        /* Faço a deleção de todas as poltronas relacionados a essa sala */
        const salaDeleted = await salaDelete.destroy();
        const poltronasDeleted = await Poltrona.destroy({ where: { id_sala: req.body.id }})
        if(poltronasDeleted && salaDeleted){
            return res.status(200).json({success: "Sala deletada com sucesso!"})
        }
        return res.status(400).json({success: "Erro ao deletar a sala!"})
    }
}

export default new SalaController();
