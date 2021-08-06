import "./setup";
import express from "express";
import cors from "cors";
import axios from "axios";
import "reflect-metadata";
import { getRepository } from "typeorm";

import connectDatabase from "./database";
import Pokemon from "./entities/Pokemons";
import * as userController from "./controllers/userConroller";
import * as pokemonController from "./controllers/pokemonsController";
import * as middleware from "./middlewares/authmiddleware"
import {Request, Response, NextFunction, Errback} from 'express';


const app = express();
app.use(cors());
app.use(express.json());

app.use("/populate", async (req: Request,res: Response)=>{
 
  for(let i = 1; i < 100; i ++){
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
    const newPokemon = {
      id: result.data.id,
      name: result.data.name,
      number: result.data.order,
      image: result.data.sprites.front_default,
      weight: result.data.weight,
      height: result.data.height,
      baseExp: result.data.base_experience,
      description: ""
    }
 
    const speciesResult = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`)
    newPokemon.description = speciesResult.data.flavor_text_entries[0].flavor_text.split("\n").join(" ")
    const pokemon = getRepository(Pokemon).create(newPokemon)
    const resultquery = await getRepository(Pokemon).save(pokemon)
  }
  res.send("OK")
})

app.post("/sign-up", userController.signUp);
app.post("/sign-in", userController.signIn);
app.get("/pokemons", middleware.authorization, pokemonController.getPokemons);
app.post("/my-pokemons/:id/add", middleware.authorization, pokemonController.addPokemon);
app.post("/my-pokemons/:id/remove", middleware.authorization, pokemonController.removePokemon);

app.use(function(err: Errback, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  res.status(500).send('Something broke!');
});


export async function init () {
  await connectDatabase();
}

export default app;
