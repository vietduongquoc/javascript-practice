function generateErrorMessages(formError) {
  // Clear all the error messages first
  const errorMsgElements = document.querySelectorAll('[data-field-error]');
  errorMsgElements.forEach(element => element.textContent = '');

  // Render all the error messages that in form error
  for (const key in formError) {
    const value = formError[key];

    const errorMsgElement = document.querySelector(`[data-field-error="${key}"]`);
    errorMsgElement.textContent = value;
  }
}

export default generateErrorMessages;
