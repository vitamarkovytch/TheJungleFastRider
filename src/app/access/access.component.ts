import { Component, OnInit } from '@angular/core';
import {DataService} from '../shared/services/data.service';
import {TicketModel} from '../shared/models/ticket.model';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit {
  ticket: TicketModel;

  constructor(private dataServise: DataService) { }

  ngOnInit() {
    console.log(this.dataServise.getData());
    this.ticket = this.dataServise.getData();
  }

}
