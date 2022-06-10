'use strict';

const jestOpenAPI = require('jest-openapi').default
const request = require('supertest')
const path = require('path')

jestOpenAPI(path.join(__dirname, '../oas.yaml'))
let app = require( '../src/javascript' )

let text = `{
    "model": {
      "name": "413ijapd9z8_11",
      "locale": "uk",
      "client": "test"
    }
  }`

describe('Тести для перевірки роботи з моделями', () => {


        test('Зберегти модель, код відповіді - 200', async () => {
            let res = await request(app).post("/model/save")
                .send(text)
                .set("Content-Type","application/json; charset=utf-8")
            expect(res.status).toEqual(200)
            expect(res).toSatisfyApiSpec()
        })

        test('Відновити модель, код відповіді - 200', async () => {
            let res = await request(app).post("/model/restore")
                .send(text)
                .set("Content-Type","application/json; charset=utf-8")
            expect(res.status).toEqual(200)
            expect(res).toSatisfyApiSpec()
        })

        test('Повернути модель, код відповіді - 200', async () => {
            let res = await request(app)
                .get("/exists/model/413ijapd9z8_11")
                .set("Content-Type","application/json; charset=utf-8")
            expect(res.status).toEqual(200)
            expect(res).toSatisfyApiSpec()
        })

})