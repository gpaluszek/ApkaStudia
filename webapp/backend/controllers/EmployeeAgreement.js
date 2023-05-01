import EmployeeAgreement from "../models/EmployeeAgreementModel.js";
import EmployeeProfile from "../models/EmployeeProfileModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize"; //OPERATOR

export const getAgreement = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await EmployeeAgreement.findAll({
                attributes: ['uuid','startContract', 'endContract','position','typeContract'],
            });
        }else{
            response = await EmployeeAgreement.findAll({
                attributes: ['uuid','startContract', 'endContract','position','typeContract'],
                where: {
                    userId: req.userId
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const getAgreementById = async(req, res) =>{
    try {
        const employeeAgreement = await EmployeeAgreement.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!employeeAgreement) return res.status(404).json({msg: "Nie znaleziono danych"});
        let response;
        if(req.role === "admin"){
            response = await EmployeeAgreement.findOne({
                attributes: ['uuid','startContract', 'endContract','position','typeContract'],
                where: {
                    id: employeeAgreement.id
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }else{
            response = await EmployeeAgreement.findOne({
                attributes: ['uuid','name', 'price'],
                where: {
                    [Op.and]:[{id: employeeAgreement.id},{userId: req.userId}]  
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
export const createAgreement = async(req, res) =>{
    const {startContract, endContract, position, typeContract} = req.body;
    try {
        await EmployeeAgreement.create({
            startContract: startContract,
            endContract: endContract,
            position: position,
            typeContract: typeContract

            
        });
        res.status(201).json({msg: "Produkt został pomyślnie utworzony"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
    
}
export const updateAgreement = async(req, res) =>{
    try {
        const employeeagreement = await EmployeeAgreement.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!employeeagreement) return res.status(404).json({msg: "Nie znaleziono danych"});
        const {name, price} = req.body;
        if(req.role === "admin"){
           await EmployeeAgreement.update({name, price},{
            where: {
                id: employeeagreement.id
            }
           });
        }else{
            if(req.userId !== employeeagreement.userId) return res.status(403).json({msg: "Odmowa dostępu"})
            await EmployeeAgreement.update({name, price},{
                where: {
                    where: {
                        [Op.and]:[{id: employeeagreement.id},{userId: req.userId}]  
                    }
                }
               });
        }
        res.status(200).json({msg: "Produkt został pomyślnie zaktualizowany"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const deleteAgreement = async(req, res) =>{
    try {
        const employeeagreement = await EmployeeAgreement.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!employeeagreement) return res.status(404).json({msg: "Nie znaleziono danych"});
        const {name, price} = req.body;
        if(req.role === "admin"){
            await EmployeeAgreement.destroy({
                where:{
                    id: product.id
                }
            });
        }else{
            if(req.userId !== employeeagreement.userId) return res.status(403).json({msg: "Odmowa dostępu"});
            await EmployeeAgreement.destroy({
                where:{
                    [Op.and]:[{id: employeeagreement.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Produkt został pomyślnie usunięty"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}