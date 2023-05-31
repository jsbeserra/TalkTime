<h4 align="movielist"> 
	🚧 Em desenvolvimento... 🚧
</h4>


<!-- ABOUT THE PROJECT -->
## Sobre o projeto
Este projeto é uma aplicação de chat desenvolvida com o objetivo de estudos. Nele, abordamos conceitos como Clean Architecture, SOLID, TDD, DDD, Microserviços, Mensageria, Estratégias de Cache, Comunicação em Tempo Real, Escalabilidade e Resiliência.


## Microserviços e Escalabilidade
O back-end da nossa aplicação foi desenvolvido utilizando microserviços em Node.js e C# ASP.NET Core 7. Essa abordagem nos permite dividir a lógica em serviços independentes, tornando o sistema mais flexível e escalável. Cada microserviço é responsável por uma funcionalidade específica, como autenticação, gerenciamento de contatos e troca de mensagens.

Para possibilitar a comunicação entre esses microserviços, utilizamos um mecanismo de mensageria. Através dessa abordagem, os serviços trocam mensagens entre si, permitindo a coordenação e o compartilhamento de informações de forma assíncrona e desacoplada. Essa comunicação baseada em mensageria contribui para uma arquitetura distribuída mais robusta e resiliente.


## 🚀Tecnologias utilizadas
Back-end
* [Node](https://nodejs.org/en)
* [C# ASP.NET Core 7](https://learn.microsoft.com/en-us/aspnet/core/release-notes/aspnetcore-7.0?view=aspnetcore-7.0)
* [Entity Framework](https://learn.microsoft.com/pt-br/ef/)
* [TypeScript](https://www.typescriptlang.org/)
* [MongoDB](https://www.mongodb.com/)
* [Redis](https://redis.io/)
* [Kafka](https://kafka.apache.org/)
* [Jest](https://jestjs.io/pt-BR/)
* [xUnit](https://xunit.net/)

Front-end
* [ReactJS](https://pt-br.reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vitejs.dev/)
* [Jest](https://jestjs.io/pt-BR/)
* [Chakra-Ui](https://chakra-ui.com/)
</br>
## Tela principal
<h1 align="center">
  <img alt="movielist" title="#movielist" src="images/tela principal.png" />
</h1>

## Modal de notificações
<h1 align="center">
  <img alt="movielist" title="#movielist" src="images/convite.png" />
</h1>

## Modal para pesquisa de novos contatos
<h1 align="center">
  <img alt="movielist" title="#movielist" src="images/busca de contatos.png" />
</h1>

## Tela de login
<h1 align="center">
  <img alt="movielist" title="#movielist" src="images/login.png" />
</h1>

## Tela de cadastro
<h1 align="center">
  <img alt="movielist" title="#movielist" src="images/cadastro.png" />
</h1>


## Deseja testar?

1 - Para isso basta ir até a pasta back-end abrir o terminal e rodar o comando

**docker-compose up**
#
2 - Abra cada uma das pastas dentro da pasta back-end (authentication, contacts, messager), depois abra um terminal para cada uma delas.
agora em cada um dos terminais rode o comando.

**yarn** ou **npm i** para instalar as dependências
quando finalizar rode o comando yarn dev ou npm run dev
#
3 - Agora abra a pasta front-end, abra um terminal para ela e digite os comandos 

**yarn** ou **npm i** para instalar as dependências
quando finalizar rode o comando yarn dev ou npm run dev

#
Futuramente sera possível rodar tudo com um só comando.
