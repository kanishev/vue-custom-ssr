import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);

const isProd = process.env.NODE_ENV === "production";

const manifest = isProd
    ? JSON.parse(
          fs.readFileSync(
              resolve("dist/client/.vite/ssr-manifest.json"),
              "utf-8"
          )
      )
    : {};

async function createServer() {
    const app = express();

    let vite;

    if (!isProd) {
        vite = await createViteServer({
            server: { middlewareMode: true },
            appType: "custom",
        });

        app.use(vite.middlewares);
    } else {
        app.use(
            (await import("serve-static")).default(resolve("dist/client"), {
                index: false,
            })
        );
    }

    app.use("*", formHtml);

    async function formHtml(req, res, next) {
        const url = req.originalUrl;

        try {
            let template, render;

            if (!isProd) {
                template = fs.readFileSync(resolve("index.html"), "utf-8");
                template = await vite.transformIndexHtml(url, template);
                render = (await vite.ssrLoadModule("/src/entry-server.js"))
                    .render;
            } else {
                template = fs.readFileSync(
                    resolve("dist/client/index.html"),
                    "utf-8"
                );
                render = (await import("./dist/server/entry-server.js")).render;
            }

            const { html, preloadLinks, initialState } = await render(
                url,
                manifest
            );

            const renderHtml = template
                .replace(`<!--preload-links-->`, preloadLinks)
                .replace("<!--app-html-->", html)
                .replace(
                    "window.__initialState__ = {};",
                    `window.__initialState__ = ${initialState};`
                );

            res.status(200)
                .set({ "Content-Type": "text/html" })
                .end(renderHtml);
        } catch (e) {
            vite && vite.ssrFixStacktrace(e);
            res.status(500).end(e.stack);
        }
    }

    app.listen(3030, () => {
        console.log(`ready ${process.env.NODE_ENV} on 3030 port`);
    });
}

createServer();
