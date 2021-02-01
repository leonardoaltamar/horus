export class Product{
  id?:number;
  description: string;
  count: number;
  name: string

  constructor(){
    this.id = null;
    this.description = '';
    this.count = 0;
    this.name = '';
  }
}
