import { Request, Response } from "express";
import Joi from "joi";
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';


import * as userService from "../services/userService";

export async function signUp (req: Request, res: Response) {
  try {
    const email: string = req.body.email
    const password: string = req.body.password

    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false}}).required(),
      password: Joi.string().required(),
      confirmPassword: Joi.any().valid(Joi.ref('password')).required()
    })

    const validation = schema.validate(req.body)

    if(validation.error) return res.sendStatus(400);

    const DoesEmailExists = await userService.findEmail(email);

    if(DoesEmailExists) return res.sendStatus(409);

    const hash = bcrypt.hashSync(password, 10);

    await userService.signUp(email, hash);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function signIn (req: Request, res: Response) {
  try {
    const email: string = req.body.email
    const password: string = req.body.password

    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false}}).required(),
      password: Joi.string().required(),
    })

    const validation = schema.validate(req.body)

    if(validation.error) return res.sendStatus(400);

    const getUserByEmail = await userService.findEmail(email);

    const userId = Number(getUserByEmail.id)
    const token = uuid();
    if(getUserByEmail && bcrypt.compareSync(password, getUserByEmail.password)){
      await userService.signIn(userId, token);
    }else{
      return res.sendStatus(401)
    }
    
    res.send(token);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
