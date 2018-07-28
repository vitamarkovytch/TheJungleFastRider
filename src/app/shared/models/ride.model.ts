export class RideModel {
  constructor(
    public id?: number,
    public zone?: {
      id?: number,
      name?: string,
      color?: string
    },
    public name?: string,
    public remaining_tickets?: number,
    public return_time?: string
  ) {}
}
