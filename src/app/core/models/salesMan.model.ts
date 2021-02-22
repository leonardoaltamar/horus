import { Person } from './person.model';

export class SalesMan {
  id?: number;
  person: Person;

  constructor() {
    this.id = null;
    this.person = new Person();
  }
}
