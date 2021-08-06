import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./User";
import Pokemon from "./Pokemons";

@Entity("mypokemons")
export default class MyPokemons {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.id)
  user: User[];

  @Column()
  pokemonId: number;

  @ManyToOne(() => Pokemon, pokemon => pokemon.id)
  pokemon: Pokemon[];
}