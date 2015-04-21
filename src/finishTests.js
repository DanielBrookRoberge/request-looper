module.exports = {
  count: function(n) {
    return function(aggregate, body) {
      return aggregate.length >= n;
    }
  }
};
