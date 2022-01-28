const dataServer1 = require("./server1");
const dataServer2 = require("./server2");

const getJadwal = async (path = "") => {
  const items1 = await dataServer1(path);
  if (items1.data) {
    return items1;
  }
  const items2 = await dataServer2(path);
  if (items2.data) {
    return items2;
  }
  return [];
};

module.exports = getJadwal;
