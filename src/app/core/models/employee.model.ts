import { Person } from './person.model';

export class Employee {
  id?: number;
  person: Person;
  type: string;
  licensePlate?: string;

  constructor() {
    this.id = null;
    this.type = '';
    this.person = new Person();
    this.licensePlate = '';
  }
}
