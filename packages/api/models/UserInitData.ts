export interface UserInitData {
    phone: string, 
    cnic: string
}

export const testUserInitData: Array<UserInitData> = [
    {
      phone: "0313" + Math.floor(Math.random() * 10000000),
      cnic: "32443235456355",
    },
    {
      phone: "0313" + Math.floor(Math.random() * 10000000),
      cnic: "32443235456356",
    },
  ];