# DESAFIO TRANSFEERA

## Linguagem
- [NodeJS](https://nodejs.org/en/)

## Banco de dados
- [Postgres](https://www.postgresql.org/download/)

## Instalação do projeto
Baixar e configurar na máquina o NodeJS assim como o banco de dados POSTGRES, a cópia do projeto pode ser feita via clone ou manualmente através GitHub Web.

```console
git clone 
cd DesafioTransfeera
npm install
```

## Confuguração do Banco de dados
Para criar o banco de dados deve rodar os scripto a baixo, junto da criação da estrurura é possível criar um pré cadastro nas tabelas.

```sql

create schema banco;

create table banco.bancos (
	codigo_banco text primary key,
	nome text not null,
	logotipo text
);

create table banco.contas (
	cpf_cnpj text not null,
	nome text not null,
	email text not null,
	situacao text not null,
	codigo_banco text not null,
	tipo_conta text not null,
	agencia text not null,
	agencia_digito text,
	conta text not null,
	conta_digito text,
	PRIMARY KEY (cpf_cnpj, codigo_banco, tipo_conta)
);

/*Pré cadastro das tabelas (opcioal)*/

INSERT INTO banco.bancos (codigo_banco, nome, logotipo)
values
('237', 'Bradesco', '/img/bradesco.png'),
('104', 'Caixa Econômica Federal', '/img/caixa.png'),
('756', 'Sicoob', '/img/sicoob.png'),
('001', 'Banco do Brasil', '/img/bancodobrasil.png');

INSERT INTO banco.contas
(cpf_cnpj, nome, email, situacao, codigo_banco, tipo_conta, agencia, agencia_digito, conta, conta_digito)
values 
('08106956958', 'Gabriel Demarchi Momm', 'gabriel.momm@gmail.com', 'VALIDADO', '237', 'CONTA_CORRENTE', '976', 'X', '89221', '1'),
('02193523912', 'Jose da Silva', 'jsilva@gmail.com', 'VALIDADO', '237', 'CONTA_CORRENTE', '0814', '0', '01002713', '9')
;

```

## Preenchimento das Variáveis de ambiente
Criar um arquivo ".env" na raiz do projeto com e preencher os parâmetros abaixo: 
```
DB_HOST
DB_USER
DB_PORT
DB_NAME
DB_SCHEMA
NODE_PORT
```

## Execução
Para a execução do projeto deve-se utilizar o código abaixo no terminal:

`npm start`

## Teste Unitário e Ingração
A execução dos testes unitários e de integração podem ser executadas diretamente no terminal através do comando abaixo. É pré-requisito deixar rodando a execução padrão "npm start"

`npm test`

