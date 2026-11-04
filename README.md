# Sistema de Gerenciamento — CRUD com JSON

## Nome do Projeto
Sistema de Gerenciamento — CRUD com persistência em arquivos JSON.

## Integrantes
- Arthur Araujo Spina
- Enrico Merlin Pires
## Objetivo
Migrar o CRUD desenvolvido com arrays fixos para arquivos JSON persistidos na pasta `data/`, mantendo as telas EJS.

## Estrutura de Pastas
```text
app.js
routes/          # Rotas e operações CRUD
utils/jsonStorage.js  # Leitura, gravação e geração de IDs
data/            # categorias.json, clientes.json, fornecedores.json, produtos.json
views/           # Telas EJS existentes
package.json
```

## Entidades Utilizadas
Categorias (nome, descrição), Clientes (nome, email), Fornecedores (CNPJ, email) e Produtos (nome, preço).

## Prompt Utilizado
"Migre o CRUD Node.js/Express/EJS deste projeto, que utiliza arrays dentro das rotas, para arquivos JSON na pasta data. Preserve as telas e rotas existentes, implemente cadastro, listagem, edição e exclusão lendo e gravando arquivos, e documente o uso de IA no README."

## Uso da Inteligência Artificial
Ferramenta: ChatGPT. A IA analisou o código fornecido e gerou uma adaptação das quatro rotas e um módulo compartilhado de armazenamento.

### Resposta da IA (resumo)
"Crie um JSON por entidade; leia o arquivo a cada operação; grave após cadastrar, editar ou excluir; gere IDs com base no maior ID existente; preserve as views EJS e centralize a leitura/gravação em um utilitário."

### Sugestões Recebidas
- Centralizar o acesso aos JSONs em `utils/jsonStorage.js`.
- Utilizar o maior ID + 1 para evitar IDs repetidos após exclusões.
- Verificar registros inexistentes e validar os dados dos formulários.
- Manter as rotas e o layout existentes.

## Alterações Realizadas
- Criada pasta `data/` com quatro arquivos JSON, inicializados com os registros originais.
- Removidos os arrays fixos dos arquivos de rotas.
- CRUD das quatro entidades agora lê os dados do disco e grava as mudanças no JSON.
- Corrigida a inicialização duplicada do servidor em `app.js`.

## Ajustes Feitos Manualmente
- Conferimos o funcionamento das telas de categorias, clientes,
  fornecedores e produtos.
- Testamos cadastro, listagem, edição e exclusão nas quatro entidades.
- Conferimos as alterações nos arquivos JSON correspondentes.
- Na execução pelo PowerShell, utilizamos npm.cmd install e
  npm.cmd start para resolver o bloqueio do script npm.ps1.
- **A preencher pelos integrantes:** descrevam aqui os ajustes que vocês realmente fizeram ao revisar, testar e executar o projeto. Não atribuam testes manuais que não foram realizados.

## Desafios Encontrados
- Evitar perda de dados ao reiniciar o Node.js.
- Impedir repetição de IDs após exclusões.
- Preservar o funcionamento das telas EJS existentes.

## Como Executar
```bash
npm install
npm start
```
Acesse http://localhost:3000.

## Link do Repositório
**A preencher:** cole aqui o link real do GitHub após publicar o projeto.

## Conclusão
A aplicação passou a persistir dados em arquivos JSON, sem depender de arrays fixos nas rotas. O projeto mantém o CRUD e as páginas existentes. Para uso em produção, recomenda-se um banco de dados, especialmente em hospedagens com sistema de arquivos temporário.
