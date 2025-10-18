1. Rodar o docker c o postgres

```bash
docker run --name postgres-crud -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=crud_db -p 5432:5432 -d postgres
```

2. Rodar o node server

```bash
cd backend
nodemon server.js
```

3. Criar tabela no banco
```bash
docker exec -it postgres-crud psql -U postgres -d crud_db
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT,
    email VARCHAR(100)
);
```


#### 

O que falta fazer:

1. Popular o banco usando o generateData
2. Testar manuais do crud usando psotman ou imsonia 
3. Configurar os testes de carga no JMeter (se tive b.o pra instala me avisa q do uma mão)
