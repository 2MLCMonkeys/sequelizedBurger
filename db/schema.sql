-- Drops the burger if it exists currently --
DROP DATABASE IF EXISTS burgers_db;
-- Creates the "burger" database --
CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers(
 id INTEGER AUTO_INCREMENT PRIMARY KEY,
 burger_name VARCHAR(50),
 devoured BOOLEAN,
 date TIMESTAMP,
 PRIMARY KEY (id)
 );
