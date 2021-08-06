import { getRepository } from "typeorm";

import User from "../entities/User";
//import Sessions from "../entities/Sessions"

export async function signUp (email: string, password: string) {
  const users = await getRepository(User).insert({email, password});
  
  return users;
}

export async function signIn (userId: number, token: string) {
  // const users = await getRepository(Sessions).insert({userId, token});
  
  // return users;

  
}

export async function findEmail(email:string) {
  const emailExists = await getRepository(User).findOne({email})
  return emailExists;
  
}