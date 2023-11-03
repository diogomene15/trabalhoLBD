import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const ingredienteRouter = Router();
const prismaClient = new PrismaClient();
const ingredienteClient = prismaClient.ingrediente;

ingredienteRouter.get("/", async (req, res) => {
    try {
        const allIngredientes = ingredienteClient.findMany();
        res.json(allIngredientes);
    } catch (err) {
        res.status(500).send(err);
    }
});

ingredienteRouter.post("/", async (req, res) => {
    try {
        const ingrediente = req.body;
        const newIngrediente = ingredienteClient.create({
            data: ingrediente,
        });
        res.json(newIngrediente);
    } catch (err) {
        res.status(500).send(err);
    }
});

ingredienteRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const ingrediente = ingredienteClient.findUnique({
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
        const updatedIngrediente = ingredienteClient.update({
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
        const deletedIngrediente = ingredienteClient.delete({
            where: { id: Number(id) },
        });
        res.json(deletedIngrediente);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default ingredienteRouter;
