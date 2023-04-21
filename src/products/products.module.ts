import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './entities/product.entity';
import { S3Service } from 'src/utils/aws-s3';



@Module({
  imports:[MongooseModule.forFeature([{name:'Product', schema:ProductSchema}])],
  controllers: [ProductsController],
  providers: [ProductsService, S3Service]
})
export class ProductsModule {}
