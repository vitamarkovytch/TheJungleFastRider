import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: any;
  pin: any;

  constructor() {
  }

  saveData(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }
}
