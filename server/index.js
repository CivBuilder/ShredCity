const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');

// connect db and api
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'chris',
    host: 'localhost',
    password: '$hr3d!2607',
    database: 'trails_db',
});

// create connection on network
app.listen(3000, () => {
    console.log("The server is running on port 3001");
});

// db query
/// @param /runs passes in params to pull from db from survey
app.get('/runs', (req, res) => {
    console.log(req.query);
    const runResult = Object.entries(req.query);

    // pull keys from values
    const queryParams = runResult.flatMap((property, index) => {
        const key = property[0];
		const value = property[1];
        
        if (value === "null") {
            return [];  // if current parameter = null, return nothing.
        }
        else {
            return `${key}="${value}"`;
        }

    });

    // join params values/keys for db query
    console.log(queryParams.join(" AND "));

    // query db and send to app.js
    db.query(`SELECT * FROM trails_db.full_trails WHERE ${queryParams.join(" AND ")}`,
                (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});

