import { API } from '../constants/url-api';

export default class ProductModel {
  static async getDataLength() {
    const url = new URL(`https://65dbf3583ea883a15292483f.mockapi.io/api/products`);
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
      const dataLength = data.length;
      return dataLength;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  static async get() {
    const loader = document.querySelector('.loader');
    const queryString = window.location.search;
    const url = new URL(`https://65dbf3583ea883a15292483f.mockapi.io/api/products`);
    const urlParams = new URLSearchParams(queryString);
    const page = urlParams.get('page');
    url.searchParams.append('page', page || 1);
    url.searchParams.append('limit', '8');
    url.searchParams.append('sortBy', 'createdAt');
    url.searchParams.append('order', 'desc');
    try {
      loader.classList.toggle('hidden');
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
    finally {
      loader.classList.toggle('hidden');
    }
  }

  static async post(endpoint, product) {
    const loader = document.querySelector('.loader');
    try {
      loader.classList.toggle('hidden');
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
    finally {
      loader.classList.toggle('hidden');
    }
  }

  static async editProduct(productId, editedProductData) {
    const loader = document.querySelector('.loader');
    try {
      loader.classList.toggle('hidden');
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
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
    finally {
      loader.classList.toggle('hidden');
    }
      // return await response.json();
  }

  static async deleteProduct(productId) {
    const loader = document.querySelector('.loader');
    try {
      loader.classList.toggle('hidden');
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
    finally {
      loader.classList.toggle('hidden');
    }
  }
}

