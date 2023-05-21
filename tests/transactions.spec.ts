import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new transaction', async () => {
    const response = await request(app.server).post('/transactions').send({
      title: 'Gym membership',
      amount: 100,
      type: 'debit',
    })

    expect(response.statusCode).toBe(201)
  })

  it('should be able to list all transactions', async () => {
    const responseCreated = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Gym membership',
        amount: 100,
        type: 'debit',
      })

    const cookies = responseCreated.get('Set-Cookie')

    const response = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)

    const { transactions } = response.body

    expect(response.statusCode).toBe(200)
    expect(transactions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          created_at: expect.any(String),
          session_id: expect.any(String),
          title: 'Gym membership',
          amount: -100,
        }),
      ]),
    )
  })

  it('should be able to get a specific transaction', async () => {
    const responseCreated = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Gym membership',
        amount: 100,
        type: 'debit',
      })

    const cookies = responseCreated.get('Set-Cookie')

    const responseGetList = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)

    const { transactions } = responseGetList.body

    const response = await request(app.server)
      .get(`/transactions/${transactions[0].id}`)
      .set('Cookie', cookies)

    const { transaction } = response.body

    expect(response.statusCode).toBe(200)
    expect(transaction).toEqual(
      expect.objectContaining({
        id: transactions[0].id,
        created_at: expect.any(String),
        session_id: expect.any(String),
        title: 'Gym membership',
        amount: -100,
      }),
    )
  })
})
