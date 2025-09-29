create table currency_conversion
(
    id            serial unique  not null,
    date          DATE NOT NULL DEFAULT CURRENT_DATE,
    from_currency varchar(4)     not null,
    to_currency   varchar(4)     not null,
    exchange_rate decimal(18, 8) not null,
    from_value    decimal(10, 2) not null,
    to_value      decimal(10, 2) not null,
    user_fk       bigint(20) unsigned  not null,
    primary key (id),
    foreign key (user_fk) references user (id) on delete cascade on update cascade
);