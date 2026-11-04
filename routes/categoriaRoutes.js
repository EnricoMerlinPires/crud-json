const express = require("express");
const router = express.Router();
const { ler, salvar, proximoId } = require("../utils/jsonStorage");

const arquivo = "categorias.json";
router.get("/", (req, res) => {
  const categorias = ler(arquivo);
  res.render("categorias/index", { categorias });
});
router.get("/cadastro", (req, res) => res.render("categorias/form-cadastro", { erro: null }));
router.post("/", (req, res) => {
  const { nome, descricao } = req.body;
  if (!String(nome ?? "").trim() || !String(descricao ?? "").trim()) return res.render("categorias/form-cadastro", { erro: "Preencha todos os campos" });
  const categorias = ler(arquivo);
  categorias.push({ id: proximoId(categorias), nome, descricao });
  salvar(arquivo, categorias);
  res.redirect("/categorias");
});
router.get("/excluir/:id", (req, res) => {
  const categorias = ler(arquivo);
  const restantes = categorias.filter(item => item.id !== Number(req.params.id));
  if (restantes.length === categorias.length) return res.status(404).send("Registro não encontrado");
  salvar(arquivo, restantes);
  res.redirect("/categorias");
});
router.get("/editar/:id", (req, res) => {
  const categoria = ler(arquivo).find(item => item.id === Number(req.params.id));
  if (!categoria) return res.status(404).send("Registro não encontrado");
  res.render("categorias/editar", { categoria });
});
router.post("/editar/:id", (req, res) => {
  const { nome, descricao } = req.body;
  if (!String(nome ?? "").trim() || !String(descricao ?? "").trim()) return res.status(400).send("Preencha todos os campos");
  
  const categorias = ler(arquivo);
  const item = categorias.find(item => item.id === Number(req.params.id));
  if (!item) return res.status(404).send("Registro não encontrado");
  item.nome = nome;
  item.descricao = descricao;
  salvar(arquivo, categorias);
  res.redirect("/categorias");
});
module.exports = router;
