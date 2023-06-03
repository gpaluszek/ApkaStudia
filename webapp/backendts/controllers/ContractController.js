import {PrismaClient} from "@prisma/client";
import { DateTime } from 'luxon';
const prisma = new PrismaClient();


export const createContractGlobal = async (req, res) => {
    const { startContract, endContract, position, typeContract, profileId } = req.body;
  
    try {
      const startContractDate = DateTime.fromISO(startContract).startOf('day').toJSDate();
      const endContractDate = DateTime.fromISO(endContract).startOf('day').toJSDate();
  
      const contract = await prisma.contract.create({
        data: {
          startContract: startContractDate,
          endContract: endContractDate,
          position: position,
          typeContract: typeContract,
          profileId: profileId,
        },
      });
  
      res.status(201).json(contract);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };

  export const deleteContract = async (req, res) => {
    const uid = parseInt(req.params.id);
    const contract = await prisma.contract.findUnique({
      where: {
        id: uid,
      },
    });
    if (!contract) return res.status(404).json({ msg: "Nie znaleziono umowy" });
    try {
      await prisma.contract.delete({
        where: {
          id: uid,
        },
      });
      res.status(200).json({ msg: "Kontrakt usunięty" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
  
  
  