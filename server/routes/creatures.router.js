const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// Setup a GET route to get all the creatures from the database
router.get('/', (req, res) => {
    // When you fetch all things in these GET routes, strongly encourage ORDER BY
    // so that things always come back in a consistent order 
    const sqlText = `
        SELECT * FROM creatures
            ORDER BY name, origin DESC;
    `
    pool.query(sqlText)
        .then((dbResult) => {
            console.log(`dbResult.rows is:`, dbResult.rows);
            res.send(dbResult.rows);
        })
        .catch((dbError) => {
            console.log(`dbError making database query ${sqlText}`, error);
            res.sendStatus(500);
        })
})


// Setup a POST route to add a new creature to the database
router.post('/', (req, res) => {
    const newCreature = req.body;
    const sqlText = `
        INSERT INTO creatures
            (name, origin)
            VALUES
            ($1, $2);
    `
    const sqlValues = [
      newCreature.name,
      newCreature.origin
    ]
    pool.query(sqlText, sqlValues)
        .then((dbResult) => {
            console.log(`Added creature to the database`, newCreature);
            res.sendStatus(201);
        })
        .catch((dbError) => {
            console.log(`Error making database query ${sqlText}`, dbError);
            res.sendStatus(500);
        })
})


module.exports = router;