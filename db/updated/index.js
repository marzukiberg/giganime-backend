const dataServer1 = require("./server1");
const dataServer2 = require("./server2");
const dataServer3 = require("./server3");

const getUpdated = async (path = "") => {
  const items1 = await dataServer1(path);
  if (items1.data.length > 0) {
    return items1;
  }
  const items2 = await dataServer2(path);
  if (items2.data.length > 0) {
    return items2;
  }
  const items3 = await dataServer3(path);
  if (items3.data.length > 0) {
    return items3;
  }
  return [];
};

module.exports = getUpdated;
