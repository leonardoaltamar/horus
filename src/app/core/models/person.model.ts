import { City } from './city.model'
import { Location } from './location.model'
import { MobilePhone } from './mobilePhone.model'
import { Email } from './email.model'
import { Gender } from './gerder.model'

export class Person {
  id?: number;
  name: string;
  surname: string;
  secondSurname: string;
  documentType: string;
  documentNumber: number;
  birthDate: string;
  expeditionCity: City;
  imageUrl: string;
  locations?: Location[];
  emails?: Email[];
  mobilePhones?: MobilePhone[];
  gender: Gender;

  constructor() {
    this.id = null;
    this.name = '';
    this.surname = '';
    this.secondSurname = '';
    this.documentType = '';
    this.documentNumber = null;
    this.locations = [];
    this.emails = [];
    this.mobilePhones = [];
    this.expeditionCity = new City();
    this.gender = new Gender();
    this.birthDate = '';
    this.imageUrl = '';
  }
}
