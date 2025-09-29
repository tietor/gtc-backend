create table currrency
(
    id        serial unique       not null primary key,
    iso       varchar(3) unique   not null,
    name      varchar(100) unique not null,
    countries varchar(255)
);