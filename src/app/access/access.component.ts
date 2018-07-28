import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {DataService} from '../shared/services/data.service';
import {TicketModel} from '../shared/models/ticket.model';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit {
  ticket: TicketModel;
  loadData = false;

  constructor(private dataServise: DataService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.dataServise.getData()) {
      this.loadData = true;
      this.ticket = this.dataServise.getData();
    } else {
      this.loadData = false;
      this.router.navigate(['/']);
    }
  }

}
