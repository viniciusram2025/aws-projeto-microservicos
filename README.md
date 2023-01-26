# Projeto Comunicação entre Microservicos

Projeto acadêmico porém funcionando, com objetivo de comunicar microserviços utilizando docker.


## Tecnologias Utilizadas

- Java 11
- Spring Boot
- Javascript ES6
- Node.js 16
- Express.js
- MongoDB 
- API REST
- PostgreSQL 
- RabbitMQ 
- Docker
- Docker-compose
- JWT
- Axios

## Arquitetura utilizada

São 3 API's desenvolvidas: 

- Auth-API: API de Autenticação com Node.js 16, Express.js, Sequelize, PostgreSQL, JWT e Bcrypt.
- Sales-API: API de Vendas com Node.js 16, Express.js, MongoDB, Mongoose, validação de JWT, RabbitMQ e Axios para clients HTTP.
- Product-API: API de Produtos com Java 11, Spring Boot, Spring Data JPA, PostgreSQL, validação de JWT, RabbitMQ.

Cada microserviço rodando com containers docker via docker-compose.

![image](https://user-images.githubusercontent.com/107939188/214948465-74e783f7-6ea1-47aa-a05d-a38badb20c97.png)

### Fluxo de execução de um pedido
O fluxo para realização de um pedido irá depender de comunicações síncronas (chamadas HTTP via REST) e assíncronas (mensageria com RabbitMQ).


- 01 - O início do fluxo será fazendo uma requisição ao endpoint de criação de pedido.
- 02 - O payload (JSON) de entrada será uma lista de produtos informando o ID e a quantidade desejada.
- 03 - Antes de criar o pedido, será feita uma chamada REST à API de produtos para validar se há estoque para a compra de todos os produtos.
- 04 - Caso algum produto não tenha estoque, a API de produtos retornará um erro, e a API de vendas irá lançar uma mensagem de erro informando que não há estoque.
- 05 - Caso exista estoque, então será criado um pedido e salvo no MongoDB com status pendente (PENDING).
- 06 - Ao salvar o pedido, será publicada uma mensagem no RabbitMQ informando o ID do pedido criado, e os produtos com seus respectivos IDs e quantidades.
- 07 - A API de produtos estará ouvindo a fila, então receberá a mensagem.
- 08 - Ao receber a mensagem, a API irá revalidar o estoque dos produtos, e caso todos estejam ok, irá atualizar o estoque de cada produto.
- 09 - Caso o estoque seja atualizado com sucesso, a API de produtos publicará uma mensagem na fila de confirmação de vendas com status APPROVED.
- 10 - Caso dê algum problema na atualização, a API de produtos publicará uma mensagem na fila de confirmação de vendas com status REJECTED.
- 11 - Por fim, a API de pedidos irá receber a mensagem de confirmação e atualizará o pedido com o status retornado na mensagem.

## Comandos Docker
Abaixo a lista de comandos para rodar os containers.


**Container Auth-DB**

``docker run --name auth-db -p 5432:5432 -e POSTGRES_DB=auth-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=123456 postgres:11``


**Container Product-DB**

``docker run --name product-db -p 5433:5432 -e POSTGRES_DB=product-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=123456 postgres:11``


**Container Sales-DB**

``docker run -d -p 27017:27017 -p 28017:28017 -e MONGO_INITDB_ROOT_USERNAME="admin" -e MONGO_INITDB_DATABASE="sales" -e MONGO_INITDB_ROOT_PASSWORD=123456 mongo``


**Container RabbitMQ**

``docker run --name sales-rabbit -p 5672:5672 -p 25676:25676 -p 15672:15672 rabbitmq:3-management``


**Execução docker-compose**

``docker-compose up --build``

---
## Autor

Vinicius de Paula

Via Curso Udemy - [Comunicação entre Microserviços](https://www.udemy.com/course/comunicacao-entre-microsservicos/)













