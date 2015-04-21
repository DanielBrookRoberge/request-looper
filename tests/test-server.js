var express = require('express');
var app = express();

app.get('/api1/:n', function(req, res) {
  res.send([{test: 'test'}, {test: 'test1'}, {test: 'test2'}]);
});

app.listen(2222);
