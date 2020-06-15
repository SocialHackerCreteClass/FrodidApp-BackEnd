require('dotenv').config(); // Allows pool to recognize enviroment variables. Gotta be before pool variable definition!!!
const pool = require('../../connection/connection');
const executer = require('./executer');

/* NOTE: Files order at array is very important!!!
Follow the next two rules:

1.- First all tables that have no FK.
2.- All tables that have FK related to tables already in the array.
*/
const sqlFiles = [
  'frodid_app_drop.sql',
  'frodid_app_roles.sql',
  'frodid_app_professions.sql',
  'frodid_app_users.sql',
  'frodid_app_visits.sql',
  'frodid_app_countries.sql',
  'frodid_app_states.sql',
  'frodid_app_addresses.sql',
  'frodid_app_genders.sql',
  'frodid_app_patients.sql',
  'frodid_app_users_patients.sql',
];
const path = './DB/frodid_app/';

sqlFiles.map((file) => executer(pool, path, file));
