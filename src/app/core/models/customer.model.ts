import { Person } from './person.model';
import { Busines } from './busines.model';
export class Customer {
  id?: number;
  person: Person;
  business: Busines;
  constructor() {
    this.id = null;
    this.person = new Person();
    this.business = new Busines();
  }
}
