import fastify from 'fastify'

const app = fastify()

const PORT = Number(process.env.PORT) || 3333

app.get('/hello', () => {
  return 'worlds'
})

app
  .listen({
    port: PORT,
  })
  .then(() => console.log(`Server is running on port ${PORT}`))
  .catch((err) => console.log(err))
