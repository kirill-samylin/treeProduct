export function getProducts() {
  return new Promise((resolve) =>
    axios.get('/restaurant/menu-stop-list-data?id=1')
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    && setTimeout(() => resolve({ data: testProductArray }), 500)
  );
}