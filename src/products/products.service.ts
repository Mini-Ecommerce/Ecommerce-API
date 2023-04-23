import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { S3Service } from 'src/utils/aws-s3';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private readonly s3Service: S3Service,
  ) {}

  async create(createProductDto: CreateProductDto, imageUrl: string) {
    const newProduct = new this.productModel({
      ...createProductDto,
      imageUrl,
    });
  
    const savedProduct = await newProduct.save();
    return { message: 'Produto adicionado com sucesso', Produto: savedProduct };
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

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    file?: Express.Multer.File,
  ) {
    Object.keys(updateProductDto).forEach(
      (key) => updateProductDto[key] === null && delete updateProductDto[key],
    );

    const productToUpdate = await this.productModel.findById(id);

    if (!productToUpdate) {
      throw new NotFoundException('Produto não existe!');
    }

    if (productToUpdate.imageUrl) {
      await this.s3Service.deleteFile(productToUpdate.imageUrl);
    }

    if (file) {
      const imageUrl = await this.s3Service.uploadFile(file, 'products');
      updateProductDto.imageUrl = imageUrl;
    }

    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      { $set: updateProductDto },
      { new: true },
    );

    return updatedProduct;
  }

  async remove(id: string) {
    const productToDelete = await this.productModel.findById(id);
    if (!productToDelete) {
      throw new NotFoundException(`Product não encontrado`);
    }
    await this.s3Service.deleteFile(productToDelete.imageUrl)
    await this.productModel.deleteOne({ _id: id }).exec();
    return { message: `Produto deletado com sucesso!` };
  }


  async findAllPaginated(page = 1, limit = 10) {
    const products = await this.productModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    const totalProducts = await this.productModel.countDocuments().exec();
    const totalPages = Math.ceil(totalProducts / limit);
    return {
      data: products,
      page,
      totalPages,
      totalProducts,
    };
  }
}
