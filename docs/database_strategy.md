# Estratégias de acesso a banco de dados

## Drivers nativos

Libs de baixo nível que possibilitam se conectar com banco de maneira bem abstrata, permite você escrever o seu próprio SQL, mas não é recomendado, pois é muito trabalhoso e propenso a erros e falhas de segurança.

Exemplos: `mysql`, `pg`, `sqlite3`.

## Query Builder

Libs que permitem você escrever SQL de maneira mais abstrata por meio dos recursos disponíveis na linguagem de programação, mas ainda sim permitindo a escrita de SQL, é uma boa opção para quem não quer escrever SQL puro, mas ainda sim quer ter controle sobre o que está sendo executado no banco.

Exemplos: `knex`.

## ORM Database

Libs que permitem você escrever SQL de maneira mais abstrata por meio de classes e objetos, não é necessário escrever SQL, mas ainda sim é possível, é uma boa opção para quem não quer escrever SQL puro e não quer ter controle granular sobre o que está sendo executado no banco.

Exemplos: `sequelize`, `typeorm`, `prisma`.