export class CreateProductDto {
    name:string;
    description:string;
    price:number;
    stock:number;
    imageUrl:string;
    variations:VariationDTO[]
}

export class VariationDTO {
    name:string;
    value:string;
}
