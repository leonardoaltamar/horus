import { Person } from './person.model';

export class Customer {
  id?: number;
  person: Person;

  constructor() {
    this.id = null;
    this.person = new Person();
  }
}
