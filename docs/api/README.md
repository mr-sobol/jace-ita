# @mr-sobol/jace-ita. Специфікація модуля

## Functions

<dl>
<dt><a href="#prepareZip">prepareZip(params)</a> ⇒ <code>Promise</code></dt>
<dd></dd>
<dt><a href="#unzipModel">unzipModel(params)</a> ⇒ <code>Promise</code></dt>
<dd></dd>
<dt><a href="#saveModel">saveModel(params)</a> ⇒ <code>Promise</code></dt>
<dd></dd>
<dt><a href="#task">task(command, resp)</a> ⇒ <code>Promise</code></dt>
<dd></dd>
</dl>

<a name="prepareZip"></a>

## prepareZip(params) ⇒ <code>Promise</code>
**Kind**: global function  
**Throws**:

- <code>Error</code> 


| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> |  |
| params.client | <code>String</code> | Ідентифікатор клієнта |
| params.model.name | <code>String</code> | Ім'я моделі |
| params.model.locale | <code>String</code> | Мова моделі |

<a name="unzipModel"></a>

## unzipModel(params) ⇒ <code>Promise</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> |  |
| params.client | <code>String</code> | Ідентифікатор клієнта |
| params.model.name | <code>String</code> | Ім'я моделі |
| params.model.locale | <code>String</code> | Мова моделі |

<a name="saveModel"></a>

## saveModel(params) ⇒ <code>Promise</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> |  |
| params.client | <code>String</code> | Ідентифікатор клієнта |
| params.model.name | <code>String</code> | Ім'я моделі |
| params.model.locale | <code>String</code> | Мова моделі |

<a name="task"></a>

## task(command, resp) ⇒ <code>Promise</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| command | <code>Object</code> | 
| command.cmd | <code>String</code> | 
| resp | <code>Object</code> | 

