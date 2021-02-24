import { Article } from './article.model';
export class ProductionOrder{
  id?:number;
  date: string;
  numOrder: string;
  numLote: string;
  articles: Article[];

  constructor(){
    this.id = null;
    this.date;
    this.numOrder;
    this.articles = [];
  }
}



