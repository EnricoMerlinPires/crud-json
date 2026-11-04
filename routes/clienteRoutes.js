const express = require("express");
const router = express.Router();
const { ler, salvar, proximoId } = require("../utils/jsonStorage");

const arquivo = "clientes.json";
router.get("/", (req, res) => {
  const clientes = ler(arquivo);
  res.render("clientes/index", { clientes });
});
router.get("/cadastro", (req, res) => res.render("clientes/form-cadastro", { erro: null }));
router.post("/", (req, res) => {
  const { nome, email } = req.body;
  if (!String(nome ?? "").trim() || !String(email ?? "").trim()) return res.render("clientes/form-cadastro", { erro: "Preencha todos os campos" });
  const clientes = ler(arquivo);
  clientes.push({ id: proximoId(clientes), nome, email });
  salvar(arquivo, clientes);
  res.redirect("/clientes");
});
router.get("/excluir/:id", (req, res) => {
  const clientes = ler(arquivo);
  const restantes = clientes.filter(item => item.id !== Number(req.params.id));
  if (restantes.length === clientes.length) return res.status(404).send("Registro não encontrado");
  salvar(arquivo, restantes);
  res.redirect("/clientes");
});
router.get("/editar/:id", (req, res) => {
  const cliente = ler(arquivo).find(item => item.id === Number(req.params.id));
  if (!cliente) return res.status(404).send("Registro não encontrado");
  res.render("clientes/editar", { cliente });
});
router.post("/editar/:id", (req, res) => {
  const { nome, email } = req.body;
  if (!String(nome ?? "").trim() || !String(email ?? "").trim()) return res.status(400).send("Preencha todos os campos");
  
  const clientes = ler(arquivo);
  const item = clientes.find(item => item.id === Number(req.params.id));
  if (!item) return res.status(404).send("Registro não encontrado");
  item.nome = nome;
  item.email = email;
  salvar(arquivo, clientes);
  res.redirect("/clientes");
});
module.exports = router;
