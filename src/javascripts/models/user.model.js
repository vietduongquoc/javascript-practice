class ProductModel {
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
    return this.quantity >= 0; // Số lượng không được âm
  }

  validatePrice() {
    return this.price >= 0; // Giá không được âm
  }

  validateBrand() {
    return this.brand.length > 0;
  }
}
export { validateForm };
