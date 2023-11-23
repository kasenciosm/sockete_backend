import { OderInterface } from "./ordersInterface";

export class OrderService extends OderInterface {
    constructor(models) {
        super()
        this.orderModel = models.orders
    }


}