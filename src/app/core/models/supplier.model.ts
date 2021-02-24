import { Busines } from './busines.model';
import { Person } from './person.model';
import { TypeSupplier } from "./type_supplier.model";

export class Supplier {
  id: number;
  typePerson?: string;
  person: Person;
  typeSupplier: TypeSupplier;
  business: Busines;

  constructor() {
    this.id = null;
    this.typePerson = '';
    this.person = new Person();
    this.typeSupplier = new TypeSupplier();
    this.business = new Busines();
  }
}
