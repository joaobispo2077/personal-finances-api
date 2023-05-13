import 'dotenv/config'
import { z } from 'zod'

const envConfig = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
})

export const _configs = envConfig.safeParse(process.env)

if (!_configs.success) {
  console.error(`Invalid environment variables`, _configs.error.format())
  throw new Error(`Invalid environment variables`)
}

export const configs = _configs.data
