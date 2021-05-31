import { Article } from './article.model';
import { Process } from './process.model';
import { Account } from './accounts.model';
import { Lien } from './lien.model';

export class DetailProcess {
  id: number;
  article: Article;
  process: Process;
  price: number;
  count: string;
  nature: string;
  total?: number;
  subtotal?: number;
  totalLien?: number;
  account: Account;
  lien:Lien;
  constructor() {
    this.id = null;
    this.article = new Article();
    this.process = new Process();
    this.account = new Account();
    this.subtotal = 0;
    this.totalLien = 0;
    this.lien = new Lien();
  }
}
