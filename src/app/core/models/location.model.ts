import { City } from './city.model'

export class Location {
  id: number;
  address: string;
  phoneNumber: string;
  neighborhood: string;
  main: number;
  city: City;

  constructor() {
    this.id = null;
    this.city = new City();
    this.address = '';
    this.phoneNumber = '';
    this.neighborhood = '';
    this.main = 0;
  }
}
