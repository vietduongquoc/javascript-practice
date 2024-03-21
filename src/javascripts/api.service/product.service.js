import { API } from '../constants/url-api';

export default class ProductService {

  static getAll = async () => {
    const url = new URL(`${API.BASE_URL}/${API.PRODUCTS_ENDPOINT}`);
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
  }

  static getAll = async () =>  {
    const loader = document.querySelector('.loader');
    const queryString = window.location.search;
    const url = new URL(`https://65dbf3583ea883a15292483f.mockapi.io/api/products`);
    const urlParams = new URLSearchParams(queryString);
    const page = urlParams.get('page');
    url.searchParams.append('page', page || 1);
    url.searchParams.append('limit', '8');
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
}
