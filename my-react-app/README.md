# Sobre o Projeto

## AllInOneMart - E-commerce com React, TypeScript e Vite

Este projeto é um exemplo de um e-commerce desenvolvido com React, TypeScript e Vite. Ele utiliza o Material-UI (MUI) para a interface do usuário e consome uma API REST para gerenciar produtos e o processo de checkout.

## Funcionalidades

- **Catálogo de Produtos**: Exibe uma lista de produtos com paginação.
- **Busca**: Permite buscar produtos por nome, descrição, categoria ou marca.
- **Carrinho de Compras**: Adiciona e remove produtos do carrinho, com atualização em tempo real.
- **Checkout**: Finaliza a compra e exibe um número de pedido.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (versão 6 ou superior)

## Instalação
1. **entrar na pasta:**

   ```cd my-react-app```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

## Executando o Projeto

1. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

2. **Acesse o projeto:**

   Abra o navegador e acesse `http://localhost:3000`.

## Scripts Disponíveis

- **`npm run dev`**: Inicia o servidor de desenvolvimento.
- **`npm run build`**: Compila o projeto para produção.
- **`npm run lint`**: Executa o ESLint para verificar problemas de linting.
- **`npm run preview`**: Visualiza a versão de produção do projeto.

## Estrutura do Projeto

- **`src/`**: Contém o código-fonte do projeto.
  - **`components/`**: Componentes React reutilizáveis.
  - **`hooks/`**: Hooks personalizados para lógica de negócios.
  - **`types/`**: Definições de tipos TypeScript.
  - **`constants/`**: Constantes usadas no projeto.
  - **`theme/`**: Configuração de tema do Material-UI.
  - **`assets/`**: Arquivos estáticos como imagens e ícones.

## Configuração do ESLint

O projeto utiliza ESLint para garantir a qualidade do código. A configuração está definida em `eslint.config.js` e inclui regras para React, TypeScript e hooks.

## API

O projeto consome uma API REST documentada em `http://localhost:8888/docs`. Certifique-se de que a API esteja rodando antes de iniciar o projeto.

## Observações

- O carrinho de compras é gerenciado usando o `localStorage`.
- O projeto utiliza o Material-UI para estilização, então certifique-se de que as dependências do MUI estejam instaladas.