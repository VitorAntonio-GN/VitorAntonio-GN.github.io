# Documentação do CSS

## Visão geral

A estilização do portfólio está concentrada no arquivo `css/style.css`. A folha de estilos é organizada em seções comentadas, agrupando as regras conforme a responsabilidade de cada componente e facilitando a manutenção do código.

O projeto utiliza recursos do CSS3, como variáveis personalizadas, Flexbox, Grid Layout, animações, transições e media queries.

## Organização do arquivo

As seções da folha de estilos abrangem as seguintes áreas:

| Área | Descrição |
|---|---|
| Variáveis | Definição das cores, largura máxima do conteúdo, fontes e transições |
| Reset e estilos gerais | Configurações globais, `box-sizing`, rolagem suave, estilos do `body`, links, foco e seleção |
| Links | Estilos compartilhados para links, incluindo cores e efeitos de hover |
| Cabeçalho e navegação | Estilização do cabeçalho com posicionamento `sticky`, navegação e efeito de desfoque com `backdrop-filter` |
| Hero | Layout em duas colunas, fundo decorativo e efeitos visuais da apresentação inicial |
| Computador | Construção de uma ilustração decorativa utilizando exclusivamente CSS |
| Seções gerais | Estilos compartilhados de `.content-section`, títulos e parágrafos |
| Habilidades | Organização centralizada das habilidades, com separadores visuais |
| Filtros de projetos | Aparência dos botões de filtragem por linguagem, incluindo estados de interação |
| Projetos e cursos | Estilização dos cards de projetos e cursos, organizados em layouts com Grid |
| Mensagens de status | Apresentação das mensagens de carregamento e erro |
| Contato | Seção de contato com fundo azul e elementos decorativos |
| Rodapé | Estilização da área final da página |
| Animações | Definição da animação `blink`, utilizada na ilustração do computador |
| Responsividade | Media queries para adaptação do layout a diferentes tamanhos de tela |
| Movimento reduzido | Ajustes de animações e transições conforme a preferência de movimento do usuário |

## Variáveis CSS

As variáveis globais são declaradas no seletor `:root`, permitindo centralizar valores reutilizados ao longo da folha de estilos. Essa abordagem facilita alterações na identidade visual sem a necessidade de modificar cada ocorrência individualmente.

| Variável | Valor | Aplicação |
|---|---|---|
| `--color-background` | `#000` | Fundo principal da página |
| `--color-surface` | `#0D0D0D` | Superfície dos botões de filtro |
| `--color-text` | `#F2F2F2` | Texto principal |
| `--color-text-secondary` | `#A6A6A6` | Textos secundários |
| `--color-primary` | `#4F7DFF` | Cor primária de destaque |
| `--color-primary-light` | `#86A5FF` | Efeitos de destaque e hover |
| `--color-primary-dark` | `#010326` | Elementos com fundo azul escuro |
| `--color-contact` | `#244CCB` | Fundo da seção de contato |
| `--color-border` | `#262626` | Bordas e divisórias |
| `--container-width` | `1120px` | Largura máxima do conteúdo |
| `--font-main` | `Inter` | Fonte principal |
| `--font-heading` | `Space Grotesk` | Fonte dos títulos |
| `--transition` | `200ms ease` | Configuração padrão das transições |

## Convenção de nomenclatura

As classes dos componentes utilizam, em parte, a metodologia **BEM** (*Block Element Modifier*), que organiza os nomes em blocos e elementos relacionados.

O padrão de nomenclatura para elementos segue a estrutura:

```css
.bloco__elemento
```

Alguns exemplos presentes no projeto:

- `.hero__content`
- `.computer__screen`
- `.contact-section__eyebrow`

Os cards de projetos e cursos criados dinamicamente pelo JavaScript utilizam as classes `.projeto` e `.curso`, respectivamente.

Essa organização facilita a identificação dos componentes e a associação entre os elementos HTML e suas regras de estilização.

## Responsividade

A adaptação do layout é realizada por meio de media queries, utilizando três pontos de quebra principais:

| Largura da tela | Principais alterações |
|---|---|
| `≤ 850px` | Redução das margens, ajuste das proporções do hero para `1fr 0.85fr` e redução dos títulos |
| `≤ 650px` | Cabeçalho organizado em coluna, hero em uma coluna, redução dos espaçamentos e ajustes na seção de contato |
| `≤ 420px` | Cards organizados em uma coluna, links posicionados abaixo dos textos e lista de habilidades mais compacta |

Essas adaptações permitem preservar a organização e a legibilidade do conteúdo em telas de diferentes dimensões.

## Movimento reduzido

O projeto utiliza a media query `prefers-reduced-motion` para respeitar a preferência do usuário por uma experiência com menos movimento.

Quando essa configuração está ativa no sistema operacional, as animações e transições são desativadas ou reduzidas, evitando efeitos visuais desnecessários e proporcionando uma navegação mais confortável.

Essa implementação contribui para a acessibilidade do portfólio, considerando usuários que preferem ou necessitam de uma interface com menos movimento.