import {RideModel} from './ride.model';

export class TicketModel {
  constructor(
    public id?: number,
    public ride?: RideModel,
    public access_code?: string,
    public return_time?: string
  ) {}
}
