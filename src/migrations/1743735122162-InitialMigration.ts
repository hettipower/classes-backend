import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1743735122162 implements MigrationInterface {
    name = 'InitialMigration1743735122162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`registration\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` date NOT NULL, \`count\` int NOT NULL, \`classEntityId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`class_fee\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` date NOT NULL, \`count\` int NOT NULL, \`classEntityId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`class_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`subject\` varchar(255) NOT NULL, \`registrationAmount\` decimal(10,2) NOT NULL, \`classFeeAmount\` decimal(10,2) NOT NULL, \`teacherId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`teacher\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`contactNo\` varchar(255) NOT NULL, \`teachingSubject\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_00634394dce7677d531749ed8e\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`registration\` ADD CONSTRAINT \`FK_24a001ee1eb2ea852992b99d18e\` FOREIGN KEY (\`classEntityId\`) REFERENCES \`class_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`class_fee\` ADD CONSTRAINT \`FK_2a66391ead6ca4ba1c1a31a37ad\` FOREIGN KEY (\`classEntityId\`) REFERENCES \`class_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`class_entity\` ADD CONSTRAINT \`FK_937c0d8e1bfa38a5ab61525b9e5\` FOREIGN KEY (\`teacherId\`) REFERENCES \`teacher\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`class_entity\` DROP FOREIGN KEY \`FK_937c0d8e1bfa38a5ab61525b9e5\``);
        await queryRunner.query(`ALTER TABLE \`class_fee\` DROP FOREIGN KEY \`FK_2a66391ead6ca4ba1c1a31a37ad\``);
        await queryRunner.query(`ALTER TABLE \`registration\` DROP FOREIGN KEY \`FK_24a001ee1eb2ea852992b99d18e\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_00634394dce7677d531749ed8e\` ON \`teacher\``);
        await queryRunner.query(`DROP TABLE \`teacher\``);
        await queryRunner.query(`DROP TABLE \`class_entity\``);
        await queryRunner.query(`DROP TABLE \`class_fee\``);
        await queryRunner.query(`DROP TABLE \`registration\``);
    }

}
