
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert(generateData());
    });
};

function generateData() {
  return [
    {
      VIN: 123,
      make: 'Honda',
      model: 'Civic',
      miles: 100,
    },
  ]
}