const seeder = require('./scripts/seedDb');

module.exports = async () => {
  await seeder();
};
