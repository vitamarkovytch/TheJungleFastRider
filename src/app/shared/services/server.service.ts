import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RidesModel} from '../models/rides.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) {
  }

  baseUrl = 'http://fast-rider.herokuapp.com/api/v1';
  token = 'd901573a653991cac2de57ee2e6356a043fc8ad03d';

  getAllRides(): Observable<RidesModel[]> {
    const url = this.baseUrl + '/rides?token=' + this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(url, {headers})
      .pipe(map((rides: any) => {
          return rides;
        })
      );
  }

  getTicket() {
    const url = this.baseUrl + '/tickets';
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const obj = {
      pin: 'JN-3117-5101-LJ',
      ride_id: 2,
      token: 'd901573a653991cac2de57ee2e6356a043fc8ad03d'
    };
    return this.http.post(url, 'pin=JN-3117-5100-LH&ride_id=6&token=d901573a653991cac2de57ee2e6356a043fc8ad03d', {headers});
  }
}
