import { Process } from './process.model';
export class Payment {
  id?: number;
  value: number;
  process: Process;
  associateProcess: Process;
  constructor() {
    this.id = null;
    this.value = 0;
    this.process = new Process();
    this.associateProcess = new Process();
  }
}
