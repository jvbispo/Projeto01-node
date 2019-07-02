const express = require("express");
const server = express();
server.use(express.json());

const projetos = [];
var requests = 0;

function idExists(req, res, next) {
  const { id } = req.params;
  if (!id) {
    return res.json({ error: "id doesn exists" });
  }
  return next();
}

function requestCount(req, res, next) {
  requests += 1;
  console.log(requests);
  return next();
}

server.use(requestCount);

server.post("/projects", (req, res) => {
  const { id } = req.body;
  const { title } = req.body;
  const tasks = [];
  const project = [id, title, tasks];
  projetos.push(project);
  return res.json({ message: projetos });
});

server.get("/projects", (req, res) => {
  return res.json({ projetos: projetos });
});

server.put("/projects/:id", idExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  projetos[id][1] = title;
  return res.json({ projeto: projetos[id] });
});
server.delete("/projects/:id", idExists, (req, res) => {
  const { id } = req.params;
  projetos.splice(id, 1);
  return res.json({ projetos: projetos });
});

server.post("/projects/:id/tasks", idExists, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  projetos[id][2].push(title);
  return res.json({ projeto: projetos[id] });
});

server.listen(3333);
