import { app } from './app'
import { configs } from './configs'

const { PORT } = configs

app
  .listen({
    port: PORT,
  })
  .then(() => console.log(`Server is running on port ${PORT}`))
  .catch((err) => console.log(err))
