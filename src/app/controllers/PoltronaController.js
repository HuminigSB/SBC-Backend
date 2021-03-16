import * as Yup from 'yup'
import Poltrona from '../models/Poltrona';

class PoltronaController{
    async index(req, res){
        const poltronas = await Poltrona.findAll()
        return res.json(poltronas)
    }

    async store(req, res){
        /* Validar os campos */
        const schema = Yup.object().shape({
            id_sala: Yup.number().positive().required(),
            row: Yup.number().required(),
            column: Yup.number().required(),
            type: Yup.number().positive().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "A validação falhou!"})
        }

        const { id_sala, row, column, type } = req.body

        switch (type) {
            case 1:
                const poltrona1 = await Poltrona.create({
                    id_sala, 
                    row,
                    column,
                    value: "7.00", 
                    type: 'economic'
                })
                if(poltrona1){
                    return res.status(200).json({error: 'Poltrona criada com sucesso!'})
                }
                return res.status(400).json({error: 'Erro ao criar a poltrona'})
            case 2:
                const poltrona2 = await Poltrona.create({
                    id_sala, 
                    row,
                    column,
                    value: "15.00", 
                    type: 'vip'
                })
                if(poltrona2){
                    return res.status(200).json({error: 'Poltrona criada com sucesso!'})
                }
                return res.status(400).json({error: 'Erro ao criar a poltrona'})
            case 3:
                const poltrona3 = await Poltrona.create({
                    id_sala, 
                    row,
                    column,
                    value: "20.00", 
                    type: 'doble'
                })
                if(poltrona3){
                    return res.status(200).json({error: 'Poltrona criada com sucesso!'})
                }
                return res.status(400).json({error: 'Erro ao criar a poltrona'})
            case 4:
                const poltrona4 = await Poltrona.create({
                    id_sala, 
                    row,
                    column,
                    value: "5.00", 
                    type: 'wheelchair'
                })
                if(poltrona4){
                    return res.status(200).json({error: 'Poltrona criada com sucesso!'})
                }
                return res.status(400).json({error: 'Erro ao criar a poltrona'})
            default:
                return res.status(400).json({error: 'Tipo inválido'})
        }
    }

    async update(req, res){
        /* Validar os campos */
        const schema = Yup.object().shape({
            type: Yup.string().required(),
            value: Yup.string().required(),
            active: Yup.boolean()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "A validação falhou!"})
        }

        const poltronaEdit = await Poltrona.findByPk(req.params.id)

        /* Verifico se a poltrona existe ou não */
        if(!poltronaEdit){
            return res.status(400).json({error: 'A poltrona não existe'})
        }

        const poltronaEdited = await poltronaEdit.update(req.body);

        if(!poltronaEdited){
            return res.status(400).json({error: "Poltrona não atualizada, tente novamente."});
        }

        return res.status(200).json({success: "Poltrona atualizada com sucesso"});
    }

    async delete(req, res){
        /* Validar os campos */
        const schema = Yup.object().shape({
            active: Yup.boolean().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "A validação falhou!"})
        }

        const poltronaDelete = await Poltrona.findByPk(req.params.id)

        /* Verifico se a poltrona existe ou não */
        if(!poltronaDelete){
            return res.status(400).json({error: 'A poltrona não existe'})
        }

        /* Faço a deleção lógica da poltrona */
        const poltronaDeleted = await poltronaDelete.update(req.body);

        if(!poltronaDeleted){
            return res.status(400).json({error: "Poltrona não atualizada, tente novamente."});
        }

        return res.status(200).json({success: "Poltrona deletada com sucesso"});
    }
}

export default new PoltronaController();
