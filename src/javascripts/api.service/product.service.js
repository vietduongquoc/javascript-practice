import { API } from '../constants/url-api';

export default class ProductService {
  static getPaginatedProducts = async (page = 1, limit = 8) => {
    const url = new URL(`${API.BASE_URL}/${API.PRODUCTS_ENDPOINT}`);
    url.searchParams.append('page', page);
    url.searchParams.append('limit', limit);
    url.searchParams.append('sortBy', 'createdAt');
    url.searchParams.append('order', 'desc');
    const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return await response.json();
}

  static async post(endpoint, product) {
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
  }
}
  // static async editProduct(productId, editedProductData) {
  //   try {
  //     const response = await fetch(`${API.BASE_URL}/products/${productId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(editedProductData),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const data = await res.json();
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }


  // static async editProduct(productId, editedProductData) {
  //   try {
  //     const response = await fetch(`${API.BASE_URL}/products/${productId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(editedProductData),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const data = await res.json();
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // static async deleteProduct(productId) {
  //   try {
  //     const { BASE_URL, PRODUCTS_ENDPOINT } = API;
  //     const url = `${BASE_URL}/${PRODUCTS_ENDPOINT}/${productId}`;
  //     const res = await fetch(url, {
  //       method: 'DELETE',
  //     });
  //     if (!res.ok) {
  //       throw new Error(`Failed to delete product with ID: ${productId}`);
  //     }
  //     console.log('Delete successfully!');
  //     return { isSuccess: true };
  //   } catch (error) {
  //     console.error(error);
  //     console.error('Error deleting product:', error.message);
  //     return { isSuccess: false };
  //   }
  // }

  // static async deleteProduct(productId) {
  //   try {
  //     const { BASE_URL, PRODUCTS_ENDPOINT } = API;
  //     const url = `${BASE_URL}/${PRODUCTS_ENDPOINT}/${productId}`;
  //     const res = await fetch(url, {
  //       method: 'DELETE',
  //     });
  //     if (!res.ok) {
  //       throw new Error(`Failed to delete product with ID: ${productId}`);
  //     }
  //     console.log('Delete successfully!');
  //     return { isSuccess: true };
  //   } catch (error) {
  //     console.error(error);
  //     console.error('Error deleting product:', error.message);
  //     return { isSuccess: false };
  //   }
  // }


