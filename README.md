# Instagram-Clone-API

# Conteudos

* [Sobre](#Sobre)
* [Features](#Features)
* [Geatting Started](#Geatting-Started)
* [Instalação](#instalacao)
* [Como usar](#como-usar)
* [Tecnologias](#tecnologias)

### A ideia é criar uma API clone do instagram

## Features

- [X] Cadastro de usuário 
- [X] Upload de fotos
- [X] Autenticação 
- [X] Seguidores
- [X] Feed personalizado de usuário

# Getting started

## Instalando as dependêcias:

```
npm install
```

## Não esqueça de criar o arquivo de variáveis de ambiente seguindo o exemplo do arquivo "envExample", e criar um arquivo ormconfig.json para conexão com banco de dados usando typeorm

```
.env
ormconfig.json
```

## Rode as migrations usando o seguinte comando:

```
npm run typeorm migration:run
```

## Rodando o projeto:

```
npm run dev
```

## Como Usar

#### Depois de finalizado a instalação e o setup básico, agora é só criar as rotas da API em programas como "postman" ou "insomnia" ou até mesmo servir ao front-end. Lembre-se que quase toda rota precisa de um token que é dado assim que o usuário efetua o login, esse token deve ser passado no header da requisição com nome "token" que é expirado a cada 2h, Ordem recomendada para uso:

#### -> utils = Rota na qual é criado vários usuários aleatorios cujo a senha é seu primeiro nome + 123, exemplo: "nome123".
#### -> loginRoutes.ts = Criação de usuário, login.
#### -> profileRoutes.ts = Perfil de usuários, upload de foto e foto do perfil, deletar fotos, criar seguidores, verificar seguidores.  
#### -> files.ts = Rota na qual pode carregar a imagem que foi feito upload
#### -> feedRoutes.ts = Rota relacionada ao feed de usuário, listagem de posts, like nas fotos.


## Tecnologias do Back-End

### Typescript e Node com PostgreSql

## Tecnologias do Front-End

### Apenas React
#### Disponível em: https://github.com/SrWalkerB/Instagram-Clone-Front-End

