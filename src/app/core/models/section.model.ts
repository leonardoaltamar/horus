import { Option } from './option.model';
export class Section {
  id: number;
  code: string;
  name: string;
  icon: string;
  path: string;
  notes: string;
  options?: Option[];
  constructor() {

    this.id = null,
    this.code = '',
    this.name = '',
    this.icon = '',
    this.path = '',
    this.notes = '',
    this.options = []
  }
}

