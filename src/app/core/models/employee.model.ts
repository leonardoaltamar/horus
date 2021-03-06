import { TypeEmployee } from './type-employee.model';
import { Person } from './person.model';
import { Carrier } from './carrier.model';

export class Employee {
  id?: number;
  person: Person;
  typeEmployee: TypeEmployee;
  bank: string;
  accountNumber: string;
  contractDate: string;
  typeAccount: string;
  carrier: Carrier;
  total: number;

  constructor() {
    this.id = null;
    this.typeEmployee = new TypeEmployee();
    this.bank = '';
    this.accountNumber = '';
    this.contractDate = '';
    this.typeAccount = '';
    this.person = new Person();
    this.carrier = new Carrier();
    this.total = 0;
  }
}
