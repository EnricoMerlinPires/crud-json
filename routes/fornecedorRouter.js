const express = require("express");
const router = express.Router();
const { ler, salvar, proximoId } = require("../utils/jsonStorage");
const { cnpj: cnpjValidate } = require("cpf-cnpj-validator");

const arquivo = "fornecedores.json";
router.get("/", (req, res) => {
  const fornecedores = ler(arquivo);
  res.render("fornecedores/index", { fornecedores });
});
router.get("/cadastro", (req, res) => res.render("fornecedores/form-cadastro", { erro: null }));
router.post("/", (req, res) => {
  const { cnpj, email } = req.body;
  if (!String(cnpj ?? "").trim() || !String(email ?? "").trim()) return res.render("fornecedores/form-cadastro", { erro: "Preencha todos os campos" });
  if (!cnpjValidate.isValid(cnpj)) return res.render("fornecedores/form-cadastro", { erro: "CNPJ inválido" });
  const fornecedores = ler(arquivo);
  fornecedores.push({ id: proximoId(fornecedores), cnpj: cnpjValidate.format(cnpj), email });
  salvar(arquivo, fornecedores);
  res.redirect("/fornecedores");
});
router.get("/excluir/:id", (req, res) => {
  const fornecedores = ler(arquivo);
  const restantes = fornecedores.filter(item => item.id !== Number(req.params.id));
  if (restantes.length === fornecedores.length) return res.status(404).send("Registro não encontrado");
  salvar(arquivo, restantes);
  res.redirect("/fornecedores");
});
router.get("/editar/:id", (req, res) => {
  const fornecedor = ler(arquivo).find(item => item.id === Number(req.params.id));
  if (!fornecedor) return res.status(404).send("Registro não encontrado");
  res.render("fornecedores/editar", { fornecedor });
});
router.post("/editar/:id", (req, res) => {
  const { cnpj, email } = req.body;
  if (!String(cnpj ?? "").trim() || !String(email ?? "").trim()) return res.status(400).send("Preencha todos os campos");
  if (!cnpjValidate.isValid(cnpj)) return res.status(400).send("CNPJ inválido");
  const fornecedores = ler(arquivo);
  const item = fornecedores.find(item => item.id === Number(req.params.id));
  if (!item) return res.status(404).send("Registro não encontrado");
  item.cnpj = cnpjValidate.format(cnpj);
  item.email = email;
  salvar(arquivo, fornecedores);
  res.redirect("/fornecedores");
});
module.exports = router;
