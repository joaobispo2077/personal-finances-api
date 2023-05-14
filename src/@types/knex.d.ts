// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  interface Transactions {
    id: string
    title: string
    amount: number
    created_at: Date
    session_id?: string
  }

  export interface Tables {
    transactions: Transactions
  }
}
