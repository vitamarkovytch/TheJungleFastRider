import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {ServerService} from '../shared/services/server.service';
import {RideModel} from '../shared/models/ride.model';
import {PinValidatorDirective} from '../shared/directives/pin-validator.directive';
import {SendDataForTicketModel} from '../shared/models/send-data-forTicket.model';
import {DataService} from '../shared/services/data.service';
import {ErrorMessage} from '../shared/models/message.model';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.scss']
})
export class RidesComponent implements OnInit {
  rides: RideModel[] = [];
  colorRides = '#373737';
  clickedRideId = -1;
  form: FormGroup;
  sendDataForTicket: SendDataForTicketModel;
  message: ErrorMessage;
  ridesLoaded: boolean;
  isProgress = true;

  constructor(private formBuilder: FormBuilder,
              private serverService: ServerService,
              private dataService: DataService,
              private router: Router) {
  }

  ngOnInit() {
    this.message = new ErrorMessage('', '');
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
        this.ridesLoaded = true;
        this.isProgress = false;
        this.rides = response;

        /*ADD/DELETE PROGRESS BAR*/

      },
      error => {
        console.log(error);
        this.ridesLoaded = false;
        this.isProgress = false;
        if (error.status === 401) {
          this.showMessage('danger', error.message);
        } else {
          this.showMessage('danger', 'Server error. Check your internet or contact ' +
            'to administrator');
        }
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

  getErrorMessage(string) {
    return this.form.get(string).hasError('required') ? 'This field is mandatory' :
      this.form.get(string).hasError('pin') ? 'Wrong PIN, please write your pin ' +
        'on XX-XXXX-XXXX-XX format' :
          '';
  }


  chooseRide(ride) {
    if (ride.remaining_tickets === 0 || ride.return_time === null) {
      return;
    }

    /* ALWAYS DISABLE PREVIOUSLY SELECTED RIDE BY CHANGING IT COLOR TO GREY */
    if (this.clickedRideId !== -1) {
      document.getElementById(this.clickedRideId.toString()).style.backgroundColor = this.colorRides;
    }

    /* IF WE CLICK ON THE SAME RIDE -1 MAKE THE FORM INVALID */
    if (this.clickedRideId === ride.id) {
      this.clickedRideId = -1;
    } else {
      /* CHANGING COLOR OF SELECTED RIDE*/
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
        this.dataService.saveData(response);
        this.router.navigate(['/access']);
      },
      error => {
        if (error.error.code === 401 || error.error.code === 503 || error.error.code === 4000
          || error.error.code === 4001 || error.error.code === 4002 || error.error.code === 4003) {
          this.showMessage('danger', error.error.message);
        } else {
          this.showMessage('danger', 'Server error. Check your internet or contact ' +
            'to administrator');
        }
      }
    );
  }

  private showMessage(type: string, text: string) {
    this.message = new ErrorMessage(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 10000);
  }


}
