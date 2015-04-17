var $http = require('http-as-promised');
$http = $http.defaults({
  resolve: 'body'
});

exports.loop = function(combine, finished, nextUrl, nextOpts) {
  return function() {
    function handle(aggregate, body) {
      var newAggregate = combine(aggregate, body);
      if (finished(newAggregate, body)) {
        return newAggregate;
      }

      return $http(nextUrl(), nextOpts())
        .then(handle.bind(undefined, newAggregate));
    }

    return $http(nextUrl(), nextOpts())
      .then(handle.bind(undefined, []));
  };
}
