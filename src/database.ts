import { knex as setupKnex, Knex } from 'knex'
import { configs } from './configs'

const { DATABASE_URL } = configs

export const databaseConfig: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(databaseConfig)
