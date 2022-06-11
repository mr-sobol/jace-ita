# Програмний модуль JACE-ITA | Вступ

**Програмний модуль [`JACE-ITA`](https://github.com/wdc-molfar/jace-ita) – "Програмний модуль веб-сервісу для ітераційного тренування моделей розпізнавання іменованих сутностей"**, який написано мовами програмування `JavaScript` та `Python`, надає можливості ітераційного тренування моделей машинного навчання для розпізнавання іменованих сутностей в текстах природної мови та оцінювання моделей машиного навчання, а також управління моделями, зокрема, зберігання нових моделей, відновлення та повернення вже збережених натренованих моделей.

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

Для функціонування програмного модуля, написаного мовами програмування `Python` та `JavaScript`, необхідне наступне програмне забезпечення:

- `Docker` [v20.10](https://docs.docker.com/engine/release-notes/#version-2010)
- `Kubernetes` [v1.22.4](https://github.com/kubernetes/kubernetes/releases/tag/v1.22.4)

 та пакети:

- `npm` [v.6.13.4](https://www.npmjs.com/package/npm/v/6.13.4)
- `node` [v.12.16.1](https://nodejs.org/ru/blog/release/v12.16.1/)
- `python` [v.3.8.6](https://www.python.org/downloads/release/python-386/)
- `axios` [0.21.0](https://github.com/axios/axios/releases)
- `body-parser` [1.19.0](https://www.npmjs.com/package/body-parser/v/1.19.0)
- `chalk` [4.1.0](https://www.npmjs.com/package/chalk/v/4.1.0)
- `cors` [2.8.5](https://www.npmjs.com/package/cors/v/2.8.5)
- `execa` [4.1.0](https://www.npmjs.com/package/execa/v/4.1.0)
- `express` [4.17.1](https://www.npmjs.com/package/express/v/4.17.1)
- `express-fileupload` [1.2.1](https://www.npmjs.com/package/express-fileupload/v/1.2.1)
- `extract-zip` [2.0.1](https://www.npmjs.com/package/extract-zip/v/2.0.1)
- `fs-extra` [9.1.0](https://www.npmjs.com/package/fs-extra/v/9.1.0)
- `js-yaml` [4.1.0](https://www.npmjs.com/package/js-yaml/v/4.1.0)
- `jszip` [3.5.0](https://www.npmjs.com/package/jszip/v/3.5.0)
- `lodash` [4.17.20](https://www.npmjs.com/package/lodash/v/4.17.20)
- `mime` [2.5.2](https://www.npmjs.com/package/mime/v/2.5.2)
- `mongoose` [6.0.12](https://www.npmjs.com/package/mongoose/v/6.0.12)
- `mongoose-findorcreate` [3.0.0](https://www.npmjs.com/package/mongoose-findorcreate/v/3.0.0)
- `nodemon` [2.0.6](https://www.npmjs.com/package/nodemon/v/2.0.6)
- `python-shell` [2.0.3](https://www.npmjs.com/package/python-shell/v/2.0.3)
- `queue-promise` [2.1.0](https://www.npmjs.com/package/queue-promise/v/2.1.0)
- `swagger-stats` [0.99.2](https://www.npmjs.com/package/swagger-stats/v/0.99.2)
- `swagger-ui-express` [4.4.0](https://www.npmjs.com/package/swagger-ui-express/v/4.4.0)
- `uuid` [8.3.2](https://www.npmjs.com/package/uuid/v/8.3.2)
- `yaml-js` [0.3.0](https://www.npmjs.com/package/yaml-js/v/0.3.0)
- `zip-a-folder` [1.1.0](https://www.npmjs.com/package/zip-a-folder/v/1.1.0)


<a name="function"></a>
<h2>Функціональне призначення</h2>


Програмний модуль призначений для ітераційного тренування моделей машинного навчання для розпізнавання іменованих сутностей в текстах природної мови та оцінювання моделей машиного навчання, а також управління моделями, зокрема, зберігання нових моделей, відновлення та повернення вже збережених натренованих моделей.

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

Для запуску програмного модуля **`ace-ita`** необхідно:
1. Клонувати репозиторій:
```sh
git clone https://github.com/wdc-molfar/jace-ita.git
```
2. Перейти в директорію склонованого репозиторія та проінсталювати залежності:
```sh
cd /jace-ita
npm install
```

Завантаження програмного модуля забезпечується введенням в WEB-браузері адреси завантажувального модуля [http://{hostname}](http://localhost:8080/) з можливими вказівками:
- [/](http://localhost:8080/) для виклику сторінки із загальним описом сервісу
- [/metrics](http://localhost:8080/metrics) для виклику сторінки статистики сервісу
- [/model/save](http://localhost:8080//model/save) метод `POST` – для зберігання натренованої моделі
- [/model/restore](http://localhost:8080//model/restore) метод `POST` – для відновлення моделі
- [/exists/model/:name](http://localhost:8080/exists/model/:name) метод `GET` – для отримання збереженої моделі за назвою
- [/:command ](http://localhost:8080/:command) метод `POST` – посилає запит на отримання результатів, в залежності від команди (`train` - тренування й повернення масиву оцінок втрат в процесі тренування, `eval` - оцінка й повернення масиву оцінок для типів іменованих сутностей, `predict` - розпізнавання тексту та повернення розпізнаних іменованованих сутностей)
