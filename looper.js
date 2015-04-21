var $http = require('http-as-promised');
var combiners = require('./src/combiners.js');
$http = $http.defaults({
  resolve: 'body'
});

module.exports.combiners = combiners;

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
