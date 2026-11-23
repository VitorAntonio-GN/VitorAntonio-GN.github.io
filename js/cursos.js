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