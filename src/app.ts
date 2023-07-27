import fastify from 'fastify'
import { makeTransactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'
import fastifySwagger, { SwaggerOptions } from '@fastify/swagger'
import fastifySwaggerUi, { FastifySwaggerUiOptions } from '@fastify/swagger-ui'
import pkg from '../package.json'
import { configs } from './configs'

const app = fastify()

const swaggerOptions: SwaggerOptions = {
  swagger: {
    info: {
      title: pkg.name,
      description: pkg.description,
      version: pkg.version,
    },
    host: configs.HOST,
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [{ name: 'Default', description: 'Default' }],
  },
}

const swaggerUiOptions: FastifySwaggerUiOptions = {
  routePrefix: '/docs',
}

app.register(fastifySwagger, swaggerOptions)
app.register(fastifySwaggerUi, swaggerUiOptions)

app.register(cookie)

app.addHook('preHandler', async (request) => {
  console.debug(`[${request.method}] ${request.url}`)
})

app.register(makeTransactionsRoutes, {
  prefix: 'transactions',
})

export { app }
