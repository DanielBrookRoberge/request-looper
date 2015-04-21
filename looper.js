var $http = require('http-as-promised');
var combiners = require('./src/combiners.js');
var finish = require('./src/finishTests.js');
var reqOpts = require('./src/reqOptions.js');
var urls = require('./src/reqUrls.js');
$http = $http.defaults({
  resolve: 'body'
});

module.exports.combiners = combiners;
module.exports.finish = finish;
module.exports.reqOpts = reqOpts;
module.exports.urls = urls;

module.exports.loop = function(combine, finished, nextUrl, nextOpts) {
  return function() {
    function handle(aggregate, body) {
      var newAggregate = combine(aggregate, body);
      if (finished(newAggregate, body)) {
        return newAggregate;
      }

      return $http(nextUrl(aggregate, body), nextOpts(aggregate, body))
        .then(handle.bind(undefined, newAggregate));
    }

    return $http(nextUrl(), nextOpts())
      .then(handle.bind(undefined, []));
  };
};
