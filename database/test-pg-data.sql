drop table if exists users;

create table users (
  id serial primary key,
  email varchar(128) not null,
  first_name varchar(128),
  last_name varchar(128),
  api_key varchar(128) not null unique,
  created_at timestamp not null default current_timestamp
);


INSERT INTO "users" ("email","first_name","last_name","api_key")
VALUES
('test@ts.com','Test','User1','4242'),
('test@mind.com','Test','User2','0000');
