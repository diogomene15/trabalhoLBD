import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const turmaRouter = Router();
const prismaClient = new PrismaClient();
const turmaClient = prismaClient.turma;

turmaRouter.get("/", async (_, res) => {
    try {
        const allTurmas = turmaClient.findMany();
        res.json(allTurmas);
    } catch (err) {
        res.status(500).send(err);
    }
});

turmaRouter.post("/", async (req, res) => {
    try {
        const turma = req.body;
        const newTurma = turmaClient.create({
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
        const turma = turmaClient.findUnique({
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
        const updatedTurma = turmaClient.update({
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
        const deletedTurma = turmaClient.delete({
            where: { id: Number(id) },
        });
        res.json(deletedTurma);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default turmaRouter;
