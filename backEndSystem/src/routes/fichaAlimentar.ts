import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const fichaalimentarRouter = Router();
const prismaClient = new PrismaClient();
const fichaAlimentarClient = prismaClient.fichaalimentar;

fichaalimentarRouter.get("/", async (_, res) => {
    try {
        const allFichasAlimentares = await fichaAlimentarClient.findMany();
        res.json(allFichasAlimentares);
    } catch (err) {
        res.status(500).send(err);
    }
});

fichaalimentarRouter.get("/log", async (_, res) => {
    try{
        const allLogsFichaAlimentar = await prismaClient.fichaalimentarlog.findMany();
        res.json(allLogsFichaAlimentar);
    } catch (err) {
        res.status(500).send(err);
    }
});

fichaalimentarRouter.post("/", async (req, res) => {
    try {
        const newFichaAlimentar = await fichaAlimentarClient.create({
            data: {
                observacao: req.body.observacao,
            },
        });
        res.json(newFichaAlimentar);
    } catch (err) {
        res.status(500).send(err);
    }
});

fichaalimentarRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const fichaAlimentar = await fichaAlimentarClient.findUnique({
            where: { id: Number(id) },
        });
        res.json(fichaAlimentar);
    } catch (err) {
        res.status(500).send(err);
    }
});

fichaalimentarRouter.get("/:id/log", async (req, res) => {
    try {
        const id = req.params.id;
        const fichaAlimentar = await prismaClient.fichaalimentarlog.findMany({
            where: { idfichaalimentar: Number(id) },
        });
        res.json(fichaAlimentar);
    } catch (err) {
        res.status(500).send(err);
    }
});

fichaalimentarRouter.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedFichaAlimentar = await fichaAlimentarClient.update({
            where: { id: Number(id) },
            data: req.body,
        });
        res.json(updatedFichaAlimentar);
    } catch (err) {
        res.status(500).send(err);
    }
});

fichaalimentarRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedFichaAlimentar = await fichaAlimentarClient.delete({
            where: { id: Number(id) },
        });
        res.json(deletedFichaAlimentar);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default fichaalimentarRouter;
