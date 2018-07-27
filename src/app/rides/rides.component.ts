import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {ServerService} from '../shared/services/server.service';
import {RidesModel} from '../shared/models/rides.model';
import {PinValidatorDirective} from '../shared/directives/pin-validator.directive';
import {SendDataForTicketModel} from '../shared/models/send-data-forTicket.model';
import {DataService} from '../shared/services/data.service';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.scss']
})
export class RidesComponent implements OnInit {
  rides: RidesModel[] = [];
  colorRides = '#373737';
  clickedRideId = -1;
  form: FormGroup;
  sendDataForTicket: SendDataForTicketModel;


  constructor(private formBuilder: FormBuilder,
              private serverService: ServerService,
              private dataService: DataService,
              private router: Router) {
  }

  ngOnInit() {
    this.getRides();
    this.createForm();

    /*MAKE BUTTON SUBMIT DISAPPEAR WHEN WE SCROLL DOWN THE MOBILE DEVICE SCREEN*/
    $(document).scroll(function () {
      if ($(window).scrollTop() > 300) {
        $('#submitBtn').hide();
      } else if ($(window).scrollTop() < 300) {
        $('#submitBtn').show();
      }
    });

  }

  private getRides() {
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

  private createForm() {
    this.form = this.formBuilder.group({
      pin: ['',
        Validators.compose([Validators.required,
          PinValidatorDirective.validPin])]
    });
  }


   chooseRide(ride) {

    /*if (ride.remaining_tickets === 0 || ride.return_time === null) {
      return;
    }*/

    /* disable previously selected ride */
    if (this.clickedRideId !== -1) {
      document.getElementById(this.clickedRideId.toString()).style.backgroundColor = this.colorRides;
    }

    if (this.clickedRideId === ride.id) {
      this.clickedRideId = -1;
    } else {
      this.clickedRideId = ride.id;
      document.getElementById(ride.id).style.backgroundColor = ride.zone.color;
    }
  }

  onSubmit() {
    this.sendDataForTicket = new SendDataForTicketModel(this.form.value['pin'], this.clickedRideId);
    this.getAccessTicket(this.sendDataForTicket);
  }

  private getAccessTicket(data: SendDataForTicketModel) {
    this.serverService.getTicket(data).subscribe(
      response => {
        console.log(response);
        this.dataService.saveData(response);
        this.router.navigate(['/access']);
      },
      error => {
        console.log(error);
        
      }
    );
  }




}
