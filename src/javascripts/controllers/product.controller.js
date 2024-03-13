import { API } from '../constants/url-api';

class APIHandler {
  static async get() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page = urlParams.get('page');

    const url = new URL('https://65dbf3583ea883a15292483f.mockapi.io/api/products');

    if(page) {
      url.searchParams.append('page', 1);
      url.searchParams.append('limit', '6');
    }

    try {
      // Use the generated URL with query parameters for the fetch call
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  static async post(endpoint, product) {
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
  }

  static async editProduct(productId, editedProductData) {
    const response = await fetch(`${API.BASE_URL}/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedProductData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  }
  static async deleteProduct(productId) {
    console.log('deleteProduct: ', productId)
    try {
      const { BASE_URL, PRODUCTS_ENDPOINT } = API;

      const url = `${BASE_URL}/${PRODUCTS_ENDPOINT}/${productId}`;

      const res = await fetch(url, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`Failed to delete product with ID: ${productId}`);
      }


      console.log('Delete successfully!');

      return { isSuccess: true };
    } catch (error) {
      console.error(error);


      console.error('Error deleting product:', error.message);

      return { isSuccess: false };
    }
  }

}
export { APIHandler };
