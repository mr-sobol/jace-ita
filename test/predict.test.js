'use strict';

const jestOpenAPI = require('jest-openapi').default
const request = require('supertest')
const path = require('path')

jestOpenAPI(path.join(__dirname, '../oas.yaml'))
let app = require( '../src/javascript' )

let text = `{
    "model": {
      "name": "413ijapd9z8_11",
      "locale": "uk"
    },
    "data": [
      {
        "id": "81bb8f24-a72b-4a30-9850-b4fe3bbb1298",
        "node": "subSentence",
        "concept": "SYNTAX",
        "text": " 19 лютого РНБО наклала санкції на кілька десятків фізичних осіб та компаній",
        "entities": []
      },
      {
        "id": "0158c01c-80fe-46fc-a910-a9927c6e2ec6",
        "node": "subSentence",
        "concept": "SYNTAX",
        "text": " літак Віталія Хомутинніка",
        "entities": []
      }
    ]
  }`

describe('Тести для шляху "/predict"', () => {

    describe('Розпізнавання тексту', function() {


        test('Повинен повернути розпізнані іменовані сутності, код відповіді - 200', async () => {

            let res = await request(app)
                .post(`/predict`)
                .send(text)
                .set("Content-Type","application/json; charset=utf-8")

            expect(res.status).toEqual(200)
            expect(res).toSatisfyApiSpec()
        });
    });
});