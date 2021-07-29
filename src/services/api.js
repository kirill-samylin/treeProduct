const headers = {
  "Content-Type": "application/json",
};

function getJson(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
};

function getTokenData() {
  return fetch(`/ajax/get-csrf-token`, {
    headers,
  })
    .then(getJson)
    .then(({ data }) => {
      console.log(data)
      return {
        [data.param]: data.token,
      }
    })
}
function getToken() {
  return fetch(`/ajax/get-csrf-token`, {
    headers,
  })
    .then(getJson)
    .then(({ data }) => data.token)
}
//Получаем дерево продуктов
export function get(id) {
  return fetch(`/restaurant/menu-data?id=${id}`, {
    headers,
  })
    .then(getJson)
}

export function remove(product) {
  const id = product.category_id || product.product_id;
  const type = (product.category_id) ? 'category' : 'product';
  return getTokenData()
    .then((formData) => fetch(`/${type}/delete?id=${id}`, {
      method: "POST",
      headers,
      body: JSON.stringify(formData),
    }))
    .then((res) => {
      if (res.ok || res.status===302) {
        return product;
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
}

export function saveImage() {
  //http://lk.foodle.local/product/img-save
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
export function getImageUrl(formData, key) {
  // return new Promise((resovle) => {
  //   setTimeout(() => resovle({[key]: "https://s6.cdn.teleprogramma.pro/wp-content/uploads/2020/06/689da5444c44d931d0f97a5df9bda833.jpg"}), Math.random() * 5 * 1000);
  // });
  return getToken()
    .then((token) => fetch(`/product/img-save`, {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-Token": token
      },
      body: formData,
    }))
    .then((res) => {
      if (res.ok) {
        return res.body;
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`); 
    })
    .then((url) => ({ [key]: url }))
}
