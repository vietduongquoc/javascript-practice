class validateForm {
  constructor(name, quantity, price, status, brand) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.status = status;
    this.brand = brand;
  }

  validateName() {
    return this.name.length > 0;
  }

  validateQuantity() {
    return this.quantity >= 0;
  }

  validatePrice() {
    return this.price >= 0;
  }

  validateBrand() {
    return this.brand.length > 0;
  }
}
export { validateForm };
