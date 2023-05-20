import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
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
})
