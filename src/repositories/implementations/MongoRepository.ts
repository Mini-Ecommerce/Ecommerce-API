import { Product } from 'src/products/entities/product.entity';
import { IProductRepository } from '../IProductRepository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export class MongoRepository implements IProductRepository {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async findAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products;
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    return product;
  }

  async save(product: Product): Promise<void> {
    const newProduct = new this.productModel(product);
    await newProduct.save();
  }

  deleteProduct(id: string): Promise<void> {
    return;
  }

  updateProduct(id: string, product: Product): Promise<Product> {
    return;
  }
}
