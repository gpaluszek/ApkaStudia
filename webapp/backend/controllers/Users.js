
import User from "../models/UserModel.js";
import EmployeeProfile from "../models/EmployeeProfileModel.js";
import EmployeeAgreement from "../models/EmployeeAgreementModel.js";

import argon2 from "argon2";

export const getUsers = async(req, res) =>{
    try {
        const response = await User.findAll({
            attributes:['uuid','name', 'surname', 'street', 'houseNumber', 'city', 'postCode', 'sex', 'phoneNumber', 'email', 'role', 'status'],
            include: [
                {
                  model: EmployeeProfile,
                  include: [EmployeeAgreement],
                },
              ],

              raw: true
            });
        res.status(200).json(response);
        console.log;
    }catch (error) {
        res.status(500).json({msg: error.messages});
    }
}


export const getUserById = async(req, res) =>{
        try {
            const response = await User.findOne({
                attributes:['uuid','name', 'surname', 'street', 'houseNumber', 'city', 'postCode', 'sex', 'phoneNumber', 'email', 'role', 'status'],
                where: {
                    uuid: req.params.id
                },
                include: [
                    {
                      model: EmployeeProfile,
                      include: [EmployeeAgreement],
                    },
                  ],
    
                  raw: true
                });
            res.status(200).json(response);
            console.log;
        }catch (error) {
            res.status(500).json({msg: error.messages});
        }
    }

    

export const createUser = async(req, res) =>{
    const {name, surname, street, houseNumber, city, postCode, sex, phoneNumber, email, role, status, password, confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Hasło i potwierdzenie hasła nie pasują do siebie"})
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
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
            password: hashPassword
        });
        res.status(201).json({msg: "Rejestracja zakończona powodzeniem"});
    }catch (error) {
        res.status(400).json({msg: error.message});
    }
}


export const updateUser = async(req, res) =>{
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
export const deleteUser = async(req, res) =>{
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





















// import User from "../models/UserModel.js";
// import EmployeeAgreement from "../models/EmployeeAgreementModel.js";
// import argon2 from "argon2";
// import {Op} from "sequelize"; 

// export const getUsers = async(req, res) =>{
//     try {
//         const response = await User.findAll({
//             attributes:['uuid','name', 'surname', 'street', 'houseNumber', 'city', 'postCode', 'sex', 'phoneNumber', 'email', 'role', 'status'],
//             include: [{
//                 model: EmployeeAgreement,
//                 attributes: ['startContract', 'endContract','position','typeContract']
//             }]
//         });
//         res.status(200).json(response);
//     }catch (error) {
//         res.status(500).json({msg: error.messages});
//     }
// }


// export const getUserById = async(req, res) =>{
//     try {
//         const response = await User.findOne({
//             attributes:['uuid','name', 'surname', 'street', 'houseNumber', 'city', 'postCode', 'sex', 'phoneNumber', 'email', 'role', 'status'],
//             where: {
//                 uuid: req.params.id
//             },
//             include: [{
//                 model: EmployeeAgreement,
//                 attributes: ['startContract', 'endContract','position','typeContract']
//             }]
//         });
//         res.status(200).json(response);
//     }catch (error) {
//         res.status(500).json({msg: error.messages});
//     }
// }


// export const createUser = async(req, res) =>{
//     const {name, surname, street, houseNumber, city, postCode, sex, phoneNumber, email, role, status, password, confPassword,employeeAgreementUuid} = req.body;
//     if(password !== confPassword) return res.status(400).json({msg: "Hasło i potwierdzenie hasła nie pasują do siebie"})
//     const hashPassword = await argon2.hash(password);
//     try {
//         const employeeAgreement = await EmployeeAgreement.findOne({
//             where: {
//                 uuid: employeeAgreementUuid
//             }
//         });
//         if (!employeeAgreement) {
//             return res.status(404).json({ msg: "Nie znaleziono umowy o pracę" });
//         }
//         await User.create({
//             name: name,
//             surname: surname,
//             street: street,
//             houseNumber:houseNumber,
//             city:city,
//             postCode:postCode,
//             sex: sex,
//             phoneNumber:phoneNumber,
//             email: email,
//             role: role,
//             status: status,
//             password: hashPassword,
//             EmployeeAgreementId: employeeAgreement.id // Ustawienie relacji między użytkownikiem a umową o pracę
//         });
//         res.status(201).json({msg: "Rejestracja zakończona powodzeniem"});
//     }catch (error) {
//         res.status(400).json({msg: error.message});
//     }
// }


// export const updateUser = async(req, res) =>{
//     const user = await User.findOne({
//         where: {
//             uuid: req.params.id
//         }
//     });
//     if(!user) return res.status(404).json({msg: "Nie znaleziono użytkownika"});
//     const {name, surname, street, houseNumber, city, postCode, sex, phoneNumber, email, role, status, password, confPassword} = req.body;
//     let hashPassword;
//     if(password === "" || password === null)
//     {
//         hashPassword = user.password
//     }else{
//         hashPassword = await argon2.hash(password);
//     }
//     if(password !== confPassword) return res.status(400).json({msg: "Hasło i potwierdzenie hasła nie pasują do siebie"})
//     try {
//         await User.update({
//             name: name,
//             surname: surname,
//             street: street,
//             houseNumber:houseNumber,
//             city:city,
//             postCode:postCode,
//             sex: sex,
//             phoneNumber:phoneNumber,
//             email: email,
//             role: role,
//             status: status,
//             password: hashPassword,
//         },{
//             where:{
//                 id: user.id
//             }
//         });
//         res.status(200).json({msg: "Użytkownik zaktualizowany"});
//     }catch (error) {
//         res.status(400).json({msg: error.message});
//     }
// }
// export const deleteUser = async(req, res) =>{
//     const user = await User.findOne({
//         where: {
//             uuid: req.params.id
//         }
//     });
//     if(!user) return res.status(404).json({msg: "Nie znaleziono użytkownika"});
//     try {
//         await User.destroy({
//             where:{
//                 id: user.id
//             }
//         });
//         res.status(200).json({msg: "Użytkownik usunięty"});
//     }catch (error) {
//         res.status(400).json({msg: error.message});
//     }
// }