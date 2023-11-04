import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const responsavelRouter = Router();

const prismaClient = new PrismaClient();
const responsavelClient = prismaClient.responsavel;

responsavelRouter.get("/", async (_, res) => {
    try {
        const allResponsaveis = await responsavelClient.findMany({include: {
            pessoa: true,
            endereco: true,
            telefone: true,
        }});
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
        const responsavel = await responsavelClient.findUnique({
            where: { id: Number(id) },
            include: {
                pessoa: true,
                endereco: true,
                telefone: true,
            }
        });
        res.json(responsavel);
    } catch (err) {
        res.status(500).send(err);
    }
});

responsavelRouter.get("/:id/endereco", async (req, res) => {
    try {
        const id = req.params.id;
        const responsavel = await responsavelClient.findUnique({
            where: { id: Number(id) },
            include: {
                reponsavelendereco: true,
            }
        });
        res.json(responsavel);
    } catch (err) {
        res.status(500).send(err);
    }
});

responsavelRouter.get("/:id/telefone", async (req, res) => {
    try {
        const id = req.params.id;
        const responsavel = await responsavelClient.findUnique({
            where: { id: Number(id) },
            include: {
                reponsaveltelefone: true,
            }
        });
        res.json(responsavel);
    } catch (err) {
        res.status(500).send(err);
    }
});

responsavelRouter.get("/:id/aluno", async (req, res) => {
    try {
        const id = req.params.id;
        const responsavel = await responsavelClient.findUnique({
            where: { id: Number(id) },
            include: {
                aluno: {
                    include: {
                        pessoa: true,
                        fichaalimentar: true,
                    }
                },
            }
        });
        res.json(responsavel);
    } catch (err) {
        res.status(500).send(err);
    }
});


responsavelRouter.put("/:id", async (req, res) => {
    // Professor Vanessa, the following method is just.. inneficient and production UNready
    // but did it like that for pure convenience sake
    try {
        const id = req.params.id;
        const responsavel = req.body;
        const oldResponsavel = await responsavelClient.findUnique({
            where: { id: Number(id) },
            include: {
                pessoa: true,
                endereco: true,
                telefone: true,
            }
        });
        if(!oldResponsavel)
            return res.sendStatus(404);
        Promise.all([
            ( responsavel.pessoa ? prismaClient.pessoa.update({data: responsavel.pessoa, where: {id: oldResponsavel.idpessoa}}) : Promise.resolve() ),
            ( responsavel.endereco ? prismaClient.endereco.update({data: responsavel.endereco, where: {id: oldResponsavel.idenderecoprincipal}}) : Promise.resolve() ),
            ( responsavel.telefone ? prismaClient.telefone.update({data: responsavel.telefone, where: {id: oldResponsavel.idtelefoneprincipal}}) : Promise.resolve() ),
        ]);
        const updatedResponsavel = await responsavelClient.findUnique({
            where: { id: Number(id) },
            include: {
                pessoa: true,
                endereco: true,
                telefone: true,
            }
        });
        res.json(updatedResponsavel);
    } catch (err) {
        res.status(500).send(err);
    }
});

responsavelRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedResponsavel = await responsavelClient.delete({
            where: { id: Number(id) },
            include: {
                pessoa: true,
                endereco: true,
                telefone: true,
            }
        });
        res.json(deletedResponsavel);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default responsavelRouter;
