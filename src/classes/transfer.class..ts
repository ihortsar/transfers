export class Transfer {
    route;
    date;
    pick_up_time;
    number_of_passengers;
    fare?;
    vehicle_class?;
    customer_information?;
    created_by?;
    drivers_id
    constructor(data?: any) {
        this.route = data.route;
        this.date = data.date;
        this.pick_up_time = data.pickup_time;
        this.number_of_passengers = data.number_of_passengers;
        this.fare = data.fare;
        this.vehicle_class = data.vehicle_class;
        this.customer_information = data.customer_information;
        this.created_by = data.created_by;
        this.drivers_id = data.drivers_id;
    }
}


