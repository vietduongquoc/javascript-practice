import { API } from '../constants/url-api';
import ProductEntity from './product.entity';

export default class ProductModel {

  createList = (data) => {
    return data.map(item => new ProductEntity(item));
  }
}
