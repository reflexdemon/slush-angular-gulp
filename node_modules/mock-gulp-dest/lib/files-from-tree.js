
module.exports = function filesFromTree (tree) {
  var result = [];
  if (Array.isArray(tree)) {
    return tree;
  }
  if (typeof tree === 'string') {
    return [tree];
  }
  return Object.keys(tree).reduce(function (res, folder) {
    res.push.apply(res, filesFromTree(tree[folder]).map(function (file) {
      return (folder !== '_' ? folder + '/' : '') + file;
    }));
    return res;
  }, result);
};
