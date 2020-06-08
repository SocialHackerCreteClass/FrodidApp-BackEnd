const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

// Get Method
router.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query('SELECT * FROM roles', (error, results) => {
            connection.release();
            if (error) throw error;
            res.send(results);
        });
        if (err) console.error(`Error with connection: ${err.message}`);
    });
});


// Get with id Method
router.get('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(`SELECT * FROM roles WHERE id=${req.params.id}`, (error, results) => {
            connection.release();
            if (error) throw error;
            res.send(results); 
        });
        if (err) console.error(`Error with connection: ${err.message}`);
    });
});

// Post Method
router.post('/', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query('', (error, results) => {
            connection.release();
            if (error) throw error;
            res.send(results);
        });
        if (err) console.error(`Error with connection: ${err.message}`);
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
        if (err) console.error(`Error with connection: ${err.message}`);
    });
});

// Delete Method
router.delete('/:id', (req, res) => {
    pool.getConnection((error, connection) => {
        connection.query('', (error, results) => {
            connection.release();
            if (error) throw error;
            res.send(results);
        });
        if (err) console.error(`Error with connection: ${err.message}`);
    });
});

module.exports = router;