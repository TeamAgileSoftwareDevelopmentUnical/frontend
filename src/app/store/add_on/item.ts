export class Item {
  public id: number;
  public name: string;
  public description: string;
  private priceInCents: number;
  private quantity: number;

  constructor(
    id: number,
    name: string,
    description: string,
    price: number | string,
    quantity?: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.priceInCents = this.numberValue(price) * 100;
    if (quantity && quantity > 1) {
      this.quantity = quantity;
    } else {
      this.quantity = 1;
    }
  }

  public addOne(): void {
    this.quantity = Number(this.quantity) + 1;
  }
  public addMany(num: number): void {
    this.quantity = Number(this.quantity) + num;
  }
  public removeOne(): void {
    this.quantity = Number(this.quantity) - 1;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getPrice(): string {
    return `${Math.floor(this.priceInCents / 100)}.${this.priceInCents % 100}`;
  }

  // eslint-disable-next-line max-len
  public toString = (): string =>
    `Item Name - ${this.name}\nDescription - ${this.description}\nQuantity - ${
      this.quantity
    }\nPrice - ${this.getPrice()}`;

  private numberValue(n: number | string): number {
    return typeof n === 'number' ? n : Number(n);
  }
}
