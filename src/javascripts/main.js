import ProductController from "./controllers/product.controller";
import ProductModel from "./models/product.model";
import ProductView from "./views/product.view"

const productController = new ProductController(new ProductModel(), new ProductView());

productController.init()
