export class CreateProductDto {
    name:string;
    description:string;
    price:number;
    variations:VariationDTO[]
}

export class VariationDTO {
    name:string;
    value:string;
}
