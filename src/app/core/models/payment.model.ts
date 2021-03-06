import { Process } from './process.model';
export class Payment {
  id?: number;
  value: number;
  datePay: string;
  process: Process;

  constructor() {
    this.id = null;
    this.value = 0;
    this.datePay = '';
    this.process = new Process();
  }
}
