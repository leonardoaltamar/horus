import { State } from './state.modal'

export class City {
  id: number;
  name: string;
  code: string;
  state: State;

  constructor() {
    this.id = null;
    this.name = '';
    this.code = '';
    this.state = new State();
  }
}
