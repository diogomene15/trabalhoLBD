import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const alunoRouter = Router();
const prismaClient = new PrismaClient();
const alunoClient = prismaClient.aluno;

alunoRouter.get("/", async (_, res) => {
    try {
        const allAlunos = await alunoClient.findMany({
            include: {
                pessoa: true,
                fichaalimentar: {
                    include:{
                        ficharestricaoingrediente: true
                    }
                },
                responsavel: {
                    include: {
                        pessoa: true,
                        endereco: true,
                        telefone: true,
                    }
                },
            }
        });
        res.json(allAlunos);
    } catch (err) {
        res.status(500).send(err);
    }
});

alunoRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const aluno = await alunoClient.findUnique({
            where: { id: Number(id) },
            include: {
                pessoa: true,
                fichaalimentar: {
                    include:{
                        ficharestricaoingrediente: true
                    }
                },
                responsavel: true,
            }
        });
        res.json(aluno);
    } catch (err) {
        res.status(500).send(err);
    }
});

alunoRouter.get("/:id/enturmacao", async (req, res) => {
    try {
        const id = req.params.id;
        const aluno = await alunoClient.findUnique({
            where: { id: Number(id) },
            include: {
                enturmacao: true,
            }
        });
        res.json(aluno);
    } catch (err) {
        res.status(500).send(err);
    }
});

alunoRouter.get("/:id/refeicao", async (req, res) => {
    try {
        const id = req.params.id;
        const aluno = await alunoClient.findMany({
            where: { id: Number(id) },
            include: {
                alunorefeicao: {
                    include: {
                        refeicao: {
                            include:{
                                refeicaoingrediente: {
                                    include: {
                                        ingrediente: true,
                                    },
                                },
                            }
                        }
                    }
                }
            }
        });
        res.json(aluno);
    } catch (err) {
        res.status(500).send(err);
    }
});


alunoRouter.post("/", async (req, res) => {
    try {
        const [pessoa, fichaalimentar] = await Promise.all([
            (req.body.idpessoa ||
                prismaClient.pessoa.create({
                    data: req.body.pessoa,
                })),
            (req.body.idfichaalimentar ||
                prismaClient.fichaalimentar.create({
                    data: req.body.fichaalimentar,
                })),
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

alunoRouter.post("/:id/enturmacao", async (req, res) => {
    try {
        const id = req.params.id;
        const enturmacao = await prismaClient.enturmacao.create({
            data:{
                idaluno: Number(id),
                idturma: req.body.idturma,
                atual: req.body.atual,
                ano: req.body.ano,
            }
        });
        res.json(enturmacao);
    } catch (err) {
        res.status(500).send(err);
    }
});

alunoRouter.post("/:id/refeicao", async (req, res) => {
    try {
        const id = req.params.id;
        const refeicao = await prismaClient.alunorefeicao.create({
            data:{
                idaluno: Number(id),
                idrefeicao: req.body.idrefeicao,
                datahora: req.body.datahora || new Date(),
            }
        });
        res.json(refeicao);
    } catch (err) {
        res.status(500).send(err);
    }
});

alunoRouter.put("/:id", async (req, res) => {
    // Professor Vanessa, the following method is just.. inneficient and production UNready
    // but did it like that for pure convenience sake
    try {
        const id = req.params.id;
        const oldAluno = await alunoClient.findUnique({
            where: { id: Number(id) },
        });
        if(!oldAluno)
            return res.sendStatus(404);
        await Promise.all([
            (req.body.pessoa ? prismaClient.pessoa.update({
                where: { id: oldAluno.idpessoa },
                data: req.body.pessoa,
            }) : Promise.resolve()),
            (req.body.fichaAlimentar ? prismaClient.fichaalimentar.update({
                where: { id: oldAluno.idfichaalimentar },
                data: req.body.fichaalimentar,
            }) : Promise.resolve())
        ]);
        const updatedAluno = await alunoClient.findUnique({
            where: { id: Number(id) },
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
            include: {
                pessoa: true,
                fichaalimentar: {
                    include:{
                        ficharestricaoingrediente: true
                    }
                },
            }
        });
        res.json(deletedAluno);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default alunoRouter;
