/* =========================================
   1. CONFIGURAÇÕES
========================================= */

const ARQUIVO_CURSOS = "data/cursos.json";

const elementos = {
    lista: document.getElementById("lista-cursos"),
    status: document.getElementById("status-cursos")
};

/* =========================================
   2. ACESSO AOS DADOS
========================================= */

async function carregarCursos() {
    const resposta = await fetch(ARQUIVO_CURSOS);

    if (!resposta.ok) {
        throw new Error(
            `Erro ao carregar cursos: ${resposta.status}`
        );
    }

    const dados = await resposta.json();

    if (!Array.isArray(dados)) {
        throw new Error("O arquivo de cursos possui um formato inválido.");
    }

    return dados
        .filter(curso => curso && typeof curso === "object")
        .map(curso => ({
            nome: curso.nome ?? "Curso sem nome",
            instituicao: curso.instituicao ?? "Instituição não informada",
            dataConclusao: curso.dataConclusao ?? "",
            credencial: curso.credencial ?? "",
            urlCredencial: curso.urlCredencial ?? ""
        }));
}

/* =========================================
   3. FUNÇÕES AUXILIARES
========================================= */

function converterData(dataConclusao) {
    if (
        typeof dataConclusao !== "string" ||
        !/^\d{4}-(0[1-9]|1[0-2])$/.test(dataConclusao)
    ) {
        return null;
    }

    return new Date(`${dataConclusao}-01T12:00:00`);
}

function formatarData(dataConclusao) {
    const data = converterData(dataConclusao);

    if (!data) {
        return "Data não informada";
    }

    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        year: "numeric"
    }).format(data);

    return dataFormatada.charAt(0).toLocaleUpperCase("pt-BR")
        + dataFormatada.slice(1);
}

function ordenarCursos(cursos) {
    return [...cursos].sort((a, b) => {
        const dataA = converterData(a.dataConclusao)?.getTime()
            ?? Number.NEGATIVE_INFINITY;

        const dataB = converterData(b.dataConclusao)?.getTime()
            ?? Number.NEGATIVE_INFINITY;

        return dataB - dataA;
    });
}

/* =========================================
   4. CRIAÇÃO DE ELEMENTOS
========================================= */

function criarElemento(tag, texto) {
    const elemento = document.createElement(tag);

    elemento.textContent = texto;

    return elemento;
}

function criarLinkCredencial(urlCredencial) {
    if (typeof urlCredencial !== "string" || !urlCredencial.trim()) {
        return null;
    }

    let url;

    try {
        url = new URL(urlCredencial);
    } catch {
        return null;
    }

    if (!["http:", "https:"].includes(url.protocol)) {
        return null;
    }

    const link = criarElemento("a", "Ver credencial");

    link.href = url.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    return link;
}

/* =========================================
   5. RENDERIZAÇÃO DOS CURSOS
========================================= */

function renderizarCursos(cursos) {
    elementos.lista.replaceChildren();

    if (cursos.length === 0) {
        elementos.lista.append(
            criarElemento("p", "Nenhum curso encontrado.")
        );

        return;
    }

    const fragmento = document.createDocumentFragment();

    cursos.forEach(curso => {
        const card = document.createElement("article");
        card.classList.add("curso");

        const titulo = criarElemento("h3", curso.nome);

        const conclusao = criarElemento(
            "p",
            formatarData(curso.dataConclusao)
        );

        const instituicao = criarElemento(
            "p",
            curso.instituicao
        );

        card.append(titulo, conclusao, instituicao);

        const link = criarLinkCredencial(curso.urlCredencial);

        if (link) {
            card.append(link);
        }

        fragmento.append(card);
    });

    elementos.lista.append(fragmento);
}