import { ResidentType } from './ResidentType';
export interface Resident {
    type: ResidentType,
    given_names: Array<string>
    last_name: string
    phone: string 
    cnic: string
    address: string
}

export const testResidents: Array<Resident> = [
    {
      type: ResidentType.INDIVIDUAL,
      given_names: ["Muhammad", "Arsala", "Khan"],
      last_name: "Bangash",
      phone: "0313" + Math.floor(Math.random() * 10000000),
      cnic: "32443235456355",
      address: "CS House, Muzaffarabad",
    },
    {
      type: ResidentType.INDIVIDUAL,
      given_names: ["Abdul", "Ghaffar", "Khan"],
      last_name: "Bangash",
      phone: "0313" + Math.floor(Math.random() * 10000000),
      cnic: "32443235456356",
      address: "CS House, Muzaffarabad",
    },
  ];