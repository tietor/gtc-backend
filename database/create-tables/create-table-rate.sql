create table rate
(
    id            serial unique  not null primary key,
    from_currency varchar(3)     not null,
    to_currency   varchar(3)     not null,
    rate          decimal(10, 7) not null,
    unique (from_currency, to_currency)
)