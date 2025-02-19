import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);

const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
}); // should be placed in createServer fn?

async function formHtml(req, res, next) {
    const url = req.originalUrl;

    try {
        let template = fs.readFileSync(resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);

        const { render } = await vite.ssrLoadModule("/src/enrty-server.js");

        const [html] = await render();
        const html2 = template.replace("<!--app-html-->", html);

        res.status(200).set({ "Content-Type": "text/html" }).end(html2);
    } catch (e) {
        vite.ssrFixStacktrace(e);
        next(e);
    }
}

async function createServer() {
    const app = express();

    app.use(vite.middlewares); // what is it?

    app.use("*", formHtml);

    app.listen(3000, () => {
        console.log("ready");
    });
}

createServer();
