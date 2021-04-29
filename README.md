# Projeto API Node.js

## Descrição do Projeto
<p align="left"> API desenvolvida com Node JS e Express. </p>

### Features

- [x] Criar conta de usuário (sign up);
- [x] Confirmação do e-mail do usuário;
    - [x] envio de e-mail com link (nodemailer e handlebars); 
- [x] Login (token jWt);
- [x] Refresh Token (token opaco);
    - [ ] renovar token de acesso atraves do refresh token;
- [x] Autenticação do Token jwt (estratégia Bearer);
- [x] Logout;
- [ ] Recuperação de senha;
- [x] Cadastro de Usuários (administrador);
- [x] Cadastro de Categorias;
- [x] Cadastro de Artigos;


### ✔ Pré-requisitos

Antes de começar, é preciso instalar em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e [PostgreSQL](https://www.postgresql.org/) 
Além disto, tenha um editor para trabalhar com o código, como por exemplo o [VSCode](https://code.visualstudio.com/)


### ⚙ Configurando o Projeto

```bash
# Clone este repositório
$ git clone <https://github.com/guilhermetempesta/api-nodejs.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd api-nodejs

# Execute o comando para inicializar o projeto
$ npm init -y

# Instale o nodemon (em modo de desenvolvimento)
$ npm i --save-dev nodemon

# Instale as dependências
$ npm i
```


### ⚙ Configurando o Banco de Dados

- Baixe e instale a última versão do postgreSQL

- Crie o arquivo .env, com as configurações da conexão, seguindo como exemplo as informações contidas no arquivo <i> env_file </i> 

- Execute a sequencia abaixo no terminal: 

```bash
# Acesse a pasta do projeto no terminal/cmd
$ cd api-nodejs

# Execute o comando para criar o banco de dados default
$ npx sequelize db:create 

# Execute as migrations para criar a estrutura do banco de dados
$ npx sequelize db:migrate
```


### ⚙ Rodando o Backend (servidor)

```bash
# Acesse a pasta do projeto no terminal/cmd
$ cd api-nodejs

# Execute a aplicação (em modo de desenvolvimento)
$ npm start

# O servidor inciará, por padrão, na porta: 3030
```

### 🛠 Tecnologias

As seguintes ferramentas foram usadas no desenvolvimento do projeto:

- [Node.js](https://nodejs.org/en/)
- [nodemon] : launcher utilizado em desenvolvimento 
- [accesscontrol] : controle de acesso por perfil de usuário nas requisições
- [bcrypt-nodejs] : criptografia de dados
- [body-parser] : interpretar o body da requisição
- [consign] : injeção de dependencias
- [cors] : disponibilizar a api para outras aplicações
- [date-fns] : biblioteca para trabalhar com datas
- [dotenv] : trabalhar com variaveis de ambiente
- [express]	: framework web
- [handlebars] : gerar template html (para trabalhar com envio de e-mail)
- [jsonwebtoken] : estrategias de autenticação - json web token (JWT)
- [node-schedule] : criar tarefas agendadas
- [nodemailer] : envio de e-mails no node js
- [mongoose] : ORM para persistencia de dados no mongoDB
- [passport] : middleware para autenticação
- [passport-http-bearer] : framework do passport para a estratégia de autenticação bearer token
- [passport-local] : framework do passport para a estratégia de autenticação local
- [pg] :  banco de dados relacional PostgreSql
- [pm2] : launcher utilizado em produção
- [redis] : banco de dados noSQL (chave/valor) para armazenar tokens
- [sequelize] : ORM para presistencia de dados
- [sequelize-cli] : interface de linhas de comando do sequelize


### 📜 Licença
Este projeto está sob a licença [MIT](https://opensource.org/licenses/MIT).
