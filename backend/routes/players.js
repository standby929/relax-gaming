const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const Player = require('../models/Player');

/****************** PUBLIC ROUTES ********************** */

// GET /leaderboard – Getting Top10 players
router.get('/leaderboard', asyncHandler(async (req, res) => {
  const topPlayers = await Player.find().sort({ score: -1 }).limit(10);
  res.json(topPlayers);
}));

/****************** ADMIN ROUTES ********************** */

// GET /players – Get all players
router.get('/players', asyncHandler(async (req, res) => {
  const players = await Player.find().sort({ score: -1 });
  res.json(players);
}));

// GET /players/:id – Get player by ID
router.get('/players/:id', asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (!player) {
    res.status(404);
    throw new Error('Player not found');
  }
  res.json(player);
}));

// POST /players – Create new player
router.post('/players', asyncHandler(async (req, res) => {
  const { name, score, avatarId } = req.body;
  if (!name || score === undefined) {
    res.status(400);
    throw new Error('Missing name or score');
  }

  const newPlayer = new Player({ name, score, avatarId });
  const saved = await newPlayer.save();
  res.status(201).json(saved);
}));

// PUT /players/:id – Modify player score
router.put('/players/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updated = await Player.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      score: req.body.score,
      avatarId: req.body.avatarId, // ⬅️ EZ IS KELL!
      lastUpdated: new Date()
    },
    { new: true }
  );

  if (!updated) {
    res.status(404);
    throw new Error('Player not found');
  }

  res.json(updated);
}));

// DELETE /players/:id – Delete player
router.delete('/players/:id', asyncHandler(async (req, res) => {
  const deleted = await Player.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404);
    throw new Error('Player not found');
  }

  res.status(204).end();
}));

module.exports = router;
