const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const auth = require('../middleware/auth');
const Player = require('../models/Player');

/****************** PUBLIC ROUTES ********************** */

// GET /leaderboard – Getting Top10 players
router.get('/leaderboard', asyncHandler(async (req, res) => {
  const topPlayers = await Player.find().sort({ score: -1 }).limit(10);
  res.json(topPlayers);
}));

/****************** ADMIN ROUTES ********************** */

// GET /players – Get all players
router.get('/players', auth, asyncHandler(async (req, res) => {
  const players = await Player.find().sort({ score: -1 });
  res.json(players);
}));

// GET /players/:id – Get player by ID
router.get('/players/:id', auth, asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (!player) {
    res.status(404);
    throw new Error('Player not found');
  }
  res.json(player);
}));

// POST /players – Create new player
router.post('/players', auth, async (req, res) => {
  const { name, score, avatarId } = req.body;

  const existing = await Player.findOne({ name: name.trim() });
  if (existing) {
    return res.status(409).json({ message: 'Player with this name already exists.' });
  }

  const player = new Player({ name: name.trim(), score, avatarId });
  const saved = await player.save();
  res.status(201).json(saved);
});

// PUT /players/:id – Modify player score
router.put('/players/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { name, score, avatarId } = req.body;

  const existing = await Player.findOne({ name: name.trim(), _id: { $ne: id } });
  if (existing) {
    return res.status(409).json({ message: 'Another player with this name already exists.' });
  }

  const updated = await Player.findByIdAndUpdate(
    id,
    {
      name: name.trim(),
      score,
      avatarId,
      lastUpdated: new Date()
    },
    { new: true }
  );

  res.json(updated);
});

// DELETE /players/:id – Delete player
router.delete('/players/:id', auth, asyncHandler(async (req, res) => {
  const deleted = await Player.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404);
    throw new Error('Player not found');
  }

  res.status(204).end();
}));

module.exports = router;
