import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import {IProductRepository} from '../repositories/IProductRepository'

@Injectable()
export class ProductsService {
  constructor(
    @Inject(IProductRepository) private productRepository: IProductRepository
    ) {}

  async create(data: CreateProductDto) {
    const product = new Product()

    await this.productRepository.save(product)
  }

  async findAll() {
    const products = await this.productRepository.findAllProducts()
    return products
  }

  async findOne(id: string) {}

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
