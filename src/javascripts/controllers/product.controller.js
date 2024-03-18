
// export default class ProductController {
//   constructor(model, view) {
//     this.model = model
//     this.view = view
//     this.data = []
//     this.handleGetData()
//   }

//   handleGetData = async () => {
//     this.data = await this.model.getDataLength()
//   }

//   handlePagination = async () => {
//     const data = await this.model.handlePagination()
//     this.view.renderProducts(data)
//   }
//   static handlePagination(event) {
//     const target = event.target;
//       if (!target.classList.contains('pagination-link')) {
//         return;
//       }
//       const page = target.textContent;
//       ProductModel.get({ page: page })
//         .then(data => {
//           ProductView.renderProducts(data);
//         })
//         .catch(error => console.error('Failed to load products:', error));
//   }
// }

const homePage = document.querySelector('.homepage');
// Get the button that opens the modal
const btn = document.getElementById("addBtn");

homePage.addEventListener('click', (e) => {
  const target = e.target;
  const modal = document.getElementById("addProductModal");
  if (target.id === 'addBtn' || target.id === "add-close") {
    modal.firstElementChild.reset();
    modal.classList.toggle('hidden');
  }
  else if (target.classList.contains('pagination-link')) {
    const url = target.getAttribute('href');
    e.preventDefault();
    window.history.pushState(null, '', url);
    const page = target.textContent;
    ProductView.currentPage = parseInt(page);

    ProductModel.get()
      .then(data => {
        ProductView.renderProducts(data);
      })
      .catch(error => console.error('Failed to load products:', error));
  }
});





