import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const alunoRouter = Router();
const prismaClient = new PrismaClient();
const alunoClient = prismaClient.aluno;

alunoRouter.get("/", async (_, res) => {
    try {
        const allAlunos = alunoClient.findMany();
        res.json(allAlunos);
    } catch (err) {
        res.status(500).send(err);
    }
});

alunoRouter.post("/", async (req, res) => {
    try {
        const [pessoa, fichaalimentar] = await Promise.all([
            req.body.idpessoa ||
                prismaClient.pessoa.create({
                    data: req.body.pessoa,
                }),
            req.body.idfichaalimentar ||
                prismaClient.fichaalimentar.create({
                    data: req.body.fichaalimentar,
                }),
        ]);

        const newAluno = await alunoClient.create({
            data: {
                idpessoa: pessoa.id,
                matricula: req.body.matricula,
                idresponsavel: req.body.idresponsavel,
                parentescoresponsavel: req.body.parentescoresponsavel,
                idfichaalimentar: fichaalimentar.id,
            },
        });
        res.json(newAluno);
    } catch (err) {
        res.status(500).send(err);
    }
});

alunoRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const aluno = await alunoClient.findUnique({
            where: { id: Number(id) },
        });
        res.json(aluno);
    } catch (err) {
        res.status(500).send(err);
    }
});

alunoRouter.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedAluno = await alunoClient.update({
            where: { id: Number(id) },
            data: req.body,
        });
        res.json(updatedAluno);
    } catch (err) {
        res.status(500).send(err);
    }
});

alunoRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedAluno = await alunoClient.delete({
            where: { id: Number(id) },
        });
        res.json(deletedAluno);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default alunoRouter;
