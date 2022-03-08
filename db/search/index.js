const dataServer1 = require("./server1");
const dataServer2 = require("./server2");
const dataServer3 = require("./server3");

const getByQuery = async (s = "", page = 1) => {
  const items1 = await dataServer1(s, page);
  if (items1.data) {
    return { ...items1, searchQuery: s };
  }
  const items2 = await dataServer2(s, page);
  if (items2.data) {
    return { ...items2, searchQuery: s };
  }
  const items3 = await dataServer3(s, page);
  if (items3.data) {
    return { ...items3, searchQuery: s };
  }
  return [{ searchQuery: s }];
};

module.exports = getByQuery;
