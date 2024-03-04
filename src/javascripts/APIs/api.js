import { API } from '../constants/url-api';
// import showToastify from '../utils/toastify';

const APIHandler = {
  async get(endpoint) {
    try {
      const res = await fetch(`${API.BASE_URL}/${endpoint}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch data from ${API.BASE_URL}/${endpoint}`);
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


  async put(endpoint, product) {
    try {
      const res = await fetch(`${API.BASE_URL}/${endpoint}`, {
        method: 'PUT',
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
};

export { APIHandler };
