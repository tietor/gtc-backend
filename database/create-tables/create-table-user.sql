create table user
(
    id        serial unique not null,
    username  text(30) unique not null,
    firstname text(30)        not null,
    lastname  text(30)        not null,
    password  text(30)        not null,
    primary key (id)
);