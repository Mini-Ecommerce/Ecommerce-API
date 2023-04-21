import { MongooseModuleOptions } from '@nestjs/mongoose';


export const databaseConfig: MongooseModuleOptions = {
    uri:'mongodb+srv://root:root@cluster0.g2pxb7f.mongodb.net/?retryWrites=true&w=majority',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};
  