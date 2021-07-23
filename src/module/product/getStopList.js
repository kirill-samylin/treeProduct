export function getStopList(list) {
  return list.filter((item) => item.hasOwnProperty("product_id") && item.active === false);
}
