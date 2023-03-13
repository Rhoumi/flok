import process from "process";
import path from "path";
import fs from "fs";
import http from "http";
import connect from "connect";
import { Command } from "commander";
import { fileURLToPath } from "url";
import withFlokServer from "../dist/index.js";

const readConfig = (path) => {
  const raw = fs.readFileSync(path);
  return JSON.parse(raw.toString());
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageInfo = readConfig(path.resolve(__dirname, "../package.json"));
const program = new Command();

program.version(packageInfo.version);
program
  .option("-H, --host [HOST]", "Server host", "0.0.0.0")
  .option("-P, --port [PORT]", "Server port", 3000)
  .parse(process.argv);

const opts = program.opts();

const app = withFlokServer(connect());

console.log(`> Flok server started. Listening on ${opts.host}:${opts.port}`);
http.createServer(app).listen(opts.port, opts.host)
