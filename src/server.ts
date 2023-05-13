import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

const PORT = Number(process.env.PORT) || 3333

app.get('/tables', async () => {
  const tables = await knex('sqlite_schema').select('*')
  return tables
})

app
  .listen({
    port: PORT,
  })
  .then(() => console.log(`Server is running on port ${PORT}`))
  .catch((err) => console.log(err))
