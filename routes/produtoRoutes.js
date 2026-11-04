const express = require("express");
const router = express.Router();
const { ler, salvar, proximoId } = require("../utils/jsonStorage");

const arquivo = "produtos.json";
router.get("/", (req, res) => {
  const produtos = ler(arquivo);
  res.render("produtos/index", { produtos });
});
router.get("/cadastro", (req, res) => res.render("produtos/form-cadastro", { erro: null }));
router.post("/", (req, res) => {
  const { nome, preco } = req.body;
  if (!String(nome ?? "").trim() || !String(preco ?? "").trim()) return res.render("produtos/form-cadastro", { erro: "Preencha todos os campos" });
  if (!Number.isFinite(Number(preco)) || Number(preco) < 0) return res.render("produtos/form-cadastro", { erro: "Preço inválido" });
  const produtos = ler(arquivo);
  produtos.push({ id: proximoId(produtos), nome, preco: Number(preco).toFixed(2) });
  salvar(arquivo, produtos);
  res.redirect("/produtos");
});
router.get("/excluir/:id", (req, res) => {
  const produtos = ler(arquivo);
  const restantes = produtos.filter(item => item.id !== Number(req.params.id));
  if (restantes.length === produtos.length) return res.status(404).send("Registro não encontrado");
  salvar(arquivo, restantes);
  res.redirect("/produtos");
});
router.get("/editar/:id", (req, res) => {
  const produto = ler(arquivo).find(item => item.id === Number(req.params.id));
  if (!produto) return res.status(404).send("Registro não encontrado");
  res.render("produtos/editar", { produto });
});
router.post("/editar/:id", (req, res) => {
  const { nome, preco } = req.body;
  if (!String(nome ?? "").trim() || !String(preco ?? "").trim()) return res.status(400).send("Preencha todos os campos");
  if (!Number.isFinite(Number(preco)) || Number(preco) < 0) return res.status(400).send("Preço inválido");
  const produtos = ler(arquivo);
  const item = produtos.find(item => item.id === Number(req.params.id));
  if (!item) return res.status(404).send("Registro não encontrado");
  item.nome = nome;
  item.preco = Number(preco).toFixed(2);
  salvar(arquivo, produtos);
  res.redirect("/produtos");
});
module.exports = router;
