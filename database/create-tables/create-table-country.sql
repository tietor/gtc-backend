create table country
(
    id                    serial unique not null primary key,
    name                  varchar(50)   not null,
    iso                   varchar(2)    not null,
    official_name         varchar(60)   not null,
    capital_city          varchar(50)   not null,
    biggest_town          varchar(50)   not null,
    phone_prefix          varchar(5)    not null,
    area                  int unsigned not null,
    rank_area             smallint unsigned not null,
    population            int unsigned not null,
    rank_population       smallint unsigned not null,
    domain                varchar(30)    not null,
    currency              varchar(50)   not null,
    abbreviation_currency varchar(3)    not null
);