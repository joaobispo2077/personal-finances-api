import { app } from './app'
import { configs } from './configs'

const { PORT, HOST } = configs

app
  .listen({
    host: HOST,
    port: PORT,
  })
  .then(() => console.log(`Server is running on port ${PORT}`))
  .catch((err) => console.log(err))
