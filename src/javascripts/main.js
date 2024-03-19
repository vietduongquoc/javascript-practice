import ProductController from "./controllers/product.controller";
import ProductModel from "./models/product.model";
import ProductView from "./views/product.view"

// new ProductController(new ProductModel(), new ProductView());


function showLoader() {
  document.getElementById('loader').style.display = 'block';
}

// Hàm để ẩn biểu tượng tải
function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}

// Hàm gọi API và thực hiện hiển thị/ẩn biểu tượng tải
async function callAPI() {
  try {
    showLoader(); // Hiển thị biểu tượng tải trước khi gọi API

    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    console.log(data); // Xử lý dữ liệu từ API

  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    hideLoader(); // Ẩn biểu tượng tải sau khi nhận được phản hồi từ API
  }
}

// Gọi hàm để thực hiện gọi API và xử lý dữ liệu
callAPI();


