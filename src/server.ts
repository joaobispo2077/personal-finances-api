import 'dotenv/config'
import fastify from 'fastify'
import { knex } from './database'
import { configs } from './configs'

const { PORT } = configs

const app = fastify()

app.get('/tables', async () => {
  const transaction = await knex('transactions').select('*')

  return transaction
})

app
  .listen({
    port: PORT,
  })
  .then(() => console.log(`Server is running on port ${PORT}`))
  .catch((err) => console.log(err))
