/* =========================================
   1. CONFIGURAÇÕES E ESTADO
========================================= */

const API_URL = "https://api.github.com/users/VitorAntonio-GN/repos?per_page=100";

const elementos = {
    filtro: document.getElementById("filtro-linguagem"),
    lista: document.getElementById("lista-projetos"),
    status: document.getElementById("status-projetos")
};

const estado = {
    projetos: [],
    linguagemSelecionada: ""
};

/* =========================================
   2. ACESSO AOS DADOS
========================================= */

async function buscarProjetos() {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
        throw new Error(
            `Erro ao consultar o GitHub: ${resposta.status}`
        );
    }

    const dados = await resposta.json();

    if (!Array.isArray(dados)) {
        throw new Error("A resposta do GitHub é inválida.");
    }

    return dados.map(projeto => ({
        nome: projeto.name,
        dataCriacao: projeto.created_at,
        descricao: projeto.description || "Sem descrição",
        linguagem: projeto.language || "Não informada",
        link: projeto.html_url
    }));
}