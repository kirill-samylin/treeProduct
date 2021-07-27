function setPassive(list, parent_id) {
  const item = list.find((item) => item.category_id === parent_id);
  if (!item) return;
  item.isPassive = true;
  if (item.parent_id) {
    setPassive(list, item.parent_id);
  }
}

export function passiveMode(list) {
  const passiveItems = list.filter((item) => item.active === 0);
  const uniqueItems = passiveItems.reduce((arr, item) => {
    if (!arr.find((i) => i.parent_id === item.parent_id)) {
      arr.push(item);
    }
    return arr;
  }, []);
  for (let item of uniqueItems) {
    setPassive(list, item.parent_id);
  }
  return list;
}
