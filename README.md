# Pokedex (back-end)
In this project you can see almost all pokemons and add then to your list. I created this to help Ash to keep track of what he's got in a easier way 🤓
You can try it here: https://pokedex-rho-seven.vercel.app/


## About
This is an web application which shows all known, or almost all of them until today and you can add/remove them from your list.
Below are the implemented features:

* Sign-up
* Sign-in
* List of all pokemons known
* Add pokemon to your list
* Remove pokemon from your list

## Technologies
The following tools and frameworks were used in the construction of the project:

* Node.js
* PostgreSQL
* Typescrypit
* Jest


## How to Run

1. Clone this repository
2. Clone the front-end repository at https://github.com/LiaXimenes/pokedex
3. Follow instructions to run front-end at https://github.com/LiaXimenes/pokedex
4. Install dependencies
```bash
npm i
```
5. Run the migrations 
```bash
npm run typeorm migration:run
```
6. Populate the database with the "/populate" route
7. Run the front-end with
```bash
npm run dev
```



