const express = require('express');
const passport = require('passport');
const { login, current } = require('../controllers/sessions.controller');

const router = express.Router();

router.post('/login', login);
router.get('/current', passport.authenticate('jwt', { session: false }), current);

module.exports = router;