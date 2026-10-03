# Design System: FRΛZE

## 1. Tema visual e atmosfera

Portfólio autoral, tecnológico e expressivo para um estúdio de design gráfico. A interface combina fundo off-black, tipografia editorial de grande escala e composições assimétricas. A densidade é equilibrada, com bastante espaço negativo nas áreas institucionais e maior riqueza visual nas demonstrações de projetos. O movimento deve comunicar construção e transformação, sem competir com o conteúdo.

Direção: criatividade 8/10, densidade 5/10, variação 7/10 e movimento 7/10.

## 2. Paleta e funções

- **Canvas Noturno** (`#09090B`) — fundo principal, evitando preto puro.
- **Superfície Profunda** (`#121217`) — cards, navegação e áreas elevadas.
- **Superfície Elevada** (`#1A1A22`) — modais, controles e estados de destaque.
- **Branco Editorial** (`#F5F5F7`) — títulos e conteúdo de máxima prioridade.
- **Cinza Informativo** (`#A1A1AA`) — textos de apoio e descrições.
- **Cinza Silencioso** (`#71717A`) — legendas e metadados.
- **Violeta FRΛZE** (`#8B5CF6`) — único acento; CTAs, estados ativos e foco.
- **Borda Sutil** (`rgba(255,255,255,0.08)`) — separação estrutural sem peso visual.

O violeta é uma decisão explícita da identidade FRΛZE. Deve ser usado com contenção, sem brilho neon externo ou múltiplos gradientes concorrentes.

## 3. Tipografia

- **Display:** Syne e Cabinet Grotesk, pesos 700–900, tracking fechado e títulos responsivos com `clamp()`.
- **Texto:** Geist, peso 400–600, entrelinha relaxada e largura máxima aproximada de 60 caracteres.
- **Metadados:** Geist Mono, caixa alta e espaçamento entre letras para categorias e etapas.
- Títulos comunicam atitude; textos explicam benefício de forma curta e comercial.
- Evitar Inter, fontes serifadas genéricas, caixa alta em parágrafos e corpos menores que 14 px.

## 4. Componentes

- **Botão primário:** formato pill, violeta sólido ou gradiente muito discreto, texto branco e resposta tátil com leve redução de escala.
- **Botão secundário:** vidro escuro com borda sutil; usar somente quando houver uma ação realmente distinta.
- **Cards de projeto:** imagem dominante, informação curta e elevação suave. O hover amplia somente a mídia, preservando a geometria.
- **Navegação:** fixa, translúcida e compacta. No celular, menu vertical com alvos mínimos de 44 px.
- **Formulários:** rótulo acima, superfície escura, borda visível no foco e mensagem contextual abaixo.
- **Abas de processo:** formato segmentado, seleção simultaneamente indicada por cor, contraste e `aria-selected`.
- **Mockups:** construídos em HTML/CSS, com bordas físicas discretas e sombras tingidas pelo fundo.

## 5. Princípios de layout

- Conteúdo contido em até 1440 px, com margens fluidas.
- Hero assimétrico: mensagem à esquerda e arte tridimensional à direita.
- CSS Grid para estruturas principais; Flexbox apenas para alinhamentos locais.
- Seções alternam ritmos e proporções para evitar repetição de grids genéricos.
- Abaixo de 768 px, composições viram uma coluna, botões ganham áreas de toque generosas e nenhum elemento pode criar rolagem horizontal.
- Elementos sobrepostos são permitidos apenas em mockups ilustrativos, nunca entre textos essenciais.

## 6. Movimento e interação

- Animar prioritariamente `transform` e `opacity`.
- Usar easing `cubic-bezier(0.16, 1, 0.3, 1)` para sensação física e controlada.
- Entradas em listas devem ter pequenos atrasos sequenciais.
- A demonstração de construção responde continuamente à rolagem e deve inverter corretamente ao subir.
- Inclinação por cursor existe somente em dispositivos com ponteiro preciso e em camada separada.
- `prefers-reduced-motion: reduce` apresenta o estado final estático, mantendo conteúdo e controles compreensíveis.

## 7. Linguagem

- Direta, humana, confiante e orientada ao valor para o cliente.
- Preferir frases como “Dando cara à sua empresa” e “Mostrando sua empresa para o mundo”.
- Evitar clichês como “eleve”, “revolucione”, “next-gen” e promessas com métricas inventadas.
- Não criar estatísticas, clientes ou resultados sem dados reais fornecidos.

## 8. Padrões proibidos

- Preto puro, arco-íris de acentos ou brilho neon excessivo.
- Três cards genéricos idênticos usados apenas para preencher espaço.
- Métricas fabricadas, nomes genéricos de empresas ou depoimentos fictícios.
- Textos instrucionais redundantes e animações que bloqueiem leitura.
- Rolagem horizontal no celular, alvos menores que 44 px ou foco invisível.
- Movimento de layout baseado em `top`, `left`, `width` ou `height` durante a rolagem.

