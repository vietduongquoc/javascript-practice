// document.getElementById('addProductModal').addEventListener('submit', (e) => {
//   e.preventDefault(); // Prevent the form from submitting

//   const name = document.getElementById('productName').value;
//   const quantity = parseInt(document.getElementById('productQuantity').value, 10);
//   const type = document.getElementById('productType').value;
//   const price = parseFloat(document.getElementById('productPrice').value);
//   const status = document.getElementById('status-dropdown').value;
//   const brand = document.getElementById('productBrand').value;

//   const product = new ProductModel(name, quantity,type, price, status, brand);

//   let errorMessages = '';

//   if (!product.validateName()) {
//     errorMessages += 'Product name is required.<br>';
//   }

//   if (!product.validateQuantity()) {
//     errorMessages += 'Product quantity cannot be negative.<br>';
//   }

//   if (!product.validatePrice()) {
//     errorMessages += 'Product price cannot be negative.<br>';
//   }

//   if (!product.validateBrand()) {
//     errorMessages += 'Product brand is required.<br>';
//   }

//   if (errorMessages) {
//     document.getElementById('errorMessages').innerHTML = errorMessages;
//     document.getElementById('errorMessages').style.display = "block"; // Make sure to show the div if it's hidden
//   } else {
//     // Form is valid, you can proceed with adding the product
//     console.log('Product added successfully');
//     // Reset form or close modal here if needed
//   }
// });


import { validateForm } from "../models/user.model";
import { ACTION } from "../constants/action";
import MESSAGES from '../constants/messages';
import generateErrorMessages from "../../utils/dom";

export default class ProductFormController {
  constructor(view, APIHandler, action) {
    this.view = view;
    this.service = APIHandler;
    this.action = action;
  }

  /**
   * Renders add-product page
   */
  async displayProductFormPage() {
    let data = {};

    if (this.action === ACTION.EDIT) {
      const { params } = findRoute(window.location.pathname);

      data = await this.APIHandler.getById(params.id);
    }

    this.view.renderProductFormPage(data);

    this.bindProductFormEvent();
  }

  /**
   * Binds event to handle product addition
   */
  bindProductFormEvent() {
    const {
      ADD_PRODUCT_FAILED_MSG,
      ADD_PRODUCT_SUCCESS_MSG,
      UPDATE_ITEM_FAILED_MSG,
      UPDATE_ITEM_SUCCESS_MSG
    } = MESSAGES
    const submitBtnElement = getElementById('confirmBtnAdd');

    // Bind the click event to the 'Add Product' button
    submitBtnElement.addEventListener('click', async (event) => {
      event.preventDefault();

      // Get the values from the form inputs
      const nameValue = getElementValueById('productName');
      const TypeValue = getElementValueById('productType');
      const QuantityValue = getElementValueById('productQuantity');
      const priceValue = getElementValueById('productPrice');
      const brandValue = getElementValueById('productBrand');

      // Create a product object with the form input values
      const productInputs = {
        'Name': nameValue,
        'Price': priceValue,
        'Brand': brandValue,
        'Type': TypeValue,
        'Quantity': QuantityValue,
      }

      const { formError } = validateForm(productInputs);

      // Generate new error messages based on the validation results
      generateErrorMessages(formError);

      // If there are any validation errors, stop the function
      const isPassed = Object.values(formError).every(value => value === '');
      if (!isPassed) {
        return;
      }

      const product = {
        name: nameValue,
        price: priceValue,
        brand: brandValue,
        type: TypeValue,
        quantity: QuantityValue
      }

      switch (this.action) {
        case ACTION.ADD: {
          const { isSuccess } = await this.APIHandler.add(product);

          if (!isSuccess) {
            return Toast.error(ADD_PRODUCT_FAILED_MSG);
          }

          Toast.success(ADD_PRODUCT_SUCCESS_MSG);

          return handleRoute({ href: '/' });

        }
        case ACTION.EDIT: {
          const { params } = findRoute(window.location.pathname);

          const { isSuccess } = await this.service.editById(params.id, product);

          if (!isSuccess) {
            return Toast.error(UPDATE_ITEM_FAILED_MSG);
          }

          Toast.success(UPDATE_ITEM_SUCCESS_MSG);

        }
      }

      this.displayProductFormPage();
    });
  }
}
