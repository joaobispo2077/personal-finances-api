import 'dotenv/config'
import fastify from 'fastify'
import { configs } from './configs'
import { makeTransactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

const { PORT } = configs

const app = fastify()

app.register(cookie)

app.register(makeTransactionsRoutes, {
  prefix: 'transactions',
})

app
  .listen({
    port: PORT,
  })
  .then(() => console.log(`Server is running on port ${PORT}`))
  .catch((err) => console.log(err))
