import Parse, { User } from "parse/node";
import { UserModel } from "../models/UserModel";
import { SMSServiceRequest } from "../models/SMSServiceRequest";

async function SendUserVerificationNumber(userPhone : string){

const username = process.env.SMS_API_USERNAME
const password = process.env.SMS_API_PASSWORD
const phone = userPhone;
const sender = "Government of Muzaffarabad";
const message = `Your code is ${Math.floor(Math.random() * 100000)}`;

const url = "https://sendpk.com/api/sms.php?username="+ username + "&password=" + password + "&sender=" + sender + "&mobile="+ + "&format=json&message="+ message;

const response = await fetch( url.toString() );
const data = await response.json();



}
// When a user initially enters phone and requests auth
// We generate a code and save it
// We call the sms api and then wait
// When a user enters their SMS code 
// Login if code matches 

// REQ
// https://sendpk.com/api/sms.php?username=USERNAME&password=PASSWORD&sender=BrandName&mobile=92310&format=json&message=this+is+json+api.
// RES
// {"success":"true","type":"API","totalprice":"0.002","totalgsm":"1","remaincredit":"53.415855","results":[{"status":"OK","messageid":"618948","gsm":"923101542000"}]}
// When we get a code input from the user, we check if 
