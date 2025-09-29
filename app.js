const express = require('express');
const app = express();
const cors = require('cors');
const mariadb = require('mariadb');
const port = 3005


const db = mariadb.createPool({
    host: 'localhost',
    user: 'gtc',
    password: 'test123',
    database: 'gtc',
    connectionLimit: 2
});

app.use(cors());
app.use(express.json());


app.get('/countries', (req, res) => {
    db.getConnection().then(conn => {
        conn.query('select iso, name, countries from currrency').then(rows => {
            conn.release().then();
            res.json(rows);
        });
    });
});

app.get('/rates', (req, res) => {
    db.getConnection().then(conn => {
        conn.query('select from_currency, to_currency, rate from rate order by from_currency desc').then(rows => {
            conn.release().then();
            res.json(rows);
        });
    });
});

app.get('/countriesByShortNameSort', (req, res) => {
    db.getConnection().then(conn => {
        conn.query('select iso, name from country order by iso').then(rows => {
            conn.release().then();
            res.json(rows);
        });
    });
});

app.get('/countriesByNameSort', (req, res) => {
    db.getConnection().then(conn => {
        conn.query('select name, official_name from country order by iso').then(rows => {
            conn.release().then();
            res.json(rows);
        });
    });
});


app.get('/countriesByAreaSort', (req, res) => {
    db.getConnection().then(conn => {
        conn.query('select name, area, rank_area from country order by rank_area').then(rows => {
            conn.release().then();
            res.json(rows);
        });
    });
});

app.get('/countriesByPopulationSort', (req, res) => {
    db.getConnection().then(conn => {
        conn.query('select name, population, rank_population from country order by rank_population').then(rows => {
            conn.release().then();
            res.json(rows);
        });
    });
});

app.get('/login/:username', (req, res) => {
    const username = req.params.username;

    db.getConnection().then(conn => {
        conn.query('select password from user where username = ?', [username]).then(rows => {
            conn.release().then();
            if (rows.length === 1) {
                res.send(rows[0].password);
            } else {
                res.send(null);
            }
        });
    });
});


app.post('/register', (req, res) => {
    const registerData = req.body;

    db.getConnection().then(conn => {
        conn.query('insert into user (username, firstname, lastname, password)  values (?, ?, ?, ?)', [registerData.username, registerData.firstname, registerData.lastname, registerData.password]).then(() => {
            conn.release().then();
            res.status(200).send();
        }).catch(() => {
            conn.release().then();
            res.status(409).send();

        });
    });
});

app.post('/calculation', (req, res) => {
    const calculationData = req.body;
    db.getConnection().then(conn => {
        conn.query('select id from user where username = ?', [calculationData.username]).then(userId => {
            const user_fk = userId[0].id;
            conn.query('insert into currency_conversion (from_currency, to_currency, exchange_rate, from_value, to_value, user_fk) values (?, ?, ?, ?, ?, ?)', [calculationData.fromCurrency, calculationData.toCurrency, calculationData.rate, calculationData.fromValue, calculationData.result, user_fk]).then(rows => {
                conn.release().then();
                res.status(200).send();
            });

        })
    });

});

app.get('/calculations', (req, res) => {
    db.getConnection().then(conn => {
        conn.query('select username, date, from_currency, to_currency, exchange_rate, from_value, to_value from currency_conversion inner join user on user.id = currency_conversion.user_fk').then(rows => {
            conn.release().then();
            res.json(rows);
        });
    });
});


app.get('/country/:name', (req, res) => {
    const name = req.params.name;
    db.getConnection().then(conn => {
        conn.query('select name, iso, official_name, capital_city, biggest_town, phone_prefix, area, rank_area, population, rank_population, domain, currency, abbreviation_currency from country where name = ?', [name]).then(rows => {
            conn.release().then();
            res.json(rows[0]);
        });
    });
});


app.listen(port, () => {
    console.log(`gtc-backend app listening on port ${port}`)
})