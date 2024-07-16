import { Knex } from 'knex';

const TABLE_NAME = 'todos';


/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();
    table.string('todo', 100).notNullable()
    table.integer('userId').notNullable()
    table.foreign('userId').references('userId').inTable('users')


    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));

    table
      .bigInteger('created_by')
      .unsigned()
      .nullable()
      .references('userId')
      .inTable('users');

    table.timestamp('updated_at').nullable();

    table
      .bigInteger('updated_by')
      .unsigned()
      .references('userId')
      .inTable('users')
      .nullable();
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
