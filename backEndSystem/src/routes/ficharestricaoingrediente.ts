import { PrismaClient } from "@prisma/client";
import { RequestHandler, Router } from "express";

const prismaClient = new PrismaClient();
const ficharestricaoingredienteClient = prismaClient.ficharestricaoingrediente;

const getRestricoesById : RequestHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const fichaRestr = await ficharestricaoingredienteClient.findMany({
            where: { idfichaalimentar: Number(id) },
            include: {
                fichaalimentar: true,
                ingrediente: true,
            }
        });
        res.json(fichaRestr);
    } catch (err) {
        res.status(500).send(err);
    }
    next();
}

const addRestricaoById : RequestHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const fichaRestr = await ficharestricaoingredienteClient.create({
            data: {
                idfichaalimentar: Number(id),
                idingrediente: req.body.idingrediente,
            },
        });
        res.json(fichaRestr);
    } catch (err) {
        res.status(500).send(err);
    }
    next();
}

const removeRestricaoById : RequestHandler = async  (req, res, next) => {
    try {
        const id = req.params.id;
        const fichaRestr = await ficharestricaoingredienteClient.delete({
            where: { id: Number(id) },
        });
        res.json(fichaRestr);
    } catch (err) {
        res.status(500).send(err);
    }
    next();
}

export { getRestricoesById, addRestricaoById, removeRestricaoById };

