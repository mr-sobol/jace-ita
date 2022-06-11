# JACE-ITA. Програмний модуль веб-сервісу для ітераційного тренування моделей розпізнавання іменованих сутностей

Програмний модуль [`JACE-ITA`](https://github.com/wdc-molfar/jace-ita) призначений для ітераційного тренування моделей машинного навчання для розпізнавання іменованих сутностей в текстах природної мови та оцінювання моделей машиного навчання. До того ж дозволяє управляти моделями, а саме: зберегати їх, імпортувати, експортувати та ін.

Дивись [документацію](https://molfar-wdc.github.io/jace-ita/)

# Requirements (local use)

- npm v.6.13.4
- node v.12.16.1
- python v.3.8.6

# How to run (local, dev)

- npm install
- npm run dev

Standard configuration (file config.js)
- lang: "en"
- host: "localhost"
- port: "3001"

# How to deploy (heroku, via CLI, for lang='en')

1. Create app.
- heroku create -a jace-ner-en
2. Add buildpacks:
- heroku/nodejs
- heroku/python
3. Set language.
- heroku config:set -a jace-ner-en NER_LANG=en
4. Deploy!
- git push https://git.heroku.com/jace-ner-en.git HEAD:master
