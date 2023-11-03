import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const turmaRouter = Router();
const prismaClient = new PrismaClient();
const turmaClient = prismaClient.turma;

turmaRouter.get("/", async (_, res) => {
    try {
        const allTurmas = await turmaClient.findMany();
        res.json(allTurmas);
    } catch (err) {
        res.status(500).send(err);
    }
});

turmaRouter.post("/", async (req, res) => {
    try {
        const turma = req.body;
        const newTurma = await turmaClient.create({
            data: turma,
        });
        res.json(newTurma);
    } catch (err) {
        res.status(500).send(err);
    }
});

turmaRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const turma = await turmaClient.findUnique({
            where: { id: Number(id) },
        });
        res.json(turma);
    } catch (err) {
        res.status(500).send(err);
    }
});

turmaRouter.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const turma = req.body;
        const updatedTurma = await turmaClient.update({
            where: { id: Number(id) },
            data: turma,
        });
        res.json(updatedTurma);
    } catch (err) {
        res.status(500).send(err);
    }
});

turmaRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTurma = await turmaClient.delete({
            where: { id: Number(id) },
        });
        res.json(deletedTurma);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default turmaRouter;
