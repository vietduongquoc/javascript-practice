import { API } from '../constants/url-api';
// import showToastify from '../utils/toastify';


const APIHandler = {
  async get() {
    try {

      const res = await fetch(`${API.BASE_URL}/${API.PRODUCTS_ENDPOINT}`);

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      showToastify(error.message);
    }
  },

  async post(endpoint, product) {
    try {
      const res = await fetch(`${API.BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
      });

      if (!res.ok) {
        throw new Error(`Failed to post data to ${API.BASE_URL}/${endpoint}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  // async put(endpoint, data) {
  //   try {
  //     const res = await fetch(
  //       `${API.BASE_URL}/${endpoint}`,
  //       {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(data)
  //       });

  //     if (!res.ok) {
  //       throw new Error(`Failed to update data to ${endpoint}`);
  //     }

  //     Toast.success('Product updated successfully!');
  //   } catch (error) {
  //     console.error(error);

  //     Toast.error(error.message);
  //   }
  // },


  //   async delete(endpoint) {
  //     const response = await fetch(`${API.DELETE_PRODUCT}/${endpoint}`, {
  //       method: 'DELETE',

  //     });
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok.');
  //     }
  //     return await response.json();
  //   }

  async deleteProduct(productId) {
    console.log('deleteProduct: ',productId)
    try {
      const { BASE_URL, PRODUCTS_ENDPOINT } = API;

      const url = `${BASE_URL}/${PRODUCTS_ENDPOINT}/${productId}`;

      const res = await fetch(url, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`Failed to delete product with ID: ${productId}`);
      }


      console.log('Delete successfully!'); // Thay thế này bằng Toast nếu bạn có

      return { isSuccess: true };
    } catch (error) {
      console.error(error);


      console.error('Error deleting product:', error.message);

      return { isSuccess: false };
    }
  }
}


export { APIHandler };
