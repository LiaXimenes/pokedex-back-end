import { getRepository } from "typeorm";

import User from "../../src/entities/User";
import Session from "../../src/entities/Sessions";

export async function clearDatabase () {
  await getRepository(User).delete({});
}

export async function populateSession(){
  const userId: number = 2;
  const token: string = "validToken";

  await getRepository(Session).insert({userId, token});
}