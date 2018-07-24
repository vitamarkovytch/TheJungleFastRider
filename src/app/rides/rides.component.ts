import { Component, OnInit } from '@angular/core';
import {ServerService} from '../shared/services/server.service';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.scss']
})
export class RidesComponent implements OnInit {

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.getRides();
    // this.getAccessTicket();
  }

  getRides() {
    this.serverService.getAllRides().subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  getAccessTicket() {
    this.serverService.getTicket().subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
