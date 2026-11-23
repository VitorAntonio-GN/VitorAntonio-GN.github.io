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