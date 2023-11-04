import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const enturmacaoRouter = Router();
const prismaClient = new PrismaClient();
const enturmacaoClient = prismaClient.enturmacao;

enturmacaoRouter.get("/", async (_, res) => {
    try {
        const allEnturmacoes = await enturmacaoClient.findMany();
        res.json(allEnturmacoes);
    } catch (err) {
        res.status(500).send(err);
    }
});

enturmacaoRouter.post("/", async (req, res) => {
    try {
        const newEnturmacao = await enturmacaoClient.create({
            data: {
                idaluno: req.body.idaluno,
                idturma: req.body.idturma,
                ano: req.body.ano,
                atual: req.body.atual,
            },
        });
        res.json(newEnturmacao);
    } catch (err) {
        res.status(500).send(err);
    }
});

enturmacaoRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const enturmacao = await enturmacaoClient.findUnique({
            where: { id: Number(id) },
        });
        res.json(enturmacao);
    } catch (err) {
        res.status(500).send(err);
    }
});

enturmacaoRouter.get("/aluno/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const enturmacoes = await enturmacaoClient.findMany({
            where: { idaluno: Number(id) },
        });
        res.json(enturmacoes);
    } catch (err) {
        res.status(500).send(err);
    }
});

enturmacaoRouter.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedEnturmacao = await enturmacaoClient.update({
            where: { id: Number(id) },
            data: req.body,
        });
        res.json(updatedEnturmacao);
    } catch (err) {
        res.status(500).send(err);
    }
});

enturmacaoRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedEnturmacao = await enturmacaoClient.delete({
            where: { id: Number(id) },
        });
        res.json(deletedEnturmacao);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default enturmacaoRouter;
