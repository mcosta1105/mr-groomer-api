import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class ChangeGroomerFieldToGroomeID1627390706277
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('bookings', 'groomer');

    await queryRunner.addColumn(
      'bookings',
      new TableColumn({
        name: 'groomer_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'bookings',
      new TableForeignKey({
        name: 'BookingsGroomer',
        columnNames: ['groomer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('bookings', 'BookingsGroomer');

    await queryRunner.dropColumn('bookings', 'groomer_id');

    await queryRunner.addColumn(
      'bookings',
      new TableColumn({
        name: 'groomer',
        type: 'varchar',
      }),
    );
  }
}
