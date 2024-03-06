// export default class ProductController {
//   constructor(view, model) {
//     this.view = view;
//     this.model = model;

//   }

//   /**
//    * Calls displaying products
//    */
//   async init() {
//     await this.displayProducts();
//     console.log("view" ,view);
//   }

//   /**
//    * Fetches products from the server and displays them
//    */
//   async displayProducts() {
//     const products = await this.model.getAll();

//     this.view.renderProducts(products);

//     this.bindDeleteProductEvent();
//   }

//   /**
//    * Binds the delete product event to each delete button
//    * If the deletion is successful, it re-displays the products
//    */
//   bindDeleteProductEvent() {
//     const btnDeleteElements = document.querySelectorAll('.btn-delete');

//     btnDeleteElements.forEach(element => {
//       element.addEventListener('click', async (e) => {
//         const target = e.target;
//         const id = target.data.id;

//         const { isSuccess } = await this.model.deleteById(id);

//         if(!isSuccess) {
//           return Toast.error('Failed to delete the product!');
//         }

//         Toast.success('Successfully deleted the product!');
//         this.displayProducts();
//       });
//     });
//   }
// }

