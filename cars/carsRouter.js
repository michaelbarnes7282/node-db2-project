const express = require('express');

const db = require('../data/connection.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
    .then(cars => {
        res.json(cars);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to retrieve cars' })
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db('cars').where({ id }).first()
    .then(car => {
        res.json(car);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to retrieve car.' });
    });
});

router.post('/', (req, res) => {
    const carData = req.body;
    db('cars').insert(carData)
    .then(ids => {
        db('cars').where({ id: ids[0] })
        .then(newCarEntry => {
            res.status(201).json(newCarEntry);
        });
    })
    .catch(err => {
        console.log('POST error', err);
        res.status(500).json({ message: 'Failed to store data.' });
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const carData = req.body;
    db('cars')
        .where({ id })
        .update(carData)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'record updated successfully'});
            } else {
                res.status(400).json({ message: 'no records found' });
            }
        })
        .catch(err => {
            console.log("PUT error", err);

            res.status(500).json({ message: error.message });
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('cars')
        .where({ id })
        .del()
        .then(count => {
            if (count > 0) {
               res.status(200).json({ message: "record deleted successfully" });
        } else {
          res.status(404).json({ message: "no records found" });
        }
      })
      .catch(error => {
        console.log("GET / error", error);
  
        res.status(500).json({ message: error.message });
      });
  });

module.exports = router;
