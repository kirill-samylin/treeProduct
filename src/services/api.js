export function get(id) {
  return fetch(`/restaurant/menu-data?id=${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
}
export function remove(product) {
  return fetch(`/category/delete?id=${product.category_id || product.product_id}`, {
    method: "POST",
  })
    .then((res) => {
      if (res.ok) {
        return product;
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
}

export function saveImage() {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: "https://s6.cdn.teleprogramma.pro/wp-content/uploads/2020/06/689da5444c44d931d0f97a5df9bda833.jpg",
        }),
      3000
    )
  );
}
