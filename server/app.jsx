import express from "express"
import { StaticRouter } from "react-router";
import { valueOf, serialize } from "../app/services/firebase/index.mjs";
import html from "./template/index.mjs"
import App from "../app/components/app.jsx";
import React from "react"
import { renderToString } from "react-dom/server";
import path from "path";
import { readFileSync } from "fs";

const app = express();
const router = express.Router();
const manifest = JSON.parse(readFileSync(path.resolve(__dirname, 'public/manifest.json'), 'utf8'));

app.use("/assets", express.static(path.resolve(__dirname, 'public')));

router.get("/quiz", async (_request, response) => {
  await valueOf("questions");
  const serializedStore = serialize();
  const head = html.head(serializedStore,{...manifest});
  const content = renderToString(<StaticRouter
    location={"/quiz"}
  >
    <App />
  </StaticRouter>
  );
  const body = html.body(content,{...manifest})

  response.send(`${head}${body}`);
});

router.get("/", (_request, response) => {
  const head = html.head(null,{...manifest});
  const content = renderToString(<StaticRouter
    location={"/"}
  >
    <App />
  </StaticRouter>
  );
  const body = html.body(content,{...manifest})
  response.send(`${head}${body}`);
});

app.use(router);

export default function start(port = 3000) {
  app.listen(port);
}
