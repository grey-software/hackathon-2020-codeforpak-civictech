import express from "express"
import { Payments } from "../models/Payment";

const PaymentsRouter = express.Router()

PaymentsRouter.post('/create', makePayment)

export { PaymentsRouter }

function makePayment(req: express.Request, res: express.Response){
    console.log(req.body)
    const paymentData: Payments = req.body.payment
    if (paymentData === undefined) {
        res.send('Payment Request was invalid.')
    }

    const newPaymentModel = Parse.Object.extend("Payments")

    newPaymentModel.save().then((payment: Payments) =>{
         console.log('Payment Record created successful with name: ' + payment.Amount);
         res.send("Payment Record: "+ payment.Amount);
    }).catch((error :any) =>{
         console.log('Error: ' + error.message);
         res.send("Error when creating user: " + error);

    });
}
