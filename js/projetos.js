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

/* =========================================
   3. FUNÇÕES AUXILIARES
========================================= */

function formatarData(data) {
    const dataFormatada = new Date(data);

    if (Number.isNaN(dataFormatada.getTime())) {
        return "Data não disponível";
    }

    const dataLocalizada = new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        year: "numeric"
    }).format(dataFormatada);

    return dataLocalizada.charAt(0).toLocaleUpperCase("pt-BR")
        + dataLocalizada.slice(1);
}

function ordenarProjetos(projetos) {
    return [...projetos].sort((a, b) =>
        b.dataCriacao.localeCompare(a.dataCriacao)
    );
}

function obterLinguagens(projetos) {
    return [...new Set(
        projetos.map(projeto => projeto.linguagem)
    )].sort((a, b) => a.localeCompare(b));
}

/* =========================================
   4. RENDERIZAÇÃO DOS FILTROS
========================================= */

function renderizarFiltros() {
    elementos.filtro.replaceChildren();

    const linguagens = obterLinguagens(estado.projetos);

    const opcoes = [
        { nome: "Todas as linguagens", valor: "" },
        ...linguagens.map(linguagem => ({
            nome: linguagem,
            valor: linguagem
        }))
    ];

    opcoes.forEach(opcao => {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.textContent = opcao.nome;
        botao.classList.add("language-filter");

        if (estado.linguagemSelecionada === opcao.valor) {
            botao.classList.add("active");
        }

        botao.addEventListener("click", () => {
            estado.linguagemSelecionada = opcao.valor;

            renderizarFiltros();
            renderizarProjetos();
        });

        elementos.filtro.append(botao);
    });
}