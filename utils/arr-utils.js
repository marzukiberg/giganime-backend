function groupBy(array, property) {
  // remove that property
  return array.reduce(function (memo, x) {
    var key = x[property];
    delete x[property];
    memo[key] = (memo[key] || []).concat(x);
    return memo;
  }, {});
}

module.exports = { groupBy };
