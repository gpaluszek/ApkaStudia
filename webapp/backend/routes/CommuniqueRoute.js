import express from "express";
import {
    getCommunique,
    getCommuniqueById,
    createCommunique,
    updateCommunique,
    deleteCommunique
} from "../controllers/Communique.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/communique',verifyUser, getCommunique);
router.get('/communique/:id',verifyUser, getCommuniqueById);
router.post('/communique',verifyUser, createCommunique);
router.patch('/communique/:id',verifyUser, updateCommunique);
router.delete('/communique/:id',verifyUser, deleteCommunique);

export default router;