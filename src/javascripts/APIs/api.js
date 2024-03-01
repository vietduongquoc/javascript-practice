import showToastify from '../utils/toastify';
import { API } from '../constants/url-api';

const APIHandler = {
  /**
   * Fetches data from an URL and returns the JSON response.
   * If the fetching fails, it shows a toast notification
   * @param {string} endpoint - The endpoint to fetch data from
   */
  async get(endpoint) {
    try {
      const res = await fetch(`${API.BASE_URL}/${endpoint}`);

      if (!res.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
      }

      const data = res.json();

      return data;
    } catch (error) {
      console.error(error);

      showToastify(error.message, 'toastify-danger');
    }
  },

  /**
   * Sends a POST request to the endpoint with the provided product data
   * @param {string} endpoint - The endpoint to which the request should be sent
   * @param {Object} product - The product data to be sent
   */
  async post(endpoint, product) {
    try {
      const res = await fetch(
        `${API.BASE_URL}/${endpoint}`,
        {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(product)
        }
      );

      if(!res.ok) {
        throw new Error(`Failed to post data to ${endpoint}`);
      }

      showToastify('Product added successfully!', 'toastify-success');
    } catch(error) {
      console.error(error);

      showToastify(error.message, 'toastify-danger');
    }
  }
}

export { APIHandler }

