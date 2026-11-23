# Documentação dos dados dos cursos

## Visão geral

Os cursos e certificações apresentados no portfólio são armazenados no arquivo `data/cursos.json`, utilizando o formato JSON (*JavaScript Object Notation*).

O arquivo contém um array de objetos, no qual cada objeto representa um curso ou certificação e suas respectivas informações.

Os dados são carregados pelo arquivo `js/cursos.js`, que realiza a leitura do JSON, organiza as informações e gera os elementos HTML apresentados na página.

## Estrutura dos dados

Cada curso segue a seguinte estrutura:

```json
[
    {
        "nome": "Sintaxe Básica com Java",
        "instituicao": "DIO",
        "dataConclusao": "2025-12",
        "credencial": "RSF9ICBX",
        "urlCredencial": "https://www.dio.me/certificate/RSF9ICBX/share"
    }
]
```

### Descrição dos campos

| Campo | Tipo | Descrição |
|---|---|---|
| `nome` | String | Nome do curso ou certificação |
| `instituicao` | String | Instituição ou plataforma responsável |
| `dataConclusao` | String (`AAAA-MM`) | Ano e mês de conclusão, utilizados na exibição e ordenação |
| `credencial` | String ou `null` | Código de identificação da credencial, armazenado nos dados, mas ainda não exibido na página |
| `urlCredencial` | String ou `null` | Endereço para consulta ou verificação da credencial |

Os campos `nome` e `instituicao` possuem valores alternativos definidos no JavaScript caso estejam ausentes ou sejam `null`. Os demais campos também recebem valores padrão vazios quando não são informados.

## Como adicionar um curso

Para adicionar um novo curso ou certificação, basta incluir outro objeto no array de `data/cursos.json`, respeitando a estrutura definida.

Exemplo:

```json
{
    "nome": "Nome do curso",
    "instituicao": "Instituição",
    "dataConclusao": "2026-01",
    "credencial": null,
    "urlCredencial": null
}
```

Cada objeto deve ser separado por vírgula, respeitando a sintaxe do JSON. O último elemento do array não deve possuir vírgula ao final.

## Tratamento e organização dos dados

O arquivo `js/cursos.js` realiza algumas operações antes de apresentar os cursos:

- **Validação da resposta:** verifica se o arquivo foi carregado corretamente e se seu conteúdo possui a estrutura de um array.
- **Padronização:** organiza os campos de cada curso e define valores alternativos para informações ausentes.
- **Validação das datas:** verifica se `dataConclusao` segue o formato `AAAA-MM` e se o mês informado está entre `01` e `12`.
- **Formatação:** converte as datas válidas para um formato de exibição em português, contendo o mês por extenso e o ano.
- **Ordenação:** organiza os cursos do mais recente para o mais antigo, posicionando aqueles com datas inválidas ou não informadas ao final da lista.
- **Validação das credenciais:** verifica se `urlCredencial` contém um endereço válido e utiliza o protocolo HTTP ou HTTPS antes de criar o link.

## Observações

- A data de conclusão deve seguir o formato `AAAA-MM`, utilizando quatro dígitos para o ano e dois para o mês.
- Os campos `credencial` e `urlCredencial` podem receber `null` quando não houver informações disponíveis.
- A ordem dos cursos no arquivo JSON não interfere na exibição, pois a ordenação é realizada automaticamente pelo JavaScript.
- Cursos com datas inválidas ou não informadas são posicionados ao final da lista.
- O código da credencial é armazenado, mas não é apresentado diretamente na página.
- O link **"Ver credencial"** é criado somente quando existe uma URL válida com protocolo HTTP ou HTTPS.
- Quando não há uma URL de credencial válida, o link não é exibido.

## Manutenção

A atualização dos cursos não exige alterações nos arquivos HTML ou JavaScript. Basta modificar `data/cursos.json`, adicionando, removendo ou atualizando os objetos conforme necessário.

Dessa forma, o conteúdo apresentado no portfólio pode ser mantido atualizado sem modificar a lógica responsável pela renderização dos cursos.