import express from "express";
import {
    getAgreement,
    getAgreementById,
    createAgreement,
    updateAgreement,
    deleteAgreement
} from "../controllers/EmployeeAgreement.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/agreement',verifyUser, getAgreement);
router.get('/agreement/:id',verifyUser, getAgreementById);
router.post('/agreement',verifyUser, createAgreement);
router.patch('/agreement/:id',verifyUser, updateAgreement);
router.delete('/agreement/:id',verifyUser, deleteAgreement);

export default router;