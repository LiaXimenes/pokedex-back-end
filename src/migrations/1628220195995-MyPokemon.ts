import {MigrationInterface, QueryRunner} from "typeorm";

export class MyPokemon1628220195995 implements MigrationInterface {
    name = 'MyPokemon1628220195995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mypokemons" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "pokemonId" integer NOT NULL, CONSTRAINT "PK_c4d9f0c6018ec29102a85384953" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "mypokemons" ADD CONSTRAINT "FK_7c5ded55b40a01faae029cdd2fa" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mypokemons" ADD CONSTRAINT "FK_53bdd64c7ed91f4de93150cf9ad" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mypokemons" DROP CONSTRAINT "FK_53bdd64c7ed91f4de93150cf9ad"`);
        await queryRunner.query(`ALTER TABLE "mypokemons" DROP CONSTRAINT "FK_7c5ded55b40a01faae029cdd2fa"`);
        await queryRunner.query(`DROP TABLE "mypokemons"`);
    }

}
