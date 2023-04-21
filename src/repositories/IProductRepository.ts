import { Product } from "src/products/entities/product.entity";

export interface IProductRepository {
    save(product: Product): Promise<void>
    findAllProducts():Promise<Product[]>
    findById(id:string):Promise<Product>
    deleteProduct(id:string):Promise<void>
    updateProduct(id:string, product: Product):Promise<Product>
}