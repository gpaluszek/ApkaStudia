
import User from "../models/UserModel.js";
import EmployeeProfile from "../models/EmployeeProfileModel.js";
import EmployeeAgreement from "../models/EmployeeAgreementModel.js";
import argon2 from "argon2";
import {Op} from "sequelize"; 

export const getEmployeeProfile = async(req, res) =>{
    try {
        const response = await User.findAll({
            attributes: ['uuid'],
            include: [{
                model: EmployeeProfile,
                include: [{
                    model: EmployeeAgreement,
                    attributes: ['id', 'startContract', 'endContract', 'position', 'typeContract']
                }]
            }]
        });
        
        res.status(200).json(response);
    }catch (error) {
        res.status(500).json({msg: error.messages});
    }
}


export const getEmployeeProfileById = async(req, res) =>{
    try {
        const response = await User.findOne({
            attributes:['uuid','name', 'surname', 'street', 'houseNumber', 'city', 'postCode', 'sex', 'phoneNumber', 'email', 'role', 'status'],
            where: {
                uuid: req.params.id
            },
            include: [{
                model: EmployeeAgreement,
                attributes: ['startContract', 'endContract','position','typeContract']
            }]
        });
        res.status(200).json(response);
    }catch (error) {
        res.status(500).json({msg: error.messages});
    }
}


export const createEmployeeProfile = async(req, res) =>{
    const {userId} = req.body;
    try {
        await EmployeeProfile.create({
            userId: userId
        });
        res.status(201).json({msg: "Rejestracja została pomyślnie utworzona"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
    
}


export const updateEmployeeProfile = async(req, res) =>{
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "Nie znaleziono użytkownika"});
    const {name, surname, street, houseNumber, city, postCode, sex, phoneNumber, email, role, status, password, confPassword} = req.body;
    let hashPassword;
    if(password === "" || password === null)
    {
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg: "Hasło i potwierdzenie hasła nie pasują do siebie"})
    try {
        await User.update({
            name: name,
            surname: surname,
            street: street,
            houseNumber:houseNumber,
            city:city,
            postCode:postCode,
            sex: sex,
            phoneNumber:phoneNumber,
            email: email,
            role: role,
            status: status,
            password: hashPassword,
        },{
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "Użytkownik zaktualizowany"});
    }catch (error) {
        res.status(400).json({msg: error.message});
    }
}
export const deleteEmployeeProfile = async(req, res) =>{
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "Nie znaleziono użytkownika"});
    try {
        await User.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "Użytkownik usunięty"});
    }catch (error) {
        res.status(400).json({msg: error.message});
    }
}