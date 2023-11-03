import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const pessoaRouter = Router();
const prismaClient = new PrismaClient();
const pessoaClient = prismaClient.pessoa;

pessoaRouter.get("/", async (req, res) => {
    try{
        const allPessoas = pessoaClient.findMany();
        res.json(allPessoas);
    }catch(err){
        res.status(500).send(err)
    }
});

pessoaRouter.post("/", async (req, res) => {
    try{
        const pessoa = req.body;
        const newPessoa = pessoaClient.create({
            data: pessoa
        });
        res.json(newPessoa);
    }catch(err){
        res.status(500).send(err);
    }
});

pessoaRouter.get("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const pessoa = pessoaClient.findUnique({
            where: { id: Number(id) }
        });
        res.json(pessoa);
    }catch(err){
        res.status(500).send(err)
    }
});

pessoaRouter.put("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const pessoa = req.body;
        const updatedPessoa = pessoaClient.update({
            where: { id: Number(id) },
            data: pessoa
        });
        res.json(updatedPessoa);
    }catch(err){
        res.status(500).send(err);
    }
});

pessoaRouter.delete("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const deletedPessoa = pessoaClient.delete({
            where: { id: Number(id) }
        });
        res.json(deletedPessoa);
    }catch(err){
        res.status(500).send(err);
    }
});

export default pessoaRouter;
