import Parse, { User } from "parse/node";
import { Resident } from "./Resident";

Parse.initialize(
  "template-backend-parse-express-ts",
  process.env.APP_MASTER_KEY
);

export class UserModel extends User {
  constructor(resident: Resident) {
    super();
    this.set("givenNames", resident.given_names);
    this.set("lastName", resident.last_name);
    this.set("username", resident.phone);
    this.set("phone", resident.phone);
    this.set("password", resident.phone);
    this.set("cnic", resident.cnic);
    this.set("type", resident.type);
    this.set("address", resident.address);
  }
}
