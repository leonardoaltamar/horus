import { Option } from './option.model';
import { Section } from './section.model';
export class UserType {
  id: number;
  code: string;
  name: string;
  notes: string;
  sections: Section[];

  constructor() {
    this.id = null;
    this.code = '';
    this.name = '';
    this.notes = '';
    this.sections = [];
  }
}
