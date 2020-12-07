import express from "express";
import Parse, { User } from "parse/node";

class UserModel extends User {
  constructor(userData: UserData) {
    // Pass the ClassName to the Parse.Object constructor
    super();
    this.set("givenNames", userData.givenNames);
    this.set("lastName", userData.lastName);
    this.set("username", userData.phone);
    this.set("password", userData.password);
    this.set("phone", userData.phone);
    this.set("cnic", userData.cnic);
  }
}

Parse.Object.registerSubclass("User", UserModel);

interface UserData {
  givenNames: string;
  lastName: string;
  password: string;
  phone: string;
  cnic: string;
}

const UsersRouter = express.Router();

UsersRouter.get("/", getUsers);
UsersRouter.get("/:uid", getUser);
UsersRouter.post("/create", createUser);
UsersRouter.delete("/:uid", deleteUser);
UsersRouter.post("/:uid", updateUser);

export { UsersRouter };

function createUser(req: express.Request, res: express.Response) {
  console.log(req.body);
  const userData: UserData = req.body.user;
  if (userData === undefined) {
    res.send("Fail ");
  }

  const newUserModel = new UserModel(userData);

  newUserModel
    .save()
    .then((user: User) => {
      console.log("User created successful with name: " + user);
      res.send("User Created: " + user.id);
    })
    .catch((error) => {
      console.log("Error: " + error.message);
      res.send("Error when creating user: " + error);
    });
}
function deleteUser(req: express.Request, res: express.Response) {
  res.send("User Deleted");
}
function updateUser(req: express.Request, res: express.Response) {
  res.send("User Updated");
}
async function getUser(req: express.Request, res: express.Response) {
  const query = new Parse.Query(User);
  const uid = req.params.uid;
  query.equalTo("id", uid);
  const queryResult = await query
    .first()
    .then(function(user) {
      if (user) {
        console.log(`User with ${uid} found successfully: ${user}`);
        res.send({
          status: "sucess",
          user: user,
        });
      } else {
        console.log(`User with ${uid} not found`);
      }
    })
    .catch(function(error) {
      console.log("Error: " + error.code + " " + error.message);
    });
  res.send("User Found");
}
function getUsers(req: express.Request, res: express.Response) {
  res.send("Users Found");
}

const testUsers: Array<UserData> = [
  {
    givenNames: "Muhammad Arsala Khan",
    lastName: "Bangash",
    password: "1234",
    phone: "03135020202",
    cnic: "234-34234-234234",
  },
];
