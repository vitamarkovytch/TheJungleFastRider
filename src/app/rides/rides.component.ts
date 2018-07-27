import {Component, OnInit} from '@angular/core';
import {ServerService} from '../shared/services/server.service';
import {RidesModel} from '../shared/models/rides.model';
import * as $ from 'jquery';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.scss']
})
export class RidesComponent implements OnInit {
  rides: RidesModel[] = [];

  constructor(private serverService: ServerService) {
  }

  ngOnInit() {
    this.getRides();
    // this.getAccessTicket();

    /*MAKE BUTTON SUBMIT DISAPPEAR WHEN WE SCROLL DOWN THE MOBILE DEVICE SCREEN*/
    $(document).scroll(function () {
      if ($(window).scrollTop() > 300) {
        $('#submitBtn').hide();
      } else if ($(window).scrollTop() < 300) {
        $('#submitBtn').show();
      }
    });

  }

  getRides() {
    this.serverService.getAllRides().subscribe(
      response => {
        this.rides = response;
        console.log(this.rides);
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
