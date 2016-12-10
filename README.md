# Oradorapp

Aplicación de muestra sobre cómo implementar GraphQL. Se va a utilizar como demo en una charla que darán @leoasis y @p4bloch en la [meetup GraphQL de Buenos Aires](https://www.meetup.com/es-ES/GraphQL-BA/)

## Setup

### Server

Para usar sqlite, crear el archivo `server/db/dev.sqlite3`. Para usar otro motor, configurar el kenxfile acorde.

1. Correr las migraciones:
  ```
  npm run db:migrate
  ```
2. Correr los seeders
  ```
  npm run db:seed
  ```
3. Starteá el server
  ```
  npm start
  ```
