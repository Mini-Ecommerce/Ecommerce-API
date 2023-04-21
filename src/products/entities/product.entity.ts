import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {

    @Prop({required: true})
    name:string

    @Prop({required: true})
    description:string

    @Prop({required: true})
    price:number

    @Prop({required:true})
    stock:number

    @Prop({require:true})
    imageUrl:string
    
    @Prop({required: true})
    variations:Variation[]
}

export const ProductSchema = SchemaFactory.createForClass(Product)


@Schema()
export class Variation{
    @Prop({required:true})
    name:string

    @Prop({required:true})
    value:string
}

export const VariationSchema = SchemaFactory.createForClass(Variation)