import { City } from './city.model';

export class Setting {
  id: number;
  avatar: string;
  nit: number;
  resolution: string;
  dane: number;
  email: string;
  phone: string;
  address: string;
  city: City;
  parameters?: any;
  sellerId: number;
  carrierId: number;

  constructor() {
    this.id = null;
    this.avatar = '';
    this.nit = null;
    this.resolution = '';
    this.dane = null;
    this.email = '';
    this.city = new City();
    this.parameters = {};
    this.sellerId = 0;
    this.carrierId = 0;
  }
}
