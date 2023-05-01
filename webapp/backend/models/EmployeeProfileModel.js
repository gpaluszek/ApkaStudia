import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";
import EmployeeAgreement from "./EmployeeAgreementModel.js";

const {DataTypes} = Sequelize;

const EmployeeProfile = db.define('employeeprofile',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

EmployeeProfile.hasMany(EmployeeAgreement, { foreignKey: 'userId' });

EmployeeProfile.belongsTo(User, { foreignKey: 'userId', unique: true });

export default EmployeeProfile;
