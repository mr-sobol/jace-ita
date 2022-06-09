# Програмний модуль JACE-ITA | Вступ

**Програмний модуль [`JACE-ITA`](https://github.com/wdc-molfar/jace-ita) – "Програмний модуль веб-сервісу для ітераційного тренування моделей розпізнавання іменованих сутностей"**, який написано мовами програмування `JavaScript` та `Python`, надає можливості ітераційного тренування моделей машинного навчання для розпізнавання іменованих сутностей в текстах природної мови та оцінювання моделей машиного навчання. До того ж дозволяє управляти моделями, а саме: зберегати, імпортувати, експортувати та ін. операції.

### Зміст
- [Позначення та найменування програмного модуля](#name)
- [Програмне забезпечення, необхідне для функціонування програмного модуля](#software)
- [Функціональне призначення](#function)
- [Опис логічної структури](#structure)
- [Використовувані технічні засоби](#hardware)
- [Виклик та завантаження](#run)

<a name="name"></a>
<h2>Позначення та найменування програмного модуля</h2>

Програмний модуль має позначення **"JACE-ITA"**.

Повне найменування програмного модуля – **"Програмний модуль веб-сервісу для ітераційного тренування моделей розпізнавання іменованих сутностей"**.


<a name="software"></a>
<h2>Програмне забезпечення, необхідне для функціонування програмного модуля</h2>

Для функціонування програмного модуля, написаного мовами програмування `Python` та `JavaScript`, необхідне наступне програмне забезпечення та пакети:

- `npm` [v.6.13.4](https://www.npmjs.com/package/npm/v/6.13.4)
- `node` [v.12.16.1](https://nodejs.org/ru/blog/release/v12.16.1/)
- `python` [v.3.8.6](https://www.python.org/downloads/release/python-386/)
- `axios` [0.21.0](https://github.com/axios/axios/releases)
- `body-parser` [1.19.0](https://www.npmjs.com/package/body-parser)
- `chalk` [4.1.0](https://www.npmjs.com/package/chalk)
- `cors` [2.8.5](https://www.npmjs.com/package/cors)
- `execa` [4.1.0](https://www.npmjs.com/package/execa)
- `express` [4.17.1](https://www.npmjs.com/package/express/v/4.17.1)
- `express-fileupload` [1.2.1](https://www.npmjs.com/package/express-fileupload)
- `js-yaml` [4.1.0](https://www.npmjs.com/package/js-yaml)
- `lodash` [4.17.20](https://snyk.io/test/npm/lodash/4.17.20)
- `mime` [2.5.2](https://www.npmjs.com/package/mime)
- `mongoose` [6.0.12](https://mongoosejs.com/)
- `mongoose-findorcreate` [3.0.0](https://www.npmjs.com/package/mongoose-findorcreate)
- `nodemon` [2.0.6](https://www.npmjs.com/package/nodemon/v/2.0.6)
- `python-shell` [2.0.3](https://www.npmjs.com/package/python-shell?activeTab=versions)
- `queue-promise` [2.1.0](https://www.npmjs.com/package/queue-promise)
- `uuid` [8.3.2](https://www.npmjs.com/package/uuid)
- `yaml-js` [0.3.1](https://www.npmjs.com/package/yaml-js)
- `zip-a-folder` [1.1.0](https://www.npmjs.com/package/zip-a-folder)
- `extract-zip` [2.0.1](https://www.npmjs.com/package/extract-zip)
- `fs-extra` [9.1.0](https://www.npmjs.com/package/fs-extra)
- `inly` [4.0.8](https://www.nuget.org/packages/JUST/4.0.8)
- `jszip` [3.5.0](https://www.npmjs.com/package/jszip/v/3.5.0)


<a name="function"></a>
<h2>Функціональне призначення</h2>


Програмний модуль призначений для ітераційного тренування моделей машинного навчання для розпізнавання іменованих сутностей в текстах природної мови та оцінювання моделей машиного навчання 
Також програмний модуль призначений для управління моделями, зокрема, реєстрації нових моделей, оновлення та видалення вже наявних.

<a name="structure"></a>
<h2>Опис логічної структури</h2>

Програмний модуль складається з:
- `python` – програмний підмодуль, що здійснює тренування моделі, оцінку та прогноз 
- `javascript` – програмний підмодуль, що приймає та оброблює запити від моделі

На диспетчер запитів `python` подається масив для тренування, після чого оцінка та прогноз надсилаються на контролер запитів `javascript`, який оброблює отримані результати. 

<a name="hardware"></a>
<h2>Використовувані технічні засоби</h2>

Програмний модуль експлуатується на сервері під управлінням `Node.js`, а також HTTP-клієнт `axios` на основі промісів для нього. В основі управління викликів з теміналу є менеджер пакетів `npm`.

<a name="run"></a>
<h2>Виклик та завантаження</h2>

Завантаження програмного модуля забезпечується введенням в WEB-браузері адреси завантажувального модуля [http://{hostname}](http://localhost:8080/) з можливими вказівками:
- [/](http://localhost:8080/) для виклику сторінки із загальним описом сервісу
- [/exists/model/:name](http://localhost:8080/exists/model/:name) метод `GET` – для отримання сформованого масива за назвою
- [/model/save ](http://localhost:8080//model/save) метод `POST` – для зберігання сформованого масива за назвою
- [/:command ](http://localhost:8080/:command) метод `POST` – посилає запит на отримання результатів, в залежності від команди (тренування, оцінка, прогноз)
- [/model/restore ](http://localhost:8080/model/restore) метод `POST` – для розпакування сформованого масива 
 
