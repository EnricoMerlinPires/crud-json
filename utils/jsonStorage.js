const fs = require("fs");
const path = require("path");
const pasta = path.join(__dirname, "..", "data");

function caminho(nome) {
  if (!/^[a-z]+\.json$/.test(nome)) throw new Error("Arquivo inválido");
  return path.join(pasta, nome);
}
function ler(nome) {
  const dados = JSON.parse(fs.readFileSync(caminho(nome), "utf8"));
  if (!Array.isArray(dados)) throw new Error("O JSON precisa conter uma lista");
  return dados;
}
function salvar(nome, dados) {
  const destino = caminho(nome);
  const temporario = destino + ".tmp";
  fs.writeFileSync(temporario, JSON.stringify(dados, null, 2) + "\n", "utf8");
  fs.renameSync(temporario, destino);
}
function proximoId(dados) {
  return dados.reduce((maior, item) => Math.max(maior, Number(item.id) || 0), 0) + 1;
}
module.exports = { ler, salvar, proximoId };
