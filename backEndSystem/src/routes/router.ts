import { Router } from "express";
import ingredienteRouter from "./ingredienteRouter";
import alunoRouter from "./alunoRouter";
import responsavelRouter from "./responsavelRouter";
import enturmacaoRouter from "./enturmacaoRouter";
import turmaRouter from "./turmaRouter";
import pessoaRouter from "./pessoaRouter";
import fichaalimentarRouter from "./fichaAlimentar";

const router = Router();

router.use("/ingrediente", ingredienteRouter);
router.use("/aluno", alunoRouter);
router.use("/responsavel", responsavelRouter);
router.use("/enturmacao", enturmacaoRouter);
router.use("/turma", turmaRouter);
router.use("/pessoa", pessoaRouter);
router.use("/fichaalimentar", fichaalimentarRouter);

router.get("/", (_, res) => {
    res.send(
        "Welcome to our very tiny and cosy API! We're glad to have you here! This is a college project, so don't expect much from us! :)... Anyways, go ahead, explore our services. With love and joy, DLM"
    );
});

export default router;
