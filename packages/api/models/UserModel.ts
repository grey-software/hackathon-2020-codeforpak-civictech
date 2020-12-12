import Parse, { User } from "parse/node";
import { Resident } from "./Resident";
import { UserInitData } from "./UserInitData";

Parse.initialize(
  process.env.APP_ID || "template-backend-parse-express-ts",
  process.env.APP_MASTER_KEY
);

export class UserModel extends User {
  addResidentInfo(resident: Resident) {
    this.set("givenNames", resident.given_names);
    this.set("lastName", resident.last_name);
    this.set("username", resident.phone);
    this.set("phone", resident.phone);
    this.set("password", resident.phone);
    this.set("cnic", resident.cnic);
    this.set("type", resident.type);
    this.set("address", resident.address);
  }

  constructor(userData: UserInitData) {
    super();
    this.set("username", userData.phone);
    this.set("phone", userData.phone);
    this.set("password", userData.phone);
    this.set("cnic", userData.cnic);
  }
}
