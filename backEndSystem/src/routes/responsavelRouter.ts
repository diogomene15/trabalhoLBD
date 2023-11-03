import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const responsavelRouter = Router();

const prismaClient = new PrismaClient();
const responsavelClient = prismaClient.responsavel;

responsavelRouter.get("/", async (_, res) => {
    try {
        const allResponsaveis = responsavelClient.findMany();
        res.json(allResponsaveis);
    } catch (err) {
        res.status(500).send(err);
    }
});

responsavelRouter.post("/", async (req, res) => {
    try {
        const [pessoa, endereco, telefone] = await Promise.all([
            req.body.idpessoa ||
                prismaClient.pessoa.create({
                    data: req.body.pessoa,
                }),
            req.body.idenderecoprincipal ||
                prismaClient.endereco.create({
                    data: req.body.endereco,
                }),
            req.body.idtelefoneprincipal ||
                prismaClient.telefone.create({
                    data: req.body.telefone,
                }),
        ]);

        const newResponsavel = await responsavelClient.create({
            data: {
                idpessoa: pessoa.id,
                idenderecoprincipal: endereco.id,
                idtelefoneprincipal: telefone.id,
                ...req.body.responsavel,
            },
        });
        res.json(newResponsavel);
    } catch (err) {
        res.status(500).send(err);
    }
});

responsavelRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const responsavel = responsavelClient.findUnique({
            where: { id: Number(id) },
        });
        res.json(responsavel);
    } catch (err) {
        res.status(500).send(err);
    }
});

responsavelRouter.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const responsavel = req.body;
        const updatedResponsavel = responsavelClient.update({
            where: { id: Number(id) },
            data: responsavel,
        });
        res.json(updatedResponsavel);
    } catch (err) {
        res.status(500).send(err);
    }
});

responsavelRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedResponsavel = responsavelClient.delete({
            where: { id: Number(id) },
        });
        res.json(deletedResponsavel);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default responsavelRouter;
