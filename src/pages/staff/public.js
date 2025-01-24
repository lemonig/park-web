export const grouped = (data, key1, key2) => {
  return data.reduce((acc, curr) => {
    // 查找是否已有该 title 的分组
    const group = acc.find(g => g[key1] === curr[key1]);
    if (group) {
      // 如果已存在，添加 item 到对应的 items 数组
      group.items.push(curr);
    } else {
      // 如果不存在，创建一个新的分组
      acc.push({
        title: curr[key1],
        items: [curr],
      });
    }
    return acc;
  }, []);
} 