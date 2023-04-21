import { Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      const newProduct = new this.productModel(createProductDto);
      await newProduct.save();
    } catch {
      throw new NotFoundException('Produto não foi adicionado por algum erro!');
    }

    return { message: 'Produto adicionado com sucesso' };
  }

  async findAll() {
    try {
      const products = await this.productModel.find().exec();
      return products;
    } catch {
      throw new NotFoundException('Não há produtos registrados ainda!');
    }
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new NotFoundException('Produto não existe!');
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    Object.keys(updateProductDto).forEach(
      (key) => updateProductDto[key] === null && delete updateProductDto[key],
    );

    const productToUpdate = await this.productModel.findByIdAndUpdate(
      id,
      { $set: updateProductDto },
      { new: true },
    );

    if (!productToUpdate) {
      throw new NotFoundException('Produto não existe!');
    }

    return productToUpdate;
  }

  async remove(id: string) {
    const productToDelete = await this.productModel.findById(id);
    if (!productToDelete) {
      throw new NotFoundException(`Product não encontrado`);
    }
    await this.productModel.deleteOne({ _id: id }).exec();
    return { message: `Produto deletado com sucesso!` };
  }
}
