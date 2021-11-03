---
title: JACE-ITA. Сервіс ітеративного тренування моделей машинного навчання v1.0.1
language_tabs:
  - http: HTTP
  - javascript: JavaScript
language_clients:
  - shell: curl
  - javascript: axios
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="jace-ita-">JACE-ITA. Сервіс ітеративного тренування моделей машинного навчання v1.0.1</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Надає можливості тренування моделей машинного навчання для розпізнавання іменованих сутностей в текстах природньої мови, можливості розпізнавання текстів та оцінювання моделей машиного навчання. Також надає послуги управління моделями (збереження, імпорт, експорт...)

Base URLs:

* <a href="http://localhost:8080">http://localhost:8080</a>

Email: <a href="mailto:boldak.andrey@gmail.com">jace-ita</a> Web: <a href="http://localhost:3001/">jace-ita</a> 
License: <a href="http://localhost:8080/license.html">MIT License</a>

<h1 id="jace-ita---">Загальна інформація</h1>

## get__

> Code samples

```http
GET / HTTP/1.1
Accept: text/html
Host: localhost:8080

```

```javascript
import axios from "axios";

const options = {method: 'GET', url: 'http://localhost:8080/', headers: {Accept: 'text/html'}};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
```

`GET /`

*Отримати загальний опис сервісу*

Повертає сторінку загального опису

> Example responses

> 200 Response

```
"Not found"
```

<h3 id="get__-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Успішна відповідь|string|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="jace-ita---">Використання моделей машинного навчання</h1>

## post__train

> Code samples

```http
POST /train HTTP/1.1
Content-Type: application/json
Accept: application/json
Host: localhost:8080
Content-Length: 202

{"model":{"name":"string","locale":"string","losses":[0],"metrics":{"property1":{"p":0,"r":0,"f":0},"property2":{"p":0,"r":0,"f":0}}},"data":[{"text":"string","entities":[{"type":"string","pos":[0]}]}]}
```

```javascript
import axios from "axios";

const options = {
  method: 'POST',
  url: 'http://localhost:8080/train',
  headers: {'Content-Type': 'application/json', Accept: 'application/json'},
  data: {
    model: {
      name: 'string',
      locale: 'string',
      losses: [0],
      metrics: {property1: {p: 0, r: 0, f: 0}, property2: {p: 0, r: 0, f: 0}}
    },
    data: [{text: 'string', entities: [{type: 'string', pos: [0]}]}]
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
```

`POST /train`

*Тренування модель*

Повертає масив оцінок втрат в процесі тренування

> Body parameter

```json
{
  "model": {
    "name": "string",
    "locale": "string",
    "losses": [
      0
    ],
    "metrics": {
      "property1": {
        "p": 0,
        "r": 0,
        "f": 0
      },
      "property2": {
        "p": 0,
        "r": 0,
        "f": 0
      }
    }
  },
  "data": [
    {
      "text": "string",
      "entities": [
        {
          "type": "string",
          "pos": [
            0
          ]
        }
      ]
    }
  ]
}
```

<h3 id="post__train-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[req_res_type](#schemareq_res_type)|false|none|

> Example responses

> 200 Response

```json
{
  "model": {
    "name": "string",
    "locale": "string",
    "losses": [
      0
    ],
    "metrics": {
      "property1": {
        "p": 0,
        "r": 0,
        "f": 0
      },
      "property2": {
        "p": 0,
        "r": 0,
        "f": 0
      }
    }
  },
  "data": [
    {
      "text": "string",
      "entities": [
        {
          "type": "string",
          "pos": [
            0
          ]
        }
      ]
    }
  ],
  "result": {
    "model": {
      "name": "string",
      "locale": "string",
      "losses": [
        0
      ],
      "metrics": {
        "property1": {
          "p": 0,
          "r": 0,
          "f": 0
        },
        "property2": {
          "p": 0,
          "r": 0,
          "f": 0
        }
      }
    },
    "data": [
      {
        "text": "string",
        "entities": [
          {
            "type": "string",
            "pos": [
              0
            ]
          }
        ]
      }
    ]
  }
}
```

<h3 id="post__train-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|fjhjhf|Inline|

<h3 id="post__train-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## post__predict

> Code samples

```http
POST /predict HTTP/1.1
Content-Type: application/json
Accept: application/json
Host: localhost:8080
Content-Length: 202

{"model":{"name":"string","locale":"string","losses":[0],"metrics":{"property1":{"p":0,"r":0,"f":0},"property2":{"p":0,"r":0,"f":0}}},"data":[{"text":"string","entities":[{"type":"string","pos":[0]}]}]}
```

```javascript
import axios from "axios";

const options = {
  method: 'POST',
  url: 'http://localhost:8080/predict',
  headers: {'Content-Type': 'application/json', Accept: 'application/json'},
  data: {
    model: {
      name: 'string',
      locale: 'string',
      losses: [0],
      metrics: {property1: {p: 0, r: 0, f: 0}, property2: {p: 0, r: 0, f: 0}}
    },
    data: [{text: 'string', entities: [{type: 'string', pos: [0]}]}]
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
```

`POST /predict`

*Розпізнавання тексту*

Повертає розпізнані іменовані сутності

> Body parameter

```json
{
  "model": {
    "name": "string",
    "locale": "string",
    "losses": [
      0
    ],
    "metrics": {
      "property1": {
        "p": 0,
        "r": 0,
        "f": 0
      },
      "property2": {
        "p": 0,
        "r": 0,
        "f": 0
      }
    }
  },
  "data": [
    {
      "text": "string",
      "entities": [
        {
          "type": "string",
          "pos": [
            0
          ]
        }
      ]
    }
  ]
}
```

<h3 id="post__predict-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[req_res_type](#schemareq_res_type)|false|none|

> Example responses

> 200 Response

```json
{
  "model": {
    "name": "string",
    "locale": "string",
    "losses": [
      0
    ],
    "metrics": {
      "property1": {
        "p": 0,
        "r": 0,
        "f": 0
      },
      "property2": {
        "p": 0,
        "r": 0,
        "f": 0
      }
    }
  },
  "data": [
    {
      "text": "string",
      "entities": [
        {
          "type": "string",
          "pos": [
            0
          ]
        }
      ]
    }
  ],
  "result": {
    "model": {
      "name": "string",
      "locale": "string",
      "losses": [
        0
      ],
      "metrics": {
        "property1": {
          "p": 0,
          "r": 0,
          "f": 0
        },
        "property2": {
          "p": 0,
          "r": 0,
          "f": 0
        }
      }
    },
    "data": [
      {
        "text": "string",
        "entities": [
          {
            "type": "string",
            "pos": [
              0
            ]
          }
        ]
      }
    ]
  }
}
```

<h3 id="post__predict-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|fjhjhf|Inline|

<h3 id="post__predict-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## post__eval

> Code samples

```http
POST /eval HTTP/1.1
Content-Type: application/json
Accept: application/json
Host: localhost:8080
Content-Length: 202

{"model":{"name":"string","locale":"string","losses":[0],"metrics":{"property1":{"p":0,"r":0,"f":0},"property2":{"p":0,"r":0,"f":0}}},"data":[{"text":"string","entities":[{"type":"string","pos":[0]}]}]}
```

```javascript
import axios from "axios";

const options = {
  method: 'POST',
  url: 'http://localhost:8080/eval',
  headers: {'Content-Type': 'application/json', Accept: 'application/json'},
  data: {
    model: {
      name: 'string',
      locale: 'string',
      losses: [0],
      metrics: {property1: {p: 0, r: 0, f: 0}, property2: {p: 0, r: 0, f: 0}}
    },
    data: [{text: 'string', entities: [{type: 'string', pos: [0]}]}]
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
```

`POST /eval`

*Оцінювання моделі*

Повертає масив оцінок для типів іменованих сутностей

> Body parameter

```json
{
  "model": {
    "name": "string",
    "locale": "string",
    "losses": [
      0
    ],
    "metrics": {
      "property1": {
        "p": 0,
        "r": 0,
        "f": 0
      },
      "property2": {
        "p": 0,
        "r": 0,
        "f": 0
      }
    }
  },
  "data": [
    {
      "text": "string",
      "entities": [
        {
          "type": "string",
          "pos": [
            0
          ]
        }
      ]
    }
  ]
}
```

<h3 id="post__eval-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[req_res_type](#schemareq_res_type)|false|none|

> Example responses

> 200 Response

```json
{
  "model": {
    "name": "string",
    "locale": "string",
    "losses": [
      0
    ],
    "metrics": {
      "property1": {
        "p": 0,
        "r": 0,
        "f": 0
      },
      "property2": {
        "p": 0,
        "r": 0,
        "f": 0
      }
    }
  },
  "data": [
    {
      "text": "string",
      "entities": [
        {
          "type": "string",
          "pos": [
            0
          ]
        }
      ]
    }
  ],
  "result": {
    "model": {
      "name": "string",
      "locale": "string",
      "losses": [
        0
      ],
      "metrics": {
        "property1": {
          "p": 0,
          "r": 0,
          "f": 0
        },
        "property2": {
          "p": 0,
          "r": 0,
          "f": 0
        }
      }
    },
    "data": [
      {
        "text": "string",
        "entities": [
          {
            "type": "string",
            "pos": [
              0
            ]
          }
        ]
      }
    ]
  }
}
```

<h3 id="post__eval-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|fjhjhf|Inline|

<h3 id="post__eval-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_entity_type">entity_type</h2>
<!-- backwards compatibility -->
<a id="schemaentity_type"></a>
<a id="schema_entity_type"></a>
<a id="tocSentity_type"></a>
<a id="tocsentity_type"></a>

```json
{
  "type": "string",
  "pos": [
    0
  ]
}

```

Іменована сутність

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|true|none|Тип іменованої сутності|
|pos|array|true|none|Стартова та кінцева позиції|

<h2 id="tocS_text_data_type">text_data_type</h2>
<!-- backwards compatibility -->
<a id="schematext_data_type"></a>
<a id="schema_text_data_type"></a>
<a id="tocStext_data_type"></a>
<a id="tocstext_data_type"></a>

```json
{
  "text": "string",
  "entities": [
    {
      "type": "string",
      "pos": [
        0
      ]
    }
  ]
}

```

Елемент даних

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|text|string|true|none|Текстові данні|
|entities|array|true|none|Масив іменованих сутностей|

<h2 id="tocS_req_res_type">req_res_type</h2>
<!-- backwards compatibility -->
<a id="schemareq_res_type"></a>
<a id="schema_req_res_type"></a>
<a id="tocSreq_res_type"></a>
<a id="tocsreq_res_type"></a>

```json
{
  "model": {
    "name": "string",
    "locale": "string",
    "losses": [
      0
    ],
    "metrics": {
      "property1": {
        "p": 0,
        "r": 0,
        "f": 0
      },
      "property2": {
        "p": 0,
        "r": 0,
        "f": 0
      }
    }
  },
  "data": [
    {
      "text": "string",
      "entities": [
        {
          "type": "string",
          "pos": [
            0
          ]
        }
      ]
    }
  ]
}

```

Тип даних для обміну з сервісом

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|model|object|true|none|Опис моделі|
|» name|string|true|none|Ім'я моделі|
|» locale|string|true|none|Локалізація моделі (мова розпізнавання)|
|» losses|array|false|none|Масив оцінок втрат при тренуванні моделі|
|» metrics|object|false|none|Результати оцінювання моделі|
|»» **additionalProperties**|object|false|none|Оцінки розпізнавання іменованої сутності певного типу|
|»»» p|number|false|none|none|
|»»» r|number|false|none|none|
|»»» f|number|false|none|none|
|data|array|true|none|none|

<h2 id="tocS_response_error_type">response_error_type</h2>
<!-- backwards compatibility -->
<a id="schemaresponse_error_type"></a>
<a id="schema_response_error_type"></a>
<a id="tocSresponse_error_type"></a>
<a id="tocsresponse_error_type"></a>

```json
{
  "error": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|error|string|true|none|none|

<h2 id="tocS_response_warning_type">response_warning_type</h2>
<!-- backwards compatibility -->
<a id="schemaresponse_warning_type"></a>
<a id="schema_response_warning_type"></a>
<a id="tocSresponse_warning_type"></a>
<a id="tocsresponse_warning_type"></a>

```json
{
  "warning": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|warning|string|true|none|none|

