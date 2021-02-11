import { Person } from './person.model';
import { UserType } from './user-type.model';

export class User {
  id?: number;
  username: string;
  password?: string;
  notes?: string;
  person: Person;
  userType: UserType;
  permissions?: any[];
  token?: string;
  state?: string;

  constructor() {
    this.id = null;
    this.username = '';
    this.password = '';
    this.notes = '';
    this.person = new Person();
    this.userType = new UserType();
    this.permissions = [];
    this.token = '';
    this.state = 'A';
  }
}
