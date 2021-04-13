import * as Yup from 'yup'
import Validator from 'cpf-rg-validator'

import User from '../models/User';

class UserController{
    async index(req, res){
        const users = await User.findAll()
        return res.json(users)
    }

    async store(req, res){
        /* Validar os campos */
        const schema = Yup.object().shape({
            name: Yup.string().matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).required(),
            email: Yup.string().email().required(),
            cpf: Yup.string().required(),
            rg: Yup.string().required(),
            phone: Yup.string(),
            number: Yup.string().matches(/^[0-9]*$/),
            profile: Yup.string(),
            username: Yup.string().required(),
            password: Yup.string().required().min(6)
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "A validação falhou, lembre-se os campos são obrigatórios e a senha precisa ter no minimo 6 digitos."})
        }

        /* Validar se é um cpf válido*/
        const isCpf = Validator.cpf(req.body.cpf);

        if(!isCpf){
            return res.status(400).json({error: "Esse não é um cpf válido"});
        }

        /* Validar se é um rg válido*/
        const isRg = Validator.rg(req.body.rg)

        if(!isRg){
            return res.status(400).json({error: "Esse não é um rg válido"});
        }

        /* Validar se o cpf já está em uso*/
        const userCpfExists = await User.findOne({where: {cpf: req.body.cpf}});

        if(userCpfExists){
            return res.status(400).json({error: "Esse cpf já está em uso"});
        }

        /* Validar se o e-mail já está em uso*/
        const userEmailExists = await User.findOne({where: {email: req.body.email}});

        if(userEmailExists){
            return res.status(400).json({error: "Esse e-mail já está em uso"});
        }

        /* Validar se o nome de usuário já está em uso*/
        const userNameExists = await User.findOne({where: {username: req.body.username}});

        if(userNameExists){
            return res.status(400).json({error: "Esse nome de usuário já está em uso"});
        }

        await User.create(req.body);
        return res.status(200).json({sucesso: "Deu tudo certo"})
    }

    async update(req, res){
        /* Validar os campos */
        const schema = Yup.object().shape({
            name: Yup.string().matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).required(),
            email: Yup.string().email().required(),
            cpf: Yup.string().required(),
            rg: Yup.string().required(),
            phone: Yup.string(),
            number: Yup.string().matches(/^[0-9]*$/)
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "A validação falhou, lembre-se os campos são obrigatórios e a senha precisa ter no minimo 6 digitos."})
        }

        const userEdit = await User.findByPk(req.params.id)

        /* Verifico se o usuário existe ou não */
        if(!userEdit){
            return res.status(400).json({error: 'O usuário não existe'})
        }

        const { email, username } = req.body

        /* Verificar se o e-mail está em uso */
        if(email && email !== userEdit.email){
            const userExists = await User.findOne({where: {email}})
            if(userExists){
                return res.status(400).json({error: "O e-mail já está em uso"})
            }
        }

        /* Verificar se o username está em uso */
        if(username && username !== userEdit.username){
            const userExists = await User.findOne({where: {username}})
            if(userExists){
                return res.status(400).json({error: "O nome de usuário já está em uso"})
            }
        }

        /* Verificar se o cpf está em uso */
        if(req.body.cpf && req.body.cpf !== userEdit.cpf){
            const userExists = await User.findOne({where: { cpf: req.body.cpf }})
            if(userExists){
                return res.status(400).json({error: "O cpf já está em uso"})
            }
        }

        /* Verifico se o cpf é válido */
        if(req.body.cpf && req.body.cpf !== userEdit.cpf){
            const isValid = Validator.cpf(req.body.cpf)
            if(!isValid){
                return res.status(400).json({error: "O cpf é inválido"})
            }
        }

        /* Verifico se o rg é válido */
        if(req.body.rg && req.body.rg !== userEdit.rg){
            const isValid = Validator.rg(req.body.rg)
            if(!isValid){
                return res.status(400).json({error: "O rg é inválido"})
            }
        }

        const userEdited = await userEdit.update(req.body);

        if(!userEdited){
            return res.status(400).json({error: "Usuário não atualizado, tente novamente."});
        }

        return res.status(200).json({success: "Usuário atualizado com sucesso"});
    }

    async delete(req, res){
        const userEdit = await User.findByPk(req.body.id)
        if(!userEdit){
            return res.status(400).json({error: 'O usuário não existe'})
        }
        await userEdit.destroy()
        return res.status(200).json({ success: `O usuário com id ${req.body.id} foi removido com sucesso.`})
    }
}

export default new UserController();