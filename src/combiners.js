module.exports = {
  concat: function(aggregate, body) {
    return aggregate.concat(body);
  },
  concatElement: function(element) {
    return function(aggregate, body) {
      return aggregate.concat(body[element]);
    };
  }
};
