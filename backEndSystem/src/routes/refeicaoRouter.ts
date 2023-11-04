import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const refeicaoRouter = Router();

const prismaClient = new PrismaClient();
const refeicaoClient = prismaClient.refeicao;

refeicaoRouter.get("/", async (_, res) => {
    try {
        const allRefeicoes = await refeicaoClient.findMany({
            include: {
                refeicaoingrediente: {
                    include: {
                        ingrediente: true,
                    },
                },
            },
        });
        res.json(allRefeicoes);
    } catch (err) {
        res.status(500).send(err);
    }
});

refeicaoRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const refeicao = await refeicaoClient.findUnique({
            where: {
                id: Number(id),

            },
            include: {
                refeicaoingrediente: {
                    include: {
                        ingrediente: true,
                    },
                },
            }
        });
        res.json(refeicao);
    } catch (err) {
        res.status(500).send(err);
    }
});

refeicaoRouter.post("/", async (req, res) => {
    try {
        const refeicao = req.body;
        const newRefeicao = await refeicaoClient.create({
            data: {
                nome: refeicao.nome,
                descricao: refeicao.descricao,
            },
        });
        res.json(newRefeicao);
    } catch (err) {
        res.status(500).send(err);
    }
});

refeicaoRouter.post("/:id/ingrediente", async (req, res) => {
    try {
        const id = req.params.id;
        const ingrediente = req.body;
        const newIngrediente = await prismaClient.refeicaoingrediente.create({
            data: {
                idrefeicao: Number(id),
                idingrediente: ingrediente.idingrediente,
            },
        });
        res.json(newIngrediente);
    } catch (err) {
        res.status(500).send(err);
    }
});


refeicaoRouter.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const refeicao = req.body;
        const updatedRefeicao = await refeicaoClient.update({
            where: { id: Number(id) },
            data: refeicao,
        });
        res.json(updatedRefeicao);
    } catch (err) {
        res.status(500).send(err);
    }
});

refeicaoRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const refeicao = await refeicaoClient.delete({
            where: { id: Number(id) },
        });
        res.json(refeicao);
    } catch (err) {
        res.status(500).send(err);
    }
});


refeicaoRouter.delete("/:id/ingrediente/:idingrediente", async (req, res) => {
    try {
        const id = req.params.id;
        const idingrediente = req.params.idingrediente;
        const deletedIngrediente = await prismaClient.refeicaoingrediente.deleteMany({
            where: {
                idrefeicao: Number(id),
                idingrediente: Number(idingrediente),
            },
        });
        res.json(deletedIngrediente);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default refeicaoRouter;