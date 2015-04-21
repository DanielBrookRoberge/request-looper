module.exports = {
  countup: function(baseUrl, initial) {
    var count = initial || 1;
    return function() {
      var url = baseUrl + count;
      count++;
      return url;
    }
  }
};
