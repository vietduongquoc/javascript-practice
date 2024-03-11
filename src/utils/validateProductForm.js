const REGEX_PATTERNS = {
  integerRegex: /^-?\d+$/,
  digitRegex: /^-?\d*\.?\d+$/,
}

let formError = {};
const { digitRegex, integerRegex} = REGEX_PATTERNS;

/**
 * Checks if the value is a string
 * @param {Object} params - An object
 * @param {string} params.key - The field that needs to check
 * @param {string} params.value - The value of that field
 */
const validateString = ({ key, value }) =>
  formError[key] = typeof value !== 'string' ? `${key} must be a string.` : '';

/**
 * Checks if the value is a number
 * @param {Object} params - An object
 * @param {string} params.key - The field that needs to check
 * @param {number} params.value - The value of that field
 */
const validateInteger = ({ key, value }) =>
  formError[key] = !integerRegex.test(value) ? `${key} must be an integer.` : '';

/**
 * Checks if the value is a number
 * @param {Object} params - An object
 * @param {string} params.key - The field that needs to check
 * @param {number} params.value - The value of that field
 */
const validateFloat = ({ key, value }) =>
  formError[key] = !digitRegex.test(value) ? `${key} must be a float.` : '';

/**
 * Checks if the value is a number
 * @param {Object} params - An object
 * @param {string} params.key - The field that needs to check
 * @param {number} params.value - The value of that field
 */
const validateEmptiness = ({ key, value }) =>
  formError[key] = value.trim() === '' ? `${key} is required.` : '';

/**
 * Checks if the value is longer than mininum length
 * @param {Object} params - An object
 * @param {string} params.key - The field that needs to check
 * @param {string} params.value - The value of that field
 */
const validateLength = ({ key, value, min = 3 }) =>
  formError[key] = value.trim().length < min ? `${key} must have at least ${min} characters.` : '';

/**
 * Checks if the value is a positive number
 * @param {Object} params - An object
 * @param {string} params.key - The field that needs to check
 * @param {number} params.value - The value of that field
 */
const validatePositive = ({ key, value }) =>
  formError[key] = parseInt(value) < 0 ? `${key} needs to be a positive number.` : '';

/**
 * Validates the form data
 * @param {Object} data - The form data
 * @returns {Object} An object containing validation results
 */
export default function validateForm(data) {
  const validationSchema = {
    'Name': [validateString, validateLength],
    'Price': [validateFloat, validatePositive],
    'Brand': [validateString],
    'Type': [validateString],
    'Quantity': [validateInteger, validatePositive],
  };

  formError = {};

  for (const key in data) {
    // If the key exists in the validationSchema
    if (validationSchema.hasOwnProperty(key)) {
      const value = data[key];
      // Get the array of validator methods associated with the key
      const validators = validationSchema[key];

      validateEmptiness({ key, value });

      for (let validator of validators) {
        if (formError[key] !== '') {
          break;
        }

        validator({ key, value });
      }
    }
  }

  return { formError }
}
