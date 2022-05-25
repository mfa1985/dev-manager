# dev-manager
## _Seja bem vindo ao Gerenciador de Desenvolvedores_

## Sobre
O sistemas foi desenvolvido para gerenciar desenvolvedores e seus respectivos níveis.

## Composição do projeto

O projeto está dividido em 3 partes:

- 📁 dev-manager-api: Contém o projeto do backend
- 📁 dev-manager-front: Contém o projeto do frontend
- 📁 docker-compose: Contém o arquivo docker-compose.yml para disponibilização do ambiente.

Na raiz do projeto encontra-se o aquivo Insomnia_Rest_Request.json que contém um projeto com as requisições do backend para ser importanto no [Insominia](https://insomnia.rest/)

## Vizualização do projeto

O projeto está no [Heroku](https://heroku.com)

Obs: Como o plano é gratuito, quando os servidores inativos por mais de 30 minutos, os mesmo são desligados. Isso quer dizer que nos primeiros acessos pode demorar umpouco para carregar as aplicações.

- 🔗 dev-manager-front: [Frontend](http://fma-dev-manager-front.herokuapp.com/)
- 🔗 dev-manager-api: [Backend](http://fma-dev-manager-api.herokuapp.com/)
- 🔗 dev-manager-api-Swagger: [Documentação API Swagger](https://fma-dev-manager-api.herokuapp.com/api/)

### Outras informações
Para a publicação no Heroku, para a aplicação do backend foi utilizado o add-on JawsDB para disponibilizar um banco MySQl e também configurado as seguintes variáveis de ambiente que se encontra em ./dev-manager-api/env

`DB_HOST`

`DB_PORT`

`DB_USERNAME`

`DB_PASSWORD`

`DB_NAME`

## Autor
- [@mfa1985](https://github.com/mfa1985)

# dev-manager-api

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
    A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.
</p>

## Sobre

Para o backend, foi utilizado o [Nest](https://github.com/nestjs/nest) para facilitar a criação do recursos utilizados.

## Pré requisitos

Antes de iniciar o projeto, certifique-se que você tenha o [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) instalado em seu ambiente.

Como mencionado anteriormente sobre as variáveis de ambientes do arquivo ./dev-manager-api/env as mesmas devem ser configuradas para o seu ambiente do MySQL de desenvolvimento. Ou executar parcialmente o docker-compose.yml subindo apenas o banco que ja contém as variáveis compatíveis.

## Instalação

```bash
$ npm install -g @nestjs/cli
```
## Criando um app exemplo

```bash
# criando uma aplicação de exemplo
nest new my-nest-project

# acessando aplicação de exemplo
cd my-nest-project

# iniciando aplicação de exemplo
npm run start:dev
```
A api estará disponível em [http://localhost:3000](http://localhost:3000/)

A Documentação API Swagger estará disponível em [http://localhost:3000/api/](http://localhost:3000/api/)

## Iniciando o app dev-manager-api

```bash
# acessando aplicação
cd dev-manager-api

# instalando dependencias
$ npm i

# iniciando aplicação em modo de desenvolvimento
$ npm run start

# iniciando aplicação em modo de desenvolvimento
# A aplicação será carregada automaticamente quando houver alteração em algum arquivo
$ npm run start:dev

# production mode
$ npm run start:prod
```
A api estará disponível em [http://localhost:3000](http://localhost:3000/)

A Documentação API Swagger estará disponível em [http://localhost:3000/api/](http://localhost:3000/api/)

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# dev-manager-frontend

<p align="center">
  <a href="https://www.angular.io/" target="blank"><img src="https://github.com/angular/angular/raw/main/aio/src/assets/images/logos/angular/angular.png" width="200" alt="Angular Logo" /></a>
</p>

<p align="center">
    Angular is a development platform for building mobile and desktop web applications
using Typescript/JavaScript and other languages.
</p>

<p align="center">
    <a href="https://www.angular.io/" target="blank">www.angular.io</a>
</p>

## Sobre

Para o frontend, foi utilizado o [Angular](https://www.angular.io/) para facilitar a criação dos componentes utilizados.

## Pré requisitos

Antes de iniciar o projeto, certifique-se que você tenha o [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) instalado em seu ambiente.

## Instalação

```bash
$ npm install -g @angular/cli
```
## Criando um app exemplo

```bash
# criando uma aplicação de exemplo
ng new my-angular-project

# acessando aplicação de exemplo
cd my-angular-project

# iniciando aplicação de exemplo
# A aplicação será carregada automaticamente quando houver alteração em algum arquivo
ng serve
```
O frontend estará disponível em [http://localhost:4200](http://localhost:4200/)

## Iniciando o app dev-manager-api

```bash
# acessando aplicação
cd dev-manager-frontend

# instalando dependencias
$ npm i

# iniciando aplicação em modo de desenvolvimento
$ ng serve
```

A api estará disponível em [http://localhost:4200](http://localhost:4200/)

# docker-compose

<p align="center">
  <a href="https://github.com/docker/compose" target="blank"><img src="https://github.com/docker/compose/raw/v2/logo.png?raw=true" width="200" alt="DockerCompose Logo" /></a>
</p>

<p align="center">
Docker Compose is a tool for running multi-container applications on Docker defined using the Compose file format. A Compose file is used to define how the one or more containers that make up your application are configured. Once you have a Compose file, you can create and start your application with a single command: docker compose up.
</p>

## Sobre

Para a utilização do DockerCompose iremos utilizar o [Docker Compose](https://github.com/docker/compose) para facilitar a criação dos componentes utilizados.

## Pré requisitos

Antes de iniciar o projeto, certifique-se que você tenha o docker e o [Docker Compose](https://github.com/docker/compose) instalado em seu ambiente.

## Criando as imagens do docker

Dentro dos projetos, existe individualmente um arquivo Dockerfile
Ele é responsável por definir a composição das camadas da construção da imagem que iremos utilizar.

### Criando imagen do front

```bash
# Supondo que esteja na raiz do projeto
cd dev-manager-frontend

# gerando imagem
$ docker build -t dev-manager-front:latest .
```

### Criando imagen do back

```bash
# Supondo que esteja na raiz do projeto
cd dev-manager-api

# gerando imagem
$ docker build -t dev-manager-api:latest .
```

## docker-compose

O docker-compose.yml está configurado com 3 services. o banco, o backend e o front end

```yml
version: '3'

services:
  dev-manager-db:
    image: mysql:5.6
    container_name: dev-manager-db
    restart: always
    ports:
      - 3306:3306
    volumes:
      - ./dev-manager-db/:/var/lib/mysql
    environment:
      MYSQL_PASSWORD: 123
      MYSQL_ROOT_PASSWORD: 123
      MYSQL_DATABASE: dev-manager
  dev-manager-api:
    image: dev-manager-api:latest
    container_name: dev-manager-api
    restart: always
    depends_on:
      - dev-manager-db
    environment:
      DB_HOST: dev-manager-db
      DB_PORT: 3306
      DB_USERNAME: root
      DB_PASSWORD: 123
      DB_NAME: dev-manager
    ports:
      - 3000:3000
    links:
      - dev-manager-db
  dev-manager-front:
    image: dev-manager-front:latest
    build: '.'
    ports:
      - 80:80
    depends_on:
      - dev-manager-api
    links:
      - dev-manager-api
```
```bash
# Supondo que esteja na raiz do projeto
cd docker-compose

# Iniciar os containers
$ docker-compose up -d

# Vizualizar o status dos containers
$ docker-compose ps

# OU
$ docker ps

# Parar os containers
$ docker-compose down
```

A api estará disponível em [http://localhost:3000](http://localhost:3000/)

A Documentação API Swagger estará disponível em [http://localhost:3000/api/](http://localhost:3000/api/)

O frontend estará disponível em [http://localhost:80](http://localhost:80/)