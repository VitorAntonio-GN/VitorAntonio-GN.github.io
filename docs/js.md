# Documentação do JavaScript

## Visão geral

O projeto utiliza JavaScript puro (ES6+) para carregar, processar e apresentar dinamicamente os projetos, cursos e certificações do portfólio.

O código está dividido em dois arquivos independentes:

- `js/projetos.js`: responsável pela consulta à API REST do GitHub, organização, filtragem e exibição dos repositórios.
- `js/cursos.js`: responsável pelo carregamento, processamento e exibição dos cursos e certificações armazenados em JSON.

Ambos seguem uma organização baseada em etapas de configuração, acesso aos dados, funções auxiliares, renderização e inicialização.

---

## Projetos (`js/projetos.js`)

Responsável por consultar os repositórios públicos do GitHub, organizar os resultados e permitir sua filtragem por linguagem de programação.

### Constantes e estado

| Nome | Descrição |
|---|---|
| `API_URL` | Endereço da API REST do GitHub: `https://api.github.com/users/VitorAntonio-GN/repos?per_page=100` |
| `elementos` | Armazena as referências aos elementos do DOM: `filtro` (`#filtro-linguagem`), `lista` (`#lista-projetos`) e `status` (`#status-projetos`) |
| `estado` | Armazena os projetos carregados e a linguagem selecionada. O valor `""` representa a opção de todas as linguagens |

### Funções

| Função | Responsabilidade |
|---|---|
| `buscarProjetos()` | Realiza a requisição à API utilizando `fetch()`. Verifica se a resposta foi bem-sucedida e se os dados recebidos correspondem a um array. Em seguida, transforma os repositórios em objetos com as propriedades `nome`, `dataCriacao`, `descricao`, `linguagem` e `link`. Utiliza `"Sem descrição"` e `"Não informada"` como valores padrão quando necessário. |
| `formatarData(data)` | Converte uma data recebida da API para um formato legível, como `Março de 2025`, utilizando `Intl.DateTimeFormat` com a localidade `pt-BR`. Retorna `"Data não disponível"` quando a data é inválida. |
| `ordenarProjetos(projetos)` | Retorna uma cópia do array ordenada pela data de criação, da mais recente para a mais antiga, sem modificar a lista original. |
| `obterLinguagens(projetos)` | Obtém as linguagens utilizadas nos projetos, elimina valores duplicados utilizando `Set` e retorna os resultados em ordem alfabética. |
| `renderizarFiltros()` | Cria os botões de filtragem, incluindo a opção `"Todas as linguagens"` e uma opção para cada linguagem encontrada. O botão correspondente à seleção atual recebe a classe `active`. Ao clicar em um botão, atualiza o estado e executa novamente a renderização dos filtros e projetos. |
| `renderizarProjetos()` | Filtra os projetos conforme o valor de `estado.linguagemSelecionada` e cria um elemento `<article class="projeto">` para cada resultado. Os cards apresentam nome, descrição, data de criação, linguagem e link para o repositório. Exibe `"Nenhum projeto encontrado."` quando não há resultados. |
| `iniciar()` | Coordena a inicialização do script: apresenta a mensagem de carregamento, busca os projetos, ordena os resultados e executa a renderização. Em caso de sucesso, atualiza a mensagem de status e remove o elemento. Em caso de erro, registra a falha no console e apresenta uma mensagem ao usuário. |

### Fluxo de execução

A execução começa com a chamada de `iniciar()`, responsável por coordenar as operações necessárias.

Após a obtenção dos dados, os projetos são organizados e apresentados na página. Os filtros são gerados conforme as linguagens encontradas, permitindo atualizar a lista sem realizar novas requisições à API.

---

## Cursos (`js/cursos.js`)

Responsável por carregar os cursos e certificações do arquivo `data/cursos.json`, processar suas informações e organizá-los pela data de conclusão.

### Constantes e referências

| Nome | Descrição |
|---|---|
| `ARQUIVO_CURSOS` | Caminho do arquivo JSON utilizado como fonte de dados: `data/cursos.json` |
| `elementos` | Armazena as referências aos elementos do DOM: `lista` (`#lista-cursos`) e `status` (`#status-cursos`) |

### Funções

| Função | Responsabilidade |
|---|---|
| `carregarCursos()` | Realiza a requisição ao arquivo JSON utilizando `fetch()`. Verifica se a resposta foi bem-sucedida e se o conteúdo recebido é um array. Descarta itens que não sejam objetos válidos e normaliza as propriedades com valores padrão, como `"Curso sem nome"`, `"Instituição não informada"` e strings vazias. Utiliza o operador `??` para tratar valores `null` e `undefined`. |
| `converterData(dataConclusao)` | Verifica se a data segue o formato `AAAA-MM`, utilizando uma expressão regular, e se o mês informado está entre `01` e `12`. Quando válida, converte a informação em um objeto `Date`, utilizando o primeiro dia do mês às 12h. Retorna `null` quando a data é inválida. |
| `formatarData(dataConclusao)` | Converte uma data como `2026-01` para um formato legível, como `Janeiro de 2026`, utilizando `Intl.DateTimeFormat` com a localidade `pt-BR`. Retorna `"Data não informada"` quando a data é inválida. |
| `ordenarCursos(cursos)` | Retorna uma cópia do array ordenada pela data de conclusão, da mais recente para a mais antiga. Cursos com datas inválidas ou não informadas são posicionados ao final da lista. |
| `criarElemento(tag, texto)` | Cria um elemento HTML com a tag especificada e insere seu conteúdo textual utilizando `textContent`. É utilizada como função auxiliar para padronizar a criação dos elementos. |
| `criarLinkCredencial(urlCredencial)` | Verifica se existe uma URL informada, tenta convertê-la utilizando `new URL()` e aceita somente os protocolos `http:` e `https:`. Quando válida, cria um elemento `<a>` com o texto `"Ver credencial"`, `target="_blank"` e `rel="noopener noreferrer"`. Retorna `null` quando não existe uma URL válida. |
| `renderizarCursos(cursos)` | Limpa a lista e cria um elemento `<article class="curso">` para cada curso. Apresenta nome, data de conclusão e instituição, adicionando o link da credencial quando disponível. Utiliza `DocumentFragment` para reunir os elementos antes de inseri-los no DOM. Exibe `"Nenhum curso encontrado."` quando a lista está vazia. |
| `iniciar()` | Coordena o carregamento, a ordenação e a renderização dos cursos. Em caso de sucesso, atualiza a mensagem de status e remove o elemento. Em caso de erro, registra a falha no console, apresenta uma mensagem ao usuário e limpa a lista de cursos. |

### Fluxo de execução

A execução começa com a chamada de `iniciar()`, que apresenta a mensagem de carregamento e solicita os dados do arquivo JSON.

Após o carregamento, os cursos são organizados cronologicamente e apresentados na página. Quando uma credencial possui uma URL válida, seu respectivo link é criado automaticamente.

---

## Boas práticas aplicadas

- **Separação de responsabilidades:** divisão do código em funções menores, cada uma dedicada a uma tarefa específica.
- **Manipulação do DOM:** utilização de métodos como `createElement()`, `append()` e `replaceChildren()` para construir e atualizar os elementos da página.
- **Manipulação segura de textos:** utilização de `textContent` para inserir conteúdos textuais, evitando que sejam interpretados como HTML.
- **Validação de URLs:** verificação dos endereços das credenciais e restrição aos protocolos `http:` e `https:` antes da criação de links externos.
- **Imutabilidade na ordenação:** utilização do operador spread (`[...]`) com `sort()` para ordenar cópias dos arrays sem modificar os dados originais.
- **Tratamento de erros:** utilização de `try/catch` nas funções de inicialização para lidar com falhas nas requisições e no processamento dos dados.
- **Valores padrão:** utilização de valores alternativos para informações ausentes, além do operador `??` no tratamento dos dados dos cursos.
- **Formatação de datas:** utilização de `Intl.DateTimeFormat` para apresentar datas de acordo com a localidade brasileira.
- **Renderização otimizada:** utilização de `DocumentFragment` na criação da lista de cursos, agrupando os elementos antes de adicioná-los ao DOM.
- **Operações assíncronas:** utilização de `async/await` e `fetch()` para realizar requisições sem bloquear a execução normal da página.