# httpinkie [![Build Status](https://travis-ci.org/floatdrop/httpinkie.svg?branch=master)](https://travis-ci.org/floatdrop/httpinkie)

> HTTP as a Promise


## Install

```
$ npm install --save httpinkie
```


## Usage

```js
var http = require('httpinkie');

http.request({host: 'google.com'})
	.then(console.log);
```


## HTTP

### request(req)

#### req

*Required*  
Type: `Object`

HTTP request object with additional fields:

 - `timeout`
 - `body`

## License

MIT © [Vsevolod Strukchinsky](http://github.com/floatdrop)
