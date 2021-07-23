
import { 
    testProductArray,
} from '../utils';
import axios from "axios"

// export default axios.create({
//   baseURL: "https://lk.foodle.su",
//   responseType: "json"
// });

export function getProducts() {
  return new Promise((resolve) => {
    // axios.get('https://lk.foodle.su/restaurant/menu-stop-list-data?id=1', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     "Access-Control-Allow-Origin": "*"
    //   }
    // })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err))
      setTimeout(() => resolve({ data: testProductArray }), 500)
  });
}
export function saveImage() {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ data: 'https://s6.cdn.teleprogramma.pro/wp-content/uploads/2020/06/689da5444c44d931d0f97a5df9bda833.jpg' }), 1000)
    );
  }
