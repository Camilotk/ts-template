# Template TypeScript

Este repositório é um template simples para criar novos projetos TypeScript diretamente na UI do GitHub. Ele foi projetado para economizar tempo, eliminando a necessidade de escrever arquivos boilerplate como `package.json` e `tsconfig.json` toda vez que você inicia um novo projeto.

## Jogo da Vida

O script do Jogo da Vida (Game of Life) é um exemplo de um programa que você pode executar para verificar se tudo está funcionando corretamente. O Jogo da Vida é um autômato celular concebido pelo matemático britânico John Horton Conway em 1970. É um jogo de zero jogadores, o que significa que sua evolução é determinada por seu estado inicial, não necessitando de nenhuma entrada posterior. 

Neste repositório, o Jogo da Vida é implementado em TypeScript. Ele segue as regras padrão do Jogo da Vida:

1. **Superpopulação**: Se uma célula viva é cercada por mais de três células vivas, ela morre.
2. **Subpopulação**: Se uma célula viva é cercada por menos de duas células vivas, ela morre.
3. **Sobrevivência**: Se uma célula viva é cercada por duas ou três células vivas, ela continua a viver.
4. **Nascimento**: Se uma célula morta é cercada por exatamente três células, ela se torna uma célula viva.

## Como executar este projeto

Para executar este projeto, você precisará ter o Node.js, Volta e Yarn instalados em seu sistema. Siga estas etapas:

1. Clone este repositório para o seu sistema local.
2. Navegue até o diretório do projeto no terminal.
3. Execute `yarn install` para instalar todas as dependências do projeto.
4. Execute `yarn dev` para iniciar o script do Jogo da Vida.
5. Execute o JavaScript gerado com `node dist/index.js`.

Esperamos que você ache este template útil para seus projetos TypeScript!
