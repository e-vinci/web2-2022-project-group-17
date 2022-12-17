const express = require('express');
const { readOneUserFromUsername} = require('../models/users');

const router = express.Router();


// GET user by username
router.get('/:username', (req, res) => {
  const usernameFound = readOneUserFromUsername(req.params.username);

  if (!usernameFound) return res.sendStatus(404);

  return res.sendStatus(200);
});

module.exports = router;
