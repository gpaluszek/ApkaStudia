import express from "express";
import {
    createContractGlobal,
    deleteContract
} from "../controllers/ContractController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.post('/contract',  createContractGlobal);
router.delete('/contract/delete/:id',  deleteContract);

export default router;