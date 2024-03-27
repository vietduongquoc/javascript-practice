import { API } from '../constants/url-api';
import ProductEntity from './product.entity';

const REGEX_PATTERNS = {
  integerRegex: /^-?\d+$/,
  digitRegex: /^-?\d*\.?\d+$/,
}

let formError = {};
const { digitRegex, integerRegex} = REGEX_PATTERNS;

export default class ProductModel {

  createList = (data) => {
    return data.map(item => new ProductEntity(item));
  }

  /**
 * Checks if the value is a string
 * @param {Object} params - An object
 * @param {string} params.key - The field that needs to check
 * @param {string} params.value - The value of that field
 */
  validateString = ({ key, value }) => typeof value !== 'string' ? `${key} must be a string.` : '';

  /**
  * Checks if the value is a number
  * @param {Object} params - An object
  * @param {string} params.key - The field that needs to check
  * @param {number} params.value - The value of that field
  */
  validateInteger = ({ key, value }) => !integerRegex.test(value) ? `${key} must be an integer.` : '';

  /**
  * Checks if the value is a number
  * @param {Object} params - An object
  * @param {string} params.key - The field that needs to check
  * @param {number} params.value - The value of that field
  */
  validateFloat = ({ key, value }) => !digitRegex.test(value) ? `${key} must be a float.` : '';

  /**
  * Checks if the value is a number
  * @param {Object} params - An object
  * @param {string} params.key - The field that needs to check
  * @param {number} params.value - The value of that field
  */
  validateEmptiness = ({ key, value }) => value.trim() === '' ? `${key} is required.` : '';

  /**
  * Checks if the value is longer than mininum length
  * @param {Object} params - An object
  * @param {string} params.key - The field that needs to check
  * @param {string} params.value - The value of that field
  */
  validateLength = ({ key, value, min = 3 }) => value.trim().length < min ? `${key} must have at least ${min} characters.` : '';

  /**
  * Checks if the value is a positive number
  * @param {Object} params - An object
  * @param {string} params.key - The field that needs to check
  * @param {number} params.value - The value of that field
  */
  validatePositive = ({ key, value }) => parseInt(value) < 0 ? `${key} needs to be a positive number.` : '';

  /**
  * Validates the form data
  * @param {Object} data - The form data
  * @returns {Object} An object containing validation results
  */

  validateForm(data) {
    const validationSchema = {
      'Name': [this.validateString, this.validateLength],
      'Price': [this.validateFloat, this.validatePositive],
      'Brand': [this.validateString],
      'Type': [this.validateString],
      'Quantity': [this.validateInteger, this.validatePositive],
    };

    formError = {};
    for (const key in data) {
      // If the key exists in the validationSchema
      if (validationSchema.hasOwnProperty(key)) {
        const value = data[key];
        // Get the array of validator methods associated with the key
        const validators = validationSchema[key];

        formError[key] = this.validateEmptiness({ key, value });

        for (let validator of validators) {
          if (formError[key] !== '') {
            break;
          }

          formError[key] = validator({ key, value });
        }
      }
    }

    return { formError }
  }
}
