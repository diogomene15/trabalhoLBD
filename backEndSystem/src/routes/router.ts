import { Router } from "express";
import ingredienteRouter from "./ingredienteRouter";

const router = Router();

router.use("/ingrediente", ingredienteRouter);

router.get("/", (req, res) => {
    res.send("Hello world!");
});

export default router;
