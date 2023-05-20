import 'dotenv/config'
import fastify from 'fastify'
import { makeTransactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)

app.addHook('preHandler', async (request) => {
  console.debug(`[${request.method}] ${request.url}`)
})

app.register(makeTransactionsRoutes, {
  prefix: 'transactions',
})

export { app }
