require('dotenv').config();

/* MYSQL
const execSQL = require('exec-sql');

execSQL.connect({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

execSQL.executeDirectory('./DB/frodid_app', (err) => {
  if (err) throw err;
  execSQL.disconnect();
  console.log('Done!');
});
*/

exports.up = function(knex, Promise){
  return knex.schema
  .createTable('a001_roles', table =>{
    table.increments('id');
    table.varchar('name', 45).notNullable();
  })
  .createTable('a002_professions', table =>{
    table.increments('id');
    table.varchar('name', 45).notNullable();
  })
  .createTable('a003_users', table =>{
    table.increments('id');
    table.varchar('first_name', 45).notNullable();
    table.varchar('last_name', 45).notNullable();
    table.varchar('email', 45).notNullable();
    table.varchar('password', 45).notNullable();
    table.varchar('mobile', 45);
    table.date('birth_date').notNullable();
    table.date('created_at').notNullable();
    table.varchar('amka', 45).notNullable();
    table.varchar('afm', 45).notNullable();
    table.integer('role_id').references('id').inTable('a001_roles');
    table.integer('profession_id').references('id').inTable('a002_professions');
  }) 
  .createTable('a004_visits', table =>{
    table.increments('id');
    table.date('date').notNullable();
    table.text('comment').notNullable();
    table.time('start_time').notNullable();
    table.time('end_time').notNullable();
    table.integer('user_id').references('id').inTable('a003_users');
  })
  .createTable('a005_countries', table =>{
    table.increments('id');
    table.varchar('name', 45).notNullable();
  })
  .createTable('a006_states', table =>{
    table.increments('id');
    table.varchar('name', 45).notNullable();
  })
  .createTable('a007_addresses', table =>{
    table.increments('id');
    table.varchar('street', 45).notNullable();
    table.varchar('street_no', 45);
    table.varchar('region', 45).notNullable();
    table.varchar('zipcode', 45).notNullable();
    table.integer('country_id').references('id').inTable('a005_countries');
    table.integer('state_id').references('id').inTable('a006_states');
  })
  .createTable('a008_genders', table =>{
    table.increments('id');
    table.varchar('name', 45).notNullable();
  })
  .createTable('a009_patients', table =>{
    table.increments('id');
    table.varchar('first_name', 45).notNullable();
    table.varchar('last_name', 45).notNullable();
    table.date('birth_date').notNullable();
    table.varchar('telephone', 45);
    table.varchar('mobile', 45);
    table.varchar('amka', 45).notNullable();
    table.varchar('afm', 45).notNullable();
    table.text('comments').notNullable();
    table.integer('address_id').references('id').inTable('a007_addresses');
    table.integer('gender_id').references('id').inTable('a008_genders');
  })
  .createTable('a010_users_patients', table =>{
    table.increments('id');
    table.integer('patient_id').references('id').inTable('a009_patients');
    table.integer('user_id').references('id').inTable('a003_users');
  })
};

exports.down = function(knex, Promise){
  return knex.schema
          .dropTable('a010_users_patients')
          .dropTable('a009_patients')
          .dropTable('a008_genders')
          .dropTable('a007_addresses')
          .dropTable('a006_states')
          .dropTable('a005_countries')
          .dropTable('a004_visits')
          .dropTable('a003_users')
          .dropTable('a002_professions')
          .dropTable('a001_roles')
};
