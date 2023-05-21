import { knex as setupKnex, Knex } from 'knex'
import { configs } from './configs'

const { DATABASE_URL, DATABASE_CLIENT } = configs

const createConnectionStrategy = () => {
  if (DATABASE_CLIENT === 'sqlite') {
    return {
      filename: DATABASE_URL,
    }
  }

  return DATABASE_URL
}

export const databaseConfig: Knex.Config = {
  client: DATABASE_CLIENT,
  connection: createConnectionStrategy(),
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(databaseConfig)
