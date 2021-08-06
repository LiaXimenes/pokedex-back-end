import { getRepository } from "typeorm";
import Session from "../entities/Sessions";

export async function validateSession(token: string) {
    const session = getRepository(Session).findOne({token});
    return session;
}