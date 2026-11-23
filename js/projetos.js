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

/* =========================================
   5. RENDERIZAÇÃO DOS PROJETOS
========================================= */

function renderizarProjetos() {
    const projetosFiltrados = estado.projetos.filter(projeto => {
        return estado.linguagemSelecionada === ""
            || projeto.linguagem === estado.linguagemSelecionada;
    });

    elementos.lista.replaceChildren();

    if (projetosFiltrados.length === 0) {
        elementos.lista.textContent = "Nenhum projeto encontrado.";
        return;
    }

    projetosFiltrados.forEach(projeto => {
        const card = document.createElement("article");
        card.classList.add("projeto");

        const titulo = document.createElement("h3");
        titulo.textContent = projeto.nome;

        const descricao = document.createElement("p");
        descricao.textContent = projeto.descricao;

        const criacao = document.createElement("p");
        criacao.textContent = formatarData(projeto.dataCriacao);

        const linguagem = document.createElement("p");
        linguagem.textContent = projeto.linguagem;

        const link = document.createElement("a");
        link.href = projeto.link;
        link.textContent = "Ver projeto";
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        card.append(titulo, descricao, criacao, linguagem, link);

        elementos.lista.append(card);
    });
}

/* =========================================
   6. INICIALIZAÇÃO
========================================= */

async function iniciar() {
    try {
        elementos.status.textContent = "Carregando projetos...";

        estado.projetos = await buscarProjetos();

        estado.projetos = ordenarProjetos(estado.projetos);

        renderizarFiltros();
        renderizarProjetos();

        elementos.status.textContent =
            `${estado.projetos.length} projetos carregados.`;

        elementos.status.remove();

    } catch (erro) {
        console.error("Falha ao carregar projetos:", erro);

        elementos.status.textContent =
            "Não foi possível carregar os projetos. Tente novamente mais tarde.";
    }
}

iniciar();