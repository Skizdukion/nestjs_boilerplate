import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNameTable1672026956854 implements MigrationInterface {
    name = 'CreateNameTable1672026956854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "network" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "chainId" integer NOT NULL, "name" character varying NOT NULL, "rpcUrl" text array NOT NULL DEFAULT '{}', CONSTRAINT "UQ_9f79766aae97061ce6d051470ad" UNIQUE ("chainId"), CONSTRAINT "PK_8f8264c2d37cbbd8282ee9a3c97" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "token" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "address" character varying NOT NULL, "name" character varying NOT NULL, "countExists" integer NOT NULL DEFAULT '0', "networkId" integer, CONSTRAINT "UQ_ADDRESS_T" UNIQUE ("address", "networkId"), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "factory" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "address" character varying NOT NULL, "name" character varying NOT NULL, "defaultSwapFee" integer NOT NULL DEFAULT '0', "isPoolHaveCustomSwapFee" boolean NOT NULL DEFAULT false, "totalPoolCounts" bigint NOT NULL, "networkId" integer, CONSTRAINT "UQ_ADDRESS_F" UNIQUE ("address", "networkId"), CONSTRAINT "PK_1372e5a7d114a3fa80736ba66bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "email" character varying, "password" character varying, "firstName" character varying, "lastName" character varying, "hash" character varying, "roleId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `);
        await queryRunner.query(`CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `);
        await queryRunner.query(`CREATE INDEX "IDX_e282acb94d2e3aec10f480e4f6" ON "user" ("hash") `);
        await queryRunner.query(`CREATE TABLE "pool" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "address" character varying NOT NULL, "reserve1" bigint NOT NULL, "reserve2" bigint NOT NULL, "swapFee" bigint NOT NULL, "indexCount" integer NOT NULL DEFAULT '0', "networkId" integer, "token1Id" integer, "token2Id" integer, "factoryId" integer, CONSTRAINT "UQ_ADDRESS_P" UNIQUE ("address", "factoryId"), CONSTRAINT "PK_db1bfe411e1516c01120b85f8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a35f872938578973ffe0e08c35" ON "pool" ("token1Id") `);
        await queryRunner.query(`CREATE INDEX "IDX_34f5b9cc2cc8474d89e10ed164" ON "pool" ("token2Id") `);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_9fc766f483e0d16abeb31f11f0d" FOREIGN KEY ("networkId") REFERENCES "network"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "factory" ADD CONSTRAINT "FK_6cabcd21da142ef356096dd1285" FOREIGN KEY ("networkId") REFERENCES "network"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pool" ADD CONSTRAINT "FK_f4f39ac5968eef323e9c405fa11" FOREIGN KEY ("networkId") REFERENCES "network"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pool" ADD CONSTRAINT "FK_a35f872938578973ffe0e08c354" FOREIGN KEY ("token1Id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pool" ADD CONSTRAINT "FK_34f5b9cc2cc8474d89e10ed164d" FOREIGN KEY ("token2Id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pool" ADD CONSTRAINT "FK_f035ef78f4847b3759ec9e69a54" FOREIGN KEY ("factoryId") REFERENCES "factory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pool" DROP CONSTRAINT "FK_f035ef78f4847b3759ec9e69a54"`);
        await queryRunner.query(`ALTER TABLE "pool" DROP CONSTRAINT "FK_34f5b9cc2cc8474d89e10ed164d"`);
        await queryRunner.query(`ALTER TABLE "pool" DROP CONSTRAINT "FK_a35f872938578973ffe0e08c354"`);
        await queryRunner.query(`ALTER TABLE "pool" DROP CONSTRAINT "FK_f4f39ac5968eef323e9c405fa11"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "factory" DROP CONSTRAINT "FK_6cabcd21da142ef356096dd1285"`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_9fc766f483e0d16abeb31f11f0d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_34f5b9cc2cc8474d89e10ed164"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a35f872938578973ffe0e08c35"`);
        await queryRunner.query(`DROP TABLE "pool"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e282acb94d2e3aec10f480e4f6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "factory"`);
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP TABLE "network"`);
    }

}
