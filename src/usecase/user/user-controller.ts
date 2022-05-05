import { Request, Response } from 'express';
import { userUseCase } from './user-usecase';

class UserController{

    async createUser(req:Request , res : Response){
        try{
            const { user } = req.body;
            const operation = user.id ? "edit" : "insert";
            const returnUseCase = await userUseCase.createUser(user , operation);
            return (operation === "edit" ? 
            res.send({success : true, message : "Usuário Editado com Sucesso!" , id: returnUseCase }) : 
            res.send({success : true, message : "Usuário Criado com Sucesso!", id: returnUseCase }));
        }
        catch(err) {
            console.log('[ERROR] => ', err);
            return res.status(500).json({success: false, message : err, dateNow : new Date().toLocaleString('pt-br')})
        }
    }

} 

export const userController = new UserController();