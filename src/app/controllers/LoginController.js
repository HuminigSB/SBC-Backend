import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth'
import User from '../models/User';

class LoginController{
    async store(req, res){
        const schema = Yup.object().shape({
            username: Yup.string().required(),
            password: Yup.string().required()
        });

        /* Verifico se a validação falhou */
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "A validação falhou!"})
        }
        
        const userExists = await User.findOne({where: {username: req.body.username}});

        /* Verifico se o usuário existe */
        if(!userExists){
            return res.status(400).json({erro: "Esse usuário não existe"});
        }

        /* verifico se a senha está correta */
        if(await userExists.checkPassword(req.body.password)){
            const {id, name, email, profile} = userExists.dataValues
            return res.json({
                user: {
                    id,
                    name,
                    email,
                    profile
                },
                token: jwt.sign({id}, authConfig.secret, {
                    expiresIn: authConfig.expiresIn
                })
            })
        }

        return res.status(400).json({erro: "Não foi possível fazer login com esse usuário/senha."});
    }

    async index(req, res){
        const schema = Yup.object().shape({
            id: Yup.string().required()
        });

        /* Verifico se a validação falhou */
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "A validação falhou!"})
        }

        const {id} = req.body
        const user = await User.findOne({ where: { id }})
        if(!user){
            return res.status(400).json({error: "Usuário não existe"})
        }
        return res.json({
            id, 
            name: user.name,
            cpf: user.cpf, 
            rg: user.rg, 
            email: user.email,
            number: user.number, 
            profile: user.profile, 
            username: user.username
        })
    }
}

export default new LoginController();
