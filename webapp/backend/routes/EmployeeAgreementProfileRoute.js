import express from "express";
import {
    getEmployeeProfile,
    getEmployeeProfileById,
    createEmployeeProfile,
    updateEmployeeProfile,
    deleteEmployeeProfile
} from "../controllers/EmployeeProfile.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/employee',verifyUser, getEmployeeProfile);
router.get('/employee/:id',verifyUser, getEmployeeProfileById);
router.post('/employee', createEmployeeProfile);
router.patch('/employee/:id',verifyUser, updateEmployeeProfile);
router.delete('/employee/:id',verifyUser, deleteEmployeeProfile);

export default router;