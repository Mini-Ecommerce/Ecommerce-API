import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [AuthModule, UsersModule, ProductsModule, MongooseModule.forRoot(databaseConfig.uri)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
