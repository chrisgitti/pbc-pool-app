const http = require("http");
const fs   = require("fs");
const path = require("path");

const PORT = 3004;
const ROOT = __dirname;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css":  "text/css",
  ".js":   "application/javascript",
  ".json": "application/json",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
};

http.createServer((req, res) => {
  let urlPath = req.url.split("?")[0];
  if (urlPath === "/" || urlPath === "") urlPath = "/index.html";

  const absPath = path.resolve(ROOT, "." + urlPath);
  if (!absPath.startsWith(ROOT)) {
    res.writeHead(403); res.end("Forbidden"); return;
  }

  fs.readFile(absPath, (err, data) => {
    if (err) { res.writeHead(404); res.end("Not found"); return; }
    const ext  = path.extname(absPath).toLowerCase();
    const mime = MIME[ext] || "application/octet-stream";
    res.writeHead(200, {
      "Content-Type": mime,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-store, max-age=0",
      "Pragma": "no-cache",
    });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`PBC Pool App läuft auf http://localhost:${PORT}`);
});
