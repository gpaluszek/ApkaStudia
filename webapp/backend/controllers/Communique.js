import Communique from "../models/CommuniqueModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize"; //OPERATOR

export const getCommunique = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Communique.findAll({
                attributes: ['uuid','title', 'text'],
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }else{
            response = await Communique.findAll({
                attributes: ['uuid','title', 'text'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const getCommuniqueById = async(req, res) =>{
    try {
        const communique = await Communique.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!communique) return res.status(404).json({msg: "Nie znaleziono danych"});
        let response;
        if(req.role === "admin"){
            response = await Communique.findOne({
                attributes: ['uuid','title', 'text'],
                where: {
                    id: communique.id
                },
                include: [{
                    model: User,
                    attributes: ['name', 'surname']
                }]
            });
        }else{
            response = await Communique.findOne({
                attributes: ['uuid','title', 'text'],
                where: {
                    [Op.and]:[{id: communique.id},{userId: req.userId}]  
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const createCommunique = async(req, res) =>{
    const {title, text} = req.body;
    try {
        await Communique.create({
            title: title,
            text: text,
            userId: req.userId
        });
        res.status(201).json({msg: "Produkt został pomyślnie utworzony"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
    
}
export const updateCommunique = async(req, res) =>{
    try {
        const communique = await Communique.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!communique) return res.status(404).json({msg: "Nie znaleziono danych"});
        const {title, text} = req.body;
        if(req.role === "admin"){
           await Communique.update({title, text},{
            where: {
                id: communique.id
            }
           });
        }else{
            if(req.userId !== communique.userId) return res.status(403).json({msg: "Odmowa dostępu"})
            await Communique.update({title, text},{
                where: {
                    where: {
                        [Op.and]:[{id: communique.id},{userId: req.userId}]  
                    }
                }
               });
        }
        res.status(200).json({msg: "Produkt został pomyślnie zaktualizowany"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const deleteCommunique = async(req, res) =>{
    try {
        const communique = await Communique.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!communique) return res.status(404).json({msg: "Nie znaleziono danych"});
        const {title, text} = req.body;
        if(req.role === "admin"){
            await Communique.destroy({
                where:{
                    id: communique.id
                }
            });
        }else{
            if(req.userId !== communique.userId) return res.status(403).json({msg: "Odmowa dostępu"});
            await Communique.destroy({
                where:{
                    [Op.and]:[{id: communique.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Produkt został pomyślnie usunięty"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}