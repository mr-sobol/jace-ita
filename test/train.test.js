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
        "id": "f4e650af-d385-4a02-870c-de1d9c849856",
        "node": "subSentence",
        "concept": "SYNTAX",
        "text": " 19 лютого РНБО наклала санкції на кілька десятків фізичних осіб та компаній",
        "entities": []
      },
      {
        "id": "39c7ef57-b87d-43de-b1ac-d0e6c61bccc3",
        "node": "subSentence",
        "concept": "SYNTAX",
        "text": " літак Віталія Хомутинніка",
        "entities": [
          {
            "type": "PERSON",
            "pos": [
              15,
              25
            ],
            "nestedIn": [
              "subSentence"
            ]
          }
        ]
      },
      {
        "id": "ebd3d01e-e0ab-487d-91bc-1f82d53cfcb9",
        "node": "subSentence",
        "concept": "SYNTAX",
        "text": "Змінили реєстрацію і літають далі літаки колишнього нардепа і бізнесмена Віталія Хомутинніка",
        "entities": [
          {
            "type": "PERSON",
            "pos": [
              81,
              91
            ],
            "nestedIn": [
              "subSentence"
            ]
          }
        ]
      }
    ]
  }`

describe('Тести для шляху "/train"', () => {

    describe('Тренування модель', function() {

        test('Повинен повернути масив оцінок втрат в процесі тренування, код відповіді - 200', async () => {

            let res = await request(app)
                .post(`/train`)
                .send(text)
                .set("Content-Type","application/json; charset=utf-8")

            expect(res.status).toEqual(200)
            expect(res).toSatisfyApiSpec()

        });
    });
});