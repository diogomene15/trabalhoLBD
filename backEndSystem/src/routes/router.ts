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
router.use("/pessoa", pessoaRouter)
router.use("/fichaalimentar", fichaalimentarRouter);


router.get("/", (req, res) => {
    res.send("Hello world!");
});

export default router;
