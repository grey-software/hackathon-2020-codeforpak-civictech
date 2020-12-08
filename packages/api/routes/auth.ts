import express from "express";
import axios from "axios";
const AuthRouter = express.Router();

const SmsAuthCode = Parse.Object.extend("SmsAuthCode");

const requestPhoneAuth = async (
  req: express.Request,
  res: express.Response
) => {
  console.log(req.body);
  const username = process.env.SMS_API_USERNAME;
  const password = process.env.SMS_API_PASSWORD;
  const phone: string = "92" + req.body.phone.slice(1);
  console.log("Phone number " + phone);
  const sender = "Government+of+Muzaffarabad";
  const code = Math.floor(Math.random() * 100000);
  const message = `Your+code+is+${code}`;

  const url =
    "https://sendpk.com/api/sms.php?username=" +
    username +
    "&password=" +
    password +
    "&sender=" +
    sender +
    "&mobile=" +
    "92" +
    phone +
    "&format=json&message=" +
    message;

  console.log("Final sms api call " + url);

  // const response = await $axios.$get(url.toString())
  const response = await axios.get(url.toString());

  if ((response.data.success = true)) {
  } else {
    res.send("Failed = " + response.data.results.error);
  }

  // log the SMS activity in the data base
  //   const smsActivity = Parse.Object.extend("SmsServiceActivity");
  //   smsActivity.request = url;
  //   smsActivity.response = response.data;
  //   smsActivity;
  const smsAuthCode = new SmsAuthCode();
  smsAuthCode.set("phone", phone);
  smsAuthCode.set("code", code);
  smsAuthCode
    .save()
    .then((smsAuth: any) => {
      console.log("SMS Auth code saved successfully!");
      res.send("Message was sent successfully ");
    })
    .catch((e: any) => {
      console.log(`Error: ${e}`);
      res.send(`Error: ${e}`);
    });
};
const validateUserCode = (req: express.Request, res: express.Response) => {
  const query = new Parse.Query(SmsAuthCode);
  const phone = req.body.phone;
  query.equalTo("phone", phone);

  const queryResult = query
    .first()
    .then(function(smsAuthCode) {
      res.send({
        code: smsAuthCode?.get("phone"),
      });
    })
    .catch(function(error) {
      console.log("Error: " + error.code + " " + error.message);
      res.send("Error: " + error.code + " " + error.message);
    });

  //   const smsCode: string = req.body.smsCode;
  //   var isNumber = Number(smsCode);

  //   if (smsCode.length == 5 && !isNaN(+isNumber)) {
  //     res.send("UserCode was valid");
  //   } else {
  //     res.send("Invalid Usercode");
  //   }
};

AuthRouter.post("/request", requestPhoneAuth);
AuthRouter.post("/validate", validateUserCode);

export { AuthRouter };
