import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const pessoaRouter = Router();
const prismaClient = new PrismaClient();
const pessoaClient = prismaClient.pessoa;

pessoaRouter.get("/", async (_, res) => {
    try {
        const allPessoas = await pessoaClient.findMany({
            include: {
                aluno: true,
                responsavel: true,
            }
        });
        res.json(allPessoas);
    } catch (err) {
        res.status(500).send(err);
    }
});

pessoaRouter.post("/", async (req, res) => {
    try {
        const pessoa = req.body;
        const newPessoa = await pessoaClient.create({
            data: {
                cpf: pessoa.cpf,
                primeironome: pessoa.primeironome,
                sobrenome: pessoa.sobrenome
            }
        });
        res.json(newPessoa);
    } catch (err) {
        res.status(500).send(err);
    }
});

pessoaRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const pessoa = await pessoaClient.findUnique({
            where: { id: Number(id) },
            include: {
                aluno: true,
                responsavel: true,
            }
        });
        res.json(pessoa);
    } catch (err) {
        res.status(500).send(err);
    }
});

pessoaRouter.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const pessoa = req.body;
        const updatedPessoa = await pessoaClient.update({
            where: { id: Number(id) },
            data: pessoa,
        });
        res.json(updatedPessoa);
    } catch (err) {
        res.status(500).send(err);
    }
});

pessoaRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPessoa = await pessoaClient.delete({
            where: { id: Number(id) },
        });
        res.json(deletedPessoa);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default pessoaRouter;
