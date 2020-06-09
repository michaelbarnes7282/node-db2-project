
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments();


      tbl.integer('VIN', 255).notNullable().unique();
      tbl.string('make', 255).notNullable();
      tbl.string('model', 255).notNullable();
      tbl.decimal('miles', 255).notNullable();
      tbl.string('transmission', 255);
      tbl.string('status', 255);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
