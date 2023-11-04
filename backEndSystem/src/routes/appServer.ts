import express from "express";
import router from "./router";

export default function startApp() {
    const app = express();

    const { PORT = 3000, APP_NAME = "nutrisafe" } = process.env;

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        next();
    });
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(router);

    app.listen(PORT, () => {
        console.log(`${APP_NAME} running on ${PORT}`);
    });
    return app;
}
