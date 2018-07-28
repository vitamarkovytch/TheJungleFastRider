import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: any;

  constructor() {
  }

  saveData(data) {
    this.data = data;
  }

  getData() {
    return this.data;
    /*return  {
      'id': 404,
      'ride': {
        'id': 2,
        'zone': {
          'id': 1,
          'name': 'Mandrill Town',
          'color': '#df8649'
        },
        'name': 'Let\'s Go Bananas!',
        'remaining_tickets': 24,
        'return_time': '2018-07-24T18:30:00.000+03:00'
      },
      'access_code': '9740-413b-a08f',
      'return_time': '2018-07-24T18:30:00.000+03:00'
    };*/
  }
}
