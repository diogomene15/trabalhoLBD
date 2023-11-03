import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const ingredienteRouter = Router();
const prismaClient = new PrismaClient();
const ingredienteClient = prismaClient.ingrediente;

ingredienteRouter.get("/", async (_, res) => {
    try {
        const allIngredientes = await ingredienteClient.findMany();
        res.json(allIngredientes);
    } catch (err) {
        res.status(500).send(err);
    }
});

ingredienteRouter.post("/", async (req, res) => {
    try {
        const ingrediente = req.body;
        const newIngrediente = await ingredienteClient.create({
            data: {
                nome: ingrediente.nome,
                descricao: ingrediente.descricao
            }
        });
        res.json(newIngrediente);
    } catch (err) {
        res.status(500).send(err);
    }
});

ingredienteRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const ingrediente = await ingredienteClient.findUnique({
            where: { id: Number(id) },
        });
        res.json(ingrediente);
    } catch (err) {
        res.status(500).send(err);
    }
});

ingredienteRouter.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const ingrediente = req.body;
        const updatedIngrediente = await ingredienteClient.update({
            where: { id: Number(id) },
            data: ingrediente,
        });
        res.json(updatedIngrediente);
    } catch (err) {
        res.status(500).send(err);
    }
});

ingredienteRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedIngrediente = await ingredienteClient.delete({
            where: { id: Number(id) },
        });
        res.json(deletedIngrediente);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default ingredienteRouter;
