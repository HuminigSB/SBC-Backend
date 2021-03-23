import * as Yup from 'yup';

import Combo from '../models/Combo';

class ComboController{
    async index(req, res){
        const combos = await Combo
        .findAll({ 
            where: { 
                id_user: req.params.id 
            }
        })  
        return res.json(combos)
    }

    async store(req, res){
        /* Validar os campos */
        const schema = Yup.object().shape({
            id_user: Yup.number().required(),
            type: Yup.number().positive().required(),
            value: Yup.number()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "A validação falhou!"})
        }

        const { id_user, type } = req.body
   
        switch (type) {
            case "1":
                const combo_one = await Combo.create({
                    id_user,
                    type: "none",
                    value: "0.00"
                })
                return res.status(200).json(combo_one)
            case "2":
                const combo_two = await Combo.create({
                    id_user,
                    type: "popcorn",
                    value: "5.00"
                })
                return res.status(200).json(combo_two)
            case "3":
                const combo_three = await Combo.create({
                    id_user,
                    type: "drink",
                    value: "5.00"
                })
                return res.status(200).json(combo_three)
            case "4":
               const combo_four = await Combo.create({
                    id_user,
                    type: "popcorn + drink",
                    value: "8.00"
                })
                return res.status(200).json(combo_four)
            default:
                return res.status(400).json({error: "Erro ao adicionar o combo!"});
        }
    }
}

export default new ComboController();
