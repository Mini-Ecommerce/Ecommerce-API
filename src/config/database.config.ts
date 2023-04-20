import { MongooseModuleOptions } from '@nestjs/mongoose';


export const databaseConfig: MongooseModuleOptions = {
    uri:'mongodb+srv://ecommerce:2611rs@cluster0.exda9mr.mongodb.net/test',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };
  