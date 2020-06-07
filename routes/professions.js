const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

// Get Method
router.get('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query('', (error, results) => {
            connection.release();
            if (error) throw error;
            res.send(results);
        });
        if (err) console.error(`Error with connection: ${err}`);
    });
});

// Post Method
router.post('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query('', (error, results) => {
            connection.release();
            if (error) throw error;
            res.send(results);
        });
        if (err) console.error(`Error with connection: ${err}`);
    });
});

// Put Method
router.put('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query('', (error, results) => {
            connection.release();
            if (error) throw error;
            res.send(results);
        });
        if (err) console.error(`Error with connection: ${err}`);
    });
});

// Delete Method
router.delete('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query('', (error, results) => {
            connection.release();
            if(error) throw error;
            res.send(results);
        });
        if (err) console.error(`Error with connection: ${err}`);
    });
});

module.exports = router;
