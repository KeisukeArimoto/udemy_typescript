import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class Product {
  @IsNotEmpty()
  titile: string;
  @IsNumber()
  @IsPositive()
  price: number;

  constructor(t: string, p: number) {
    this.titile = t;
    this.price = p;
  }

  getInformation() {
    return [this.titile, `${this.price}円`];
  }
}
