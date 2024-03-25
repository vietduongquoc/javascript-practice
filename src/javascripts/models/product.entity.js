export default class ProductEntity {
  constructor(data) {
      this.id = data.id;
      this.name = data.name;
      this.type = data.type;
      this.brand = data.brand;
      this.price = data.price;
      this.quantity = data.quantity;
      this.status = data.status;
  }
}
