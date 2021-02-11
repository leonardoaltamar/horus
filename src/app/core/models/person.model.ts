import { Gender } from './gender.model'
import { City } from './city.model'
import { Location } from './location.model'
import { MobilePhone } from './mobilePhone.model'
import { Email } from './email.model'

export class Person {
  id: number;
  name: string;
  surname: string;
  secondSurname: string;
  gender: Gender;
  documentType: string;
  documentNumber: number;
  expeditionDate: string;
  bloodType: string;
  expeditionCity: City;
  birthDate: string;
  imageUrl: string;
  locations?: Location[];
  emails?: Email[];
  mobilePhones?: MobilePhone[];

  constructor() {
    this.id = null;
    this.name = '';
    this.surname = '';
    this.secondSurname = '';
    this.gender = new Gender();
    this.documentType = '';
    this.documentNumber = null;
    this.locations = [];
    this.emails = [];
    this.mobilePhones = [];
    this.expeditionCity = new City();
    this.expeditionDate = '';
    this.bloodType = '';
    this.birthDate = '';
    this.imageUrl = '';
  }
}
