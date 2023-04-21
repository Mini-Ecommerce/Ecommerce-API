import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = new this.productModel(createProductDto);
    await newProduct.save();
  }

  async findAll() {
    const products = await this.productModel.find().exec();
    return products;
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );

    return productToUpdate
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
