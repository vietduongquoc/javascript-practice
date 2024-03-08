import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

/**
 * Toast object for displaying success and error messages
 */
const Toast = {
  /**
   * Displays a success message using showToastify
   * @param {string} msg - The message to be displayed
   */
  success(msg) {
    showToastify(msg, 'toastify-success');
  },

  /**
   * Displays an error message using showToastify
   * @param {string} msg - The message to be displayed
   */
  error(msg) {
    showToastify(msg, 'toastify-danger');
  }
}

/**
 * Displays a toast notification
 * @param {string} msg - The message to display in the toast
 * @param {string} state - The state of the toast (e.g., 'toastify-success', 'toastify-danger')
 * @param {number} [duration=2000] - The duration (in milliseconds) for which the toast should be displayed
 * @example
 * showToastify('Product added successfully!', 'toastify-success', 2000);
 */
function showToastify(msg, state, duration = 2000) {
  Toastify({
    text: msg,
    duration: duration,
    newWindow: true,
    gravity: 'center',
    position: 'center',
    offset: {
      x: '2rem',
      y: '1rem',
    },
    stopOnFocus: true,
    className: state
  }).showToast();
}

export default Toast;
