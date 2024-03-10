import express from "express"
import bodyParser from "body-parser";
import { StaticRouter } from "react-router";
import { valueOf, serialize } from "../app/services/firebase/index.mjs";
import html from "./template/index.mjs"
import App from "../app/components/app.jsx";
import React from "react"
import { renderToString } from "react-dom/server";
import { readFileSync } from "fs";
import path from "path";

function publicPath(file){
  const filePath = file ? `/${file}` : "";
  if(process.env.DEPLOY_ENV === "local"){
    return path.resolve(__dirname,`../public${filePath}`)
  }
  return path.join(process.cwd(),`public${filePath}`);
}

const app = express();
const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/assets", express.static(publicPath()));
const manifest = JSON.parse(readFileSync(publicPath("manifest.json"), 'utf8'));

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

export default app;
