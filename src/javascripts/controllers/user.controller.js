document.getElementById('Product-replenishment').addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the form from submitting

  const name = document.getElementById('productName').value;
  const quantity = parseInt(document.getElementById('productQuantity').value, 10);
  const price = parseFloat(document.getElementById('productPrice').value);
  const status = document.getElementById('status-dropdown').value;
  const brand = document.getElementById('productBrand').value;

  const product = new ProductModel(name, quantity, price, status, brand);

  let errorMessages = '';

  if (!product.validateName()) {
    errorMessages += 'Product name is required.<br>';
  }

  if (!product.validateQuantity()) {
    errorMessages += 'Product quantity cannot be negative.<br>';
  }

  if (!product.validatePrice()) {
    errorMessages += 'Product price cannot be negative.<br>';
  }

  if (!product.validateBrand()) {
    errorMessages += 'Product brand is required.<br>';
  }

  if (errorMessages) {
    document.getElementById('errorMessages').innerHTML = errorMessages;
    document.getElementById('errorMessages').style.display = "block"; // Make sure to show the div if it's hidden
  } else {
    // Form is valid, you can proceed with adding the product
    console.log('Product added successfully');
    // Reset form or close modal here if needed
  }
});
