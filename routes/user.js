const express = require('express');
const router = express.Router();

// Signup Route
router.post('/signup', (req, res) => {
    res.json({ message: 'Signup successful!' });
});

module.exports = router;
