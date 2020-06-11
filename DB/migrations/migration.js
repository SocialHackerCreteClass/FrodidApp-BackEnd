require('dotenv').config();       // Allows pool to recognize enviroment variables. Gotta be before pool variable definition!!!
const pool = require('../../connection/connection');

// TABLES
const queries = [
  'CREATE TABLE `roles` (`id` int NOT NULL, `name` varchar(45) NOT NULL, PRIMARY KEY (`id`))',  // ROLES
  'CREATE TABLE `professions` (`id` int NOT NULL,`name` varchar(45) NOT NULL, PRIMARY KEY (`id`))', // PROFESSIONS
  'CREATE TABLE `users` (`id` int NOT NULL,' + 
    '`first_name` varchar(45) NOT NULL, ' +
    '`last_name` varchar(45) NOT NULL, ' +
    '`email` varchar(45) NOT NULL, ' +
    '`password` varchar(45) NOT NULL, ' +
    '`birth_date` date NOT NULL, ' +
    '`created_at` date NOT NULL, ' +
    '`afm` varchar(45) NOT NULL, ' +
    '`amka` varchar(45) NOT NULL, ' +
    '`role_id` int NOT NULL, ' +
    '`profession_id` int NOT NULL, ' +
    'PRIMARY KEY (`id`), KEY `role_id_idx` (`role_id`), KEY `profession_id_idx` (`profession_id`), ' +
    'CONSTRAINT `fk_profession` FOREIGN KEY (`profession_id`) REFERENCES `professions` (`id`), ' +
    'CONSTRAINT `fk_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`))',     // USERS
    'CREATE TABLE `visits` (`id` int NOT NULL, ' +
      '`date` date NOT NULL, ' +
      '`comment` text NOT NULL, ' +
      '`start_time` time NOT NULL, ' +
      '`end_time` time NOT NULL, ' +
      '`user_id` int NOT NULL, ' +
      'PRIMARY KEY (`id`), KEY `fk_user_idx` (`user_id`), CONSTRAINT `fk_user2` ' + 
      'FOREIGN KEY (`user_id`) REFERENCES `users` (`id`))',  // VISITS
    'CREATE TABLE `countries` (`id` int NOT NULL, `name` varchar(45) NOT NULL,PRIMARY KEY (`id`))',  // COUNTRIES
    'CREATE TABLE `states` (`id` int NOT NULL, `name` varchar(45) NOT NULL, PRIMARY KEY (`id`))',    // STATES
    'CREATE TABLE `addresses` (`id` int NOT NULL, ' +
      '`street` varchar(45) NOT NULL, ' +
      '`street_no` varchar(45) DEFAULT NULL, ' +
      '`region` varchar(45) NOT NULL, ' +
      '`zipcode` varchar(45) NOT NULL, ' +
      '`country_id` int NOT NULL, ' +
      '`state_id` int NOT NULL, ' +
      'PRIMARY KEY (`id`), KEY `country_id_idx` (`country_id`), KEY `state_id_idx` (`state_id`), ' +
      'CONSTRAINT `fk_country` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`), ' +
      'CONSTRAINT `fk_state` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`))',   // ADDRESSES
    'CREATE TABLE `genders` (`id` int NOT NULL, `name` varchar(45) NOT NULL, PRIMARY KEY (`id`))',  // GENDERS
    'CREATE TABLE `patients` (`id` int NOT NULL, ' +
      '`first_name` varchar(45) NOT NULL, ' +
      '`last_name` varchar(45) NOT NULL, ' +
      '`birth_date` date NOT NULL, ' +
      '`telephone` varchar(45) DEFAULT NULL, ' +
      '`mobile` varchar(45) DEFAULT NULL, ' +
      '`amka` varchar(45) NOT NULL, ' +
      '`afm` varchar(45) NOT NULL, ' +
      '`comments` text NOT NULL, ' +
      '`gender_id` int NOT NULL, ' +
      '`address_id` int NOT NULL, ' +
      'PRIMARY KEY (`id`), KEY `gender_id_idx` (`gender_id`), KEY `address_id_idx` (`address_id`), ' +
      'CONSTRAINT `fk_address` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`), ' +
      'CONSTRAINT `fk_gender` FOREIGN KEY (`gender_id`) REFERENCES `genders` (`id`))',    // PATIENTS
      'CREATE TABLE `users_patients` (`id` int NOT NULL, `user_id` int NOT NULL, `patient_id` int NOT NULL, ' +
        'PRIMARY KEY (`id`), KEY `user_id_idx` (`user_id`), KEY `fk_patient_idx` (`patient_id`), ' +
        'CONSTRAINT `fk_patient` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`), ' +
        'CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`))'        // USERS_PATIENTS
]

queries.map(query => {
    pool.getConnection((err, connection) => {
        try {
          connection.query(query, (error, results) => {
            connection.release();
            console.log(err)
          });
        } catch (err) {
          if (err) throw err;
        }
      }); 
})
