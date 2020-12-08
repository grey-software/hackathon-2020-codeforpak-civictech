import { Resident } from "./../models/Resident";
import express from "express";
import Parse, { User } from "parse/node";
import { UserModel } from "../models/UserModel";


interface UserData {
  givenNames: string;
  lastName: string;
  password: string;
  phone: string;
  cnic: string;
}

interface UserLoginData {
  phone: string;
  password: string;
}

const UsersRouter = express.Router();

UsersRouter.get("/", getUsers);
UsersRouter.get("/:uid", getUser);
UsersRouter.post("/singup", signup);

export { UsersRouter };

function login(req: express.Request, res: express.Response) {
  console.log(req.body);
  const userData: UserData = req.body.user;
}

function signup(req: express.Request, res: express.Response) {
  console.log(req.body);
  const userData: Resident = req.body.user;
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
    .catch((error: any) => {
      console.log("Error: " + error.message);
      res.send("Error when creating user: " + error);
    });
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
