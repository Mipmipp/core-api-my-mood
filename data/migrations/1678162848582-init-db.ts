import { MigrationInterface, QueryRunner } from 'typeorm';

export class initDb1678162848582 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`username\` varchar(255) NOT NULL,
        \`email\` varchar(255) NOT NULL UNIQUE,
        \`password\` varchar(255) NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`track\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`fk_user_id\` int,
        \`day\` int,
        \`month\` int,
        \`year\` int,
        \`mood\` varchar(255),
        \`note\` varchar(255),
        PRIMARY KEY (\`id\`),
        FOREIGN KEY (\`fk_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL
      ) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS \`track\``);

    await queryRunner.query(`DROP TABLE IF EXISTS \`user\``);
  }
}
