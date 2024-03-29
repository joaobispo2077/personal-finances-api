import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envConfig = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
  HOST: z.string().default('localhost'),
})

export const _configs = envConfig.safeParse(process.env)

if (!_configs.success) {
  console.error(`Invalid environment variables`, _configs.error.format())
  throw new Error(`Invalid environment variables`)
}

export const configs = _configs.data
