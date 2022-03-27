CREATE DATABASE nodetest;

CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  friends text[][],
  PRIMARY KEY(user_id)
);

CREATE TABLE todos(
  todo_id SERIAL,
  user_id UUID ,
  title VARCHAR(255),
  description VARCHAR(255),
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--fake user data
INSERT INTO users (user_name, user_email, user_password) VALUES ('mang', 'pony213@gmail.com', 'pooserl8822');

--fake todo data
INSERT INTO todos (user_id, description) VALUES ('dd7488cd-b1df-447c-b8bd-72406f396890', 'dogpog');


