module.exports = {
  flat1: function flat1(arr) {
    function* flat(ar) {
      if (Array.isArray(ar)) {
        for (const i of ar) {
          yield* flat(i);
        }
      } else {
        yield ar;
      }
    }
    const temp = [...flat(arr)];
    return temp;
  },
  flat2: function flat2(test) {
    const temp = [];
    function fn(arr) {
      for (const i of arr) {
        if (Array.isArray(i)) {
          fn(i);
        } else {
          temp.push(i);
        }
      }
    }
    fn(test);
    return temp;
  },
  flat3: function flat3(arr) {
    while (arr.some((i) => Array.isArray(i))) {
      // eslint-disable-next-line no-param-reassign
      arr = [].concat(...arr);
    }
    return arr;
  },
};
