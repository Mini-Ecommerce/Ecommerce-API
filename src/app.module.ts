import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './config/database.config';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, UsersModule, ProductsModule,
    MulterModule.register({dest:'./uploads'}),
    MongooseModule.forRoot(databaseConfig.uri),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
