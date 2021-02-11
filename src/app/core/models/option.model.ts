import { Section } from './section.model';
import { Permission } from './permission.model';
export class Option {
  id: number;
  code: string;
  name: string;
  path: string;
  icon: string;
  notes: string;
  section?: Section;
  permissions?: Permission[];

  constructor() {
    this.id = null,
    this.code = '',
    this.name = '',
    this.path = '',
    this.icon = '',
    this.notes = '',
    this.section = null,
    this.permissions = []
  }
}
