import { Busines } from './busines.model';
import { Person } from './person.model';
import { TypeSupplier } from "./type_supplier.model";

export class Supplier {
  id: number;
  typePerson?: string;
  person: Person;
  typeSupplier: TypeSupplier;
  busines: Busines;

  constructor() {
    this.id = null;
    this.typePerson = '';
    this.person = new Person();
    this.typeSupplier = new TypeSupplier();
    this.busines = new Busines();
  }
}
